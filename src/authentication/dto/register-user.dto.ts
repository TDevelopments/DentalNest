import { PickType } from '@nestjs/swagger';

import { User } from 'src/users/entities/user.entity';

export class RegisterUserDto extends PickType(User, [
  'email',
  'password',
  'firstName',
  'lastName',
  'genre',
  'birthDate',
  'role',
  'identityType',
  'identityNumber',
  'phoneNumber1',
  'phoneNumber2',
] as const) {}
