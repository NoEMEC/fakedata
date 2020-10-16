import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UpdateUserInput } from './input/user-update.input';

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [User], { description: 'Get all users' })
    async users(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Query(() => User, { description: 'Get a unique user per id' })
    async user(@Args('id') id: string): Promise<User> {
        return this.userService.getUser(id);
    }

    @Mutation(() => User, { description: 'Create a new user' })
    async createUser(
        @Args('createUserInput') createUserInput: UserDTO,
    ): Promise<User> {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(() => User, { description: 'Update a user' })
    async updateUser(
        @Args('id') id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => String, { description: 'Delete a user' })
    async deleteUser(@Args('id') id: string): Promise<string> {
        return this.userService.deleteUser(id);
    }
}
