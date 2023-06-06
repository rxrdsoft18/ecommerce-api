import { User } from '../../../user/schemas/user.schema';
import { Role } from '../../enums/role.enum';

export const loginStub = (): User => {
  return {
    email: 'rxrdsoft@gmail.com',
    password: 'holamundo',
    username: 'richard',
    roles: [Role.USER],
  };
};

export const accessTokenStub = (): string => {
  return 'token';
};
