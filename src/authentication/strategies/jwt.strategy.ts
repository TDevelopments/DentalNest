import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request, request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * La configuración de la estrategia esta definida para extraer el token por los headers,
   * en caso se desee configurar la extracción del token por cokkies implementar el
   * siguiente codigo de ejemplo en el constructor
   *
   * @example
   * constructor(
   *   private readonly configService: ConfigService,
   *   private readonly usersService: UsersService,
   * ) {
   *  super({
   *    jwtFromRequest: ExtractJwt.fromExtractors([
   *    (request: Request) => {
   *       return request?.cookies?.Authentication;
   *    },
   *    ]),
   *  })
   * }
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * Valida que el usuario se encuentra en la base de datos
   * y configura el token JWT
   *
   * @returns Una promesa con el Usuario
   */
  async validate(payload: JwtPayload): Promise<User> {
    return this.usersService.findById(payload.userId);
  }
}
