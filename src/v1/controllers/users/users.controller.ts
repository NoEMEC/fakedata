import { Controller, Get, Post, Body, UsePipes, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/v1/schema/user.schema';
import { UserDTO } from 'src/v1/dto/user.dto';
import { ValidationPipe } from 'src/v1/shared/pipes/validation.pipe';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: UserDTO) {
    return this.usersService.create(user);
  }
}
