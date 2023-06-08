import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CreateUserDTO } from '../../user/dtos/create-user.dto';
import { IUser } from '../../user/interfaces/user.interface';
import { userStub } from '../../user/tests/stubs/user.stub';
import { UserService } from '../../user/user.service';

import { User } from '../../user/schemas/user.schema';
import { accessTokenStub } from './stubs/access-token.stub';

jest.mock('../auth.service');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            addUser: jest.fn().mockResolvedValue(userStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(accessTokenStub()),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    describe('when register is called', () => {
      let createUserDto: CreateUserDTO;
      let user: IUser;

      beforeEach(async () => {
        createUserDto = {
          username: userStub().username,
          email: userStub().email,
          password: userStub().passowrd,
          roles: userStub().roles,
        };

        user = await authController.register(createUserDto);
      });

      test('when it should called userService', () => {
        expect(userService.addUser).toHaveBeenCalledWith(createUserDto);
      });

      test('when it should return user created', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('login', () => {
    describe('when login is called', () => {
      let token: { access_token: string };
      let userLogin: User;

      beforeEach(async () => {
        userLogin = {
          ...userStub(),
          password: '',
        };
        token = await authController.login(userLogin);
      });

      test('when it should called authService', () => {
        authService.login(userLogin);
        expect(authService.login).toHaveBeenCalledWith(userLogin);
      });

      test('when it should return access_token', () => {
        expect(token).toEqual(accessTokenStub());
      });
    });
  });
});
