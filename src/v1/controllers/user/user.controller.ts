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
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { Pagination, PaginationOptionsDTO } from 'src/paginate';

@ApiTags('users')
@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users by pages' })
    @ApiResponse({ status: 200, type: Pagination })
    getAllUsers(
        @Query() options: PaginationOptionsDTO,
    ): Promise<Pagination<User>> {
        const optionsPaginate: PaginationOptionsDTO = {
            page: Number(options.page) || 1,
            limit: Number(options.limit) || 10,
        };
        return this.userService.getUsers(optionsPaginate);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, type: User })
    getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUser(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: User })
    createUser(@Body(ValidationPipe) user: UserDTO): Promise<User> {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user by id' })
    @ApiResponse({ status: 200, type: User })
    updateUser(@Param('id') id: string, @Body('user') user: Partial<UserDTO>) {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 204, type: String })
    deleteUser(@Param('id') id: string): Promise<string> {
        return this.userService.deleteUser(id);
    }
}
