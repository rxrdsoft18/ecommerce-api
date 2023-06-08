import { User } from '../../schemas/user.schema';
import { Role } from '../../../auth/enums/role.enum';
import { IUser } from '../../interfaces/user.interface';

export const userStub = (): IUser => {
  return {
    _id: '123',
    username: 'rxrdsoft',
    email: 'email@email.com',
    roles: [Role.USER],
  };
};

export const accessTokenStub = (): string => {
  return 'token';
};
