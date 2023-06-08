import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserRepository } from './user.repository';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<IUser> {
    const passwordHashed = await bcrypt.hash(createUserDTO.password, 10);
    const userCreated = await this.userRepository.create({
      ...createUserDTO,
      password: passwordHashed,
    });

    return {
      _id: userCreated._id,
      username: userCreated.username,
      email: userCreated.email,
      roles: userCreated.roles,
    };
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async updateUser(id: string, updateUser: UpdateUserDTO): Promise<IUser> {
    const userUpdated = await this.userRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateUser,
    );

    return {
      _id: userUpdated._id,
      username: userUpdated.username,
      email: userUpdated.email,
      roles: userUpdated.roles,
    };
  }
}
