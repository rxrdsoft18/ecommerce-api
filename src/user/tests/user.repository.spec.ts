import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserModel } from './support/user.model';
import { FilterQuery } from 'mongoose';
import { userStub } from './stubs/user.stub';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
        controllers: [],
        imports: [],
      }).compile();

      userRepository = moduleRef.get<UserRepository>(UserRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));
      userFilterQuery = {
        email: userStub().email,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne');
          user = await userRepository.findOne(userFilterQuery);
        });

        test('when it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(
            userFilterQuery,
            {},
            { lean: true },
          );
        });

        test('when it should return a user', () => {
          expect(user).toEqual({ ...userStub(), password: '' });
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let user: User[];

        beforeEach(async () => {
          jest.spyOn(userModel, 'find');
          user = await userRepository.find(userFilterQuery);
        });

        test('when it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith(
            userFilterQuery,
            {},
            { lean: true },
          );
        });

        test('when it should return a user', () => {
          expect(user).toEqual([{ ...userStub(), password: '' }]);
        });
      });
    });

    describe('findAndUpdate', () => {
      describe('when findAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await userRepository.findOneAndUpdate(
            userFilterQuery,
            userStub(),
          );
        });

        test('when it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            userStub(),
            {
              lean: true,
              new: true,
            },
          );
        });

        test('when it should return a user', () => {
          expect(user).toEqual({ ...userStub(), password: '' });
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        // let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          // constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = await userRepository.create({ ...userStub(), password: '' });
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          // expect(constructorSpy).toHaveBeenCalledWith(userStub());
        });

        test('then it should return a user', () => {
          expect({
            email: user.email,
            password: user.password,
            roles: user.roles,
          }).toEqual({
            email: userStub().email,
            password: '',
            roles: userStub().roles,
          });
        });
      });
    });
  });
});
