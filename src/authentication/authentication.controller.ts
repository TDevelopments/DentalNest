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
  UseInterceptors,
  ClassSerializerInterceptor,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { request, Response, response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthenticationGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthenticationGuard } from '../common/guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { AccessTokenDto } from './dto/access-token.dto';
import { BaseException } from 'src/common/dto/base-exception.dto';
import { UserRole } from 'src/models/user.entity';
import { Roles } from 'src/common/decorators/metadata/user-roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtOrAnonymousAuthenticationGuard } from 'src/common/guards/jwt-or-anonymous.guard';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener informacion del autenticado',
    description: `
  Se obtendran todos los datos relacionados al usuario portador del token con que se esta realizando la solicitud
  `,
  })
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Post('register')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registro para todos los usuarios',
    description: `Los usuarios seran creados por defecto con el rol de CLIENTE, 
  si se hace la operacion con un token con privilegios de administrador podra elegirse cualquier rol para el usuario a crear`,
  })
  @UseGuards(JwtOrAnonymousAuthenticationGuard, RolesGuard)
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Req() request: RequestWithUser,
  ) {
    if (!request.user.role) {
      registerUserDto.role = UserRole.CLIENT;
    }
    return this.authenticationService.register(registerUserDto);
  }

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
  ): Promise<AccessTokenDto> {
    const { user } = request;
    const accessTokenDto: AccessTokenDto = {
      accessToken: this.authenticationService.getAcessToken(user),
      expiresIn: this.authenticationService.getExpirationTime(),
    };
    return accessTokenDto;
  }
}
