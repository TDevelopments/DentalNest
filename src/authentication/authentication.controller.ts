import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './dto/register.dto';
import { JwtAuthenticationGuard } from './jwtAuthentication.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { RequestWithUser } from './requestWithUser.interface';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authenticationService.register(registerUserDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogout(),
    );
    return response.status(200);
  }
}
