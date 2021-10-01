import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import * as Yup from 'yup';

import UserService from '../services/UserService';
import User from '../../../entities/User';

@Resolver()
class UserResolver {
  userService: any;
  constructor() {
    this.userService = new UserService();
  }

  @Query(() => Boolean)
  user() {
    return true;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string()
          .required()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
          ),
      });

      await schema.validate({ name, email, password });

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
}

export default UserResolver;
