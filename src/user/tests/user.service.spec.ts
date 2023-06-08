import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { userStub } from './stubs/user.stub';
import { UserRepository } from '../user.repository';

describe('UserService', () => {
  let userService: UserService;

  const mockAddUser: CreateUserDTO = {
    username: userStub().username,
    email: userStub().email,
    password: '123',
    roles: userStub().roles,
  };

  const mockUserFound = {
    _id: userStub()._id,
    username: userStub().username,
    email: userStub().email,
    roles: userStub().roles,
  };

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation(() => userStub()),
    create: jest.fn().mockImplementation(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
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
        .mockImplementation(() => Promise.resolve(userStub()));

      console.log(await userService.addUser(mockAddUser));
      console.log(userStub());

      expect(await userService.addUser(mockAddUser)).toBe(userStub());
    });
  });

  // describe('findUser', () => {
  //   test('should return the user found', async () => {
  //     jest
  //       .spyOn(userService, 'findUser')
  //       .mockImplementation(() => Promise.resolve(mockUserFound));
  //
  //     expect(await userService.findUser(userStub()._id)).toBe(mockUserFound);
  //   });
  // });
});
