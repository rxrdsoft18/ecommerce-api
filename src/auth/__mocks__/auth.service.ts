import { accessTokenStub } from '../test/stubs/access-token.stub';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockReturnValue(accessTokenStub()),
});
