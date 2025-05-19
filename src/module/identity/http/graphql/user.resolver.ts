import { UserManagementService } from '@identityModule/core/service/user-management.service';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './type/user.type';
import { CreateUserInput } from './type/create-user-input.type';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedRequest, AuthGuard } from '../guard/auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userManagementService: UserManagementService) {}
  @Mutation(() => User)
  async createUser(
    @Args('CreateUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.userManagementService.create(createUserInput);
    return user;
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async getProfile(@Context('req') req: AuthenticatedRequest): Promise<User> {
    return req.user;
  }
}
