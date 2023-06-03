import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }

  async updateUser(id: string, updateUser: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      updateUser,
      {
        lean: true,
      },
    );
  }
}
