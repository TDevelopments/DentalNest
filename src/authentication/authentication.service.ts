import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { AccessTokenDto } from './dto/access-token.dto';
import { AppConfigService } from 'src/config/app/config.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  public async register(registerUserDto: RegisterUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      const createdUser = await this.usersService.create({
        ...registerUserDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Credenciales invalidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Credenciales invalidas', HttpStatus.BAD_REQUEST);
    }
  }

  //public getCookieWithJwtToken(userId: number) {
  //  const payload: JwtPayload = { userId };
  //  const token = this.jwtService.sign(payload);
  //  return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //    'JWT_EXPIRATION_TIME',
  //  )}`;
  //}

  public getAcessToken(user: User): AccessTokenDto {
    const payload: JwtPayload = { userId: user.id };
    const accessTokenDto: AccessTokenDto = {
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.appConfigService.jwtExpirationTime,
    };
    return accessTokenDto;
  }

  //public getCookieForLogout() {
  //  return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  //}
}
