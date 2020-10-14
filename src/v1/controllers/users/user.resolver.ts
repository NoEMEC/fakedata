import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User] || [])
  async users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: UserDTO,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }
}
