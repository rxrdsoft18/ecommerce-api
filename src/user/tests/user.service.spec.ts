import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { userStub } from './stubs/user.stub';
import { UserRepository } from '../user.repository';
import { IUser } from '../interfaces/user.interface';
import { User } from '../schemas/user.schema';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { Role } from '../../auth/enums/role.enum';

jest.mock('../user.repository');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [UserService, UserRepository],
      controllers: [],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get(UserRepository);
    jest.clearAllMocks();
  });

  describe('addUser', () => {
    describe('when addUser is called', () => {
      let createUserDto: CreateUserDTO;
      let createdUser: IUser;

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation((pass, salt, cb) => Promise.resolve(''));

      beforeEach(async () => {
        createUserDto = {
          username: userStub().username,
          email: userStub().email,
          password: userStub().passowrd,
          roles: userStub().roles,
        };

        createdUser = await userService.addUser(createUserDto);
      });

      test('then it should call userRepository', () => {
        expect(userRepository.create).toHaveBeenCalledWith({
          ...createUserDto,
          password: '',
        });
      });

      test('then it should return a user', () => {
        expect(createdUser).toEqual(userStub());
      });
    });
  });

  describe('findUser', () => {
    describe('when findUser is called', () => {
      let user: User;
      let email: string;
      beforeEach(async () => {
        email = userStub().email;
        user = await userService.findUser(email);
      });

      test('when it should call userRepository', () => {
        expect(userRepository.findOne).toHaveBeenCalledWith({ email });
      });

      test('when it should return user', () => {
        expect(user).toEqual({ ...userStub(), password: '' });
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let updateUserDto: UpdateUserDTO;
      let user: IUser;
      beforeEach(async () => {
        updateUserDto = {
          roles: [Role.USER],
        };
        user = await userService.updateUser(
          userStub()._id.toHexString(),
          updateUserDto,
        );
      });

      test('when it should call userRepository', () => {
        expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith(
          {
            _id: userStub()._id.toHexString(),
          },
          updateUserDto,
        );
      });

      test('when it should return user updated', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
