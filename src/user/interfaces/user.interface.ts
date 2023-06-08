import { Role } from '../../auth/enums/role.enum';
import { Types } from 'mongoose';

export abstract class IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  roles: Role[];
  passowrd?: string;
}
