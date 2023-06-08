import { Role } from '../../auth/enums/role.enum';

export abstract class IUser {
  _id: string;
  username: string;
  email: string;
  roles: Role[];
  passowrd?: string;
}
