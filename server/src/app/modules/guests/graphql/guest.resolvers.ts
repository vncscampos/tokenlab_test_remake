import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { Request } from 'express';

import GuestService from '../services/GuestService';
import Event from '../../../entities/Event';

interface Context {
  token?: string;
  req?: Request;
}

@Resolver()
class GuestResolver {
  guestService: any;
  constructor() {
    this.guestService = new GuestService();
  }

  @Authorized()
  @Mutation(() => String)
  async deleteEvent(@Ctx() context: Context, @Arg('id') id: string) {
    try {
      const user_id = context.req.user.id;

      const message = await this.guestService.delete(id, user_id);

      return message;
    } catch (err) {
      return err;
    }
  }

  @Authorized()
  @Query(() => [Event])
  async guests(@Ctx() context: Context) {
    const user_id = context.req.user.id;

    const guests = await this.guestService.list(user_id);

    return guests;
  }
}

export default GuestResolver;
