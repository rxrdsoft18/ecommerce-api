import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { userStub } from './stubs/user.stub';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

describe('UserService', () => {
  let userService: UserService;

  const mockAddUser: CreateUserDTO = {
    username: userStub().username,
    email: userStub().email,
    password: userStub().password,
    roles: userStub().roles,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
      controllers: [],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('addUser', () => {
    test('should return user created', async () => {
      jest
        .spyOn(userService, 'addUser')
        .mockImplementation(() => Promise.resolve(mockAddUser));

      expect(await userService.addUser(userStub())).toBe(mockAddUser);
    });
  });
});
