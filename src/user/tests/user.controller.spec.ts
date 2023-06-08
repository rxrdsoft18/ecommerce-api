import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Role } from '../../auth/enums/role.enum';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { IUser } from '../interfaces/user.interface';
import { UserRepository } from '../user.repository';

// jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUpdateRequest = {
    roles: [Role.USER],
  };

  const mockUserUpdated = {
    _id: userStub()._id,
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
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('update', () => {
    // describe('when update is called', () => {
    //   let updateUserDTO: UpdateUserDTO;
    //   let user: IUser;
    //   beforeEach(async () => {
    //     updateUserDTO = {
    //       roles: [Role.USER],
    //     };
    //
    //     user = await userController.update('1', updateUserDTO);
    //     console.log(user, 'before');
    //   });
    //
    //   test('then it should called userService', () => {
    //     expect(userService.updateUser).toHaveBeenCalled();
    //   });
    //
    //   test('then it should return updated user', () => {
    //     expect(user).toEqual(userStub());
    //   });
    // });

    test('should return an user updated', async () => {
      jest
        .spyOn(userService, 'updateUser')
        .mockImplementation(() => Promise.resolve(mockUserUpdated));

      expect(await userController.update('1', mockUpdateRequest)).toBe(
        mockUserUpdated,
      );
    });
  });
});
