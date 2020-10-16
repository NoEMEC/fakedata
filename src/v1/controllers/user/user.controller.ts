import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ValidationPipe,
    Patch,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/v1/controllers/user/dto/user.dto';
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

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body('user') user: Partial<UserDTO>) {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string): Promise<string> {
        return this.userService.deleteUser(id);
    }
}
