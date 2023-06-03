import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDTO) {
    return this.userService.updateUser(id, updateUser);
  }
}
