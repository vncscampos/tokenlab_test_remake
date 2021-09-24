import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import AuthenticateService from '../services/AuthenticateService';
import Auth from '../../../entities/Auth';

@Resolver()
class AuthResolver {
  authService: any;
  constructor() {
    this.authService = new AuthenticateService();
  }

  @Mutation(() => Auth)
  async session(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    try {
      const { user, token } = await this.authService.store(email, password);

      delete user.password;

      return { user, token };
    } catch (err) {
      return err;
    }
  }
}

export default AuthResolver;
