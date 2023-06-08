import { userStub } from '../tests/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  updateUser: jest.fn().mockResolvedValue(userStub()),
});
