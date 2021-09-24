import User from './User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class Auth {
  @Field()
  token: string;
  @Field()
  user: User;
}

export default Auth;