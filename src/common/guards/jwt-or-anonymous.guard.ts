import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrAnonymousAuthenticationGuard extends AuthGuard([
  'jwt',
  'anonymous',
]) {}
