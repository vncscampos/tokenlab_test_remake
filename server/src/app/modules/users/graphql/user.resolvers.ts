import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import UserService from '../services/UserService';
import User from '../../../entities/User';

@Resolver()
class UserResolver {
  userService: any;
  constructor() {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    try {
      const user = await this.userService.create({
        name,
        email,
        password,
      });

      return user;
    } catch (err) {
      return err;
    }
  }

  @Query(() => [User])
  async users() {
    const users = await this.userService.list();
    return users;
  }
}

export default UserResolver;
