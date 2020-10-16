import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UpdateUserInput } from './input/user-update.input';

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Query(() => User)
    async getUser(@Args('id') id: string): Promise<User> {
        return this.userService.getUser(id);
    }

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: UserDTO,
    ): Promise<User> {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id') id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => User)
    async deleteUser(
        @Args('id') id: string,
    ): Promise<User> {
        return this.userService.getUser(id);
    }
}
