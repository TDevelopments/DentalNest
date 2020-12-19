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
  HttpException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response, response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthenticationGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthenticationGuard } from '../common/guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { AccessTokenDto } from './dto/access-token.dto';
import { BaseException } from 'src/common/dto/base-exception.dto';

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

  //@HttpCode(200)
  //@UseGuards(LocalAuthenticationGuard)
  //@ApiBody({ type: LoginUserDto })
  //@Post('loginWithCookies')
  //async logInWithCookies(
  //  @Req() request: RequestWithUser,
  //  @Res() response: Response,
  //) {
  //  const { user } = request;
  //  const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
  //  response.setHeader('Set-Cookie', cookie);
  //  user.password = undefined;
  //  return response.send(user);
  //}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiBody({
    type: LoginUserDto,
    description: 'Cuerpo del json a enviar para la solicitud',
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales invalidas',
    type: BaseException,
  })
  @ApiOkResponse({
    description: 'Login ejecutado correctamente',
    type: AccessTokenDto,
  })
  @ApiOperation({ summary: 'Login para todos los usuarios' })
  @Post('login')
  async logIn(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;
    return this.authenticationService.getAcessToken(user);
  }

  //@Post('logout')
  //@UseGuards(JwtAuthenticationGuard)
  //async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
  //  response.setHeader(
  //    'Set-Cookie',
  //    this.authenticationService.getCookieForLogout(),
  //  );
  //  return response.status(200);
  //}
}
