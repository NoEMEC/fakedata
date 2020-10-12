import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/v1/controllers/users/dto/user.dto';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) user: UserDTO): Promise<User> {
    return this.userService.createUser(user);
  }
}
