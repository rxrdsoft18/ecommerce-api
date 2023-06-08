import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../auth.service';
import { User } from '../../user/schemas/user.schema';
import { userStub } from '../../user/tests/stubs/user.stub';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUser: jest
              .fn()
              .mockResolvedValue({ ...userStub(), password: '' }),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    describe('when validateUser is called', () => {
      let user: User;
      const email = userStub().email;
      const password = userStub().passowrd;

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation((passEntry, pass) => Promise.resolve(true));

      beforeEach(async () => {
        user = await authService.validateUser(email, password);
      });

      test('when it should called userService', () => {
        expect(userService.findUser).toHaveBeenCalledWith(email);
      });

      test('when it should return user', () => {
        expect(user).toEqual({ ...userStub(), password: '' });
      });
    });

    test('when it should return null', () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation((passEntry, pass) => Promise.resolve(false));
      expect(null).toBeNull();
    });
  });
});
