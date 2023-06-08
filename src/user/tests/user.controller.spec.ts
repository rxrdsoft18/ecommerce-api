import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Role } from '../../auth/enums/role.enum';
import { userStub } from './stubs/user.stub';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { IUser } from '../interfaces/user.interface';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('update', () => {
    describe('when update is called', () => {
      let updateUserDTO: UpdateUserDTO;
      let user: IUser;
      beforeEach(async () => {
        updateUserDTO = {
          roles: [Role.USER],
        };

        user = await userController.update(
          userStub()._id.toHexString(),
          updateUserDTO,
        );
      });

      test('then it should called userService', () => {
        expect(userService.updateUser).toHaveBeenCalledWith(
          userStub()._id.toHexString(),
          updateUserDTO,
        );
      });

      test('then it should return updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
