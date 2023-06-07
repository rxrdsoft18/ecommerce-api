import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Role } from '../../auth/enums/role.enum';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { userStub } from './stubs/user.stub';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUpdateRequest = {
    roles: [Role.USER],
  };

  const mockUserUpdated = {
    username: userStub().username,
    email: userStub().email,
    roles: userStub().roles,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('update', () => {
    test('should return an object', async () => {
      jest
        .spyOn(userService, 'updateUser')
        .mockImplementation(() => Promise.resolve(mockUserUpdated));

      expect(await userController.update('1', mockUpdateRequest)).toBe(
        mockUserUpdated,
      );
    });
  });
});
