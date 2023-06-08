import { Role } from '../../../auth/enums/role.enum';
import { IUser } from '../../interfaces/user.interface';
import { Types } from 'mongoose';

export const userStub = (): IUser => {
  return {
    _id: new Types.ObjectId('123456789123456789123456'),
    username: 'rxrdsoft',
    email: 'email@email.com',
    roles: [Role.USER],
  };
};
