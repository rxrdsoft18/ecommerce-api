// import { Test, TestingModule } from '@nestjs/testing';
//
// import { AuthController } from '../auth.controller';
// import { AuthService } from '../auth.service';
// import { accessTokenStub, loginStub } from './stubs/login.stub';
//
// jest.mock('../auth.service');
//
// describe('AuthController', () => {
//   let authController: AuthController;
//   // let authService: AuthService;
//
//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [AuthService],
//     }).compile();
//
//     authController = moduleRef.get<AuthController>(AuthController);
//     // authService = moduleRef.get<AuthService>(AuthService);
//     jest.clearAllMocks();
//   });
//
//   describe('login', () => {
//     test('should return a token', () => {
//       expect(authController.login(loginStub())).toBe(accessTokenStub());
//     });
//   });
// });
