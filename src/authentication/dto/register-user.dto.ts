import { PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

import { User } from 'src/models/user.entity';

export class RegisterUserDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'genre',
  'birthDate',
  'role',
  'identityType',
  'identityNumber',
  'phoneNumber1',
  'phoneNumber2',
] as const) {
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  public password: string;
}
