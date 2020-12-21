import { Request } from 'express';
import { User } from 'src/models/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
