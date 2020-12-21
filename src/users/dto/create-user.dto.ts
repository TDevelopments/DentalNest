import { OmitType } from '@nestjs/swagger';
import { User } from '../../models/user.entity';

export class CreateUserDto extends OmitType(User, [
  'createdAt',
  'updatedAt',
] as const) {}
