import { userStub } from '../tests/stubs/user.stub';

export const UserRepository = jest.fn().mockReturnValue({
  findOneAndUpdate: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockResolvedValue({
    ...userStub(),
    password: '',
  }),
  create: jest.fn().mockResolvedValue({
    ...userStub(),
    password: '',
  }),
});
