import { User } from '../../schemas/user.schema';
import { Role } from '../../../auth/enums/role.enum';

export const userStub = (): User => {
  return {
    username: 'rxrdsoft',
    email: 'email@email.com',
    password: 'holamundo',
    roles: [Role.USER],
  };
};

export const accessTokenStub = (): string => {
  return 'token';
};
