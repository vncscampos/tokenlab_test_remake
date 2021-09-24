import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { Request } from 'express';

import EventService from '../services/EventService';
import Event from '../../../entities/Event';

interface Context {
  token?: string;
  req?: Request;
}

@Resolver()
class EventResolver {
  eventService: any;
  constructor() {
    this.eventService = new EventService();
  }

  @Authorized()
  @Mutation(() => Event)
  async createEvent(
    @Ctx() context: Context,
    @Arg('description') description: string,
    @Arg('start_date') start_date: string,
    @Arg('end_date') end_date: string,
  ) {
    try {
      const user_id = context.req.user.id;

      const event = await this.eventService.create({
        user_id,
        description,
        start_date,
        end_date,
      });

      return event;
    } catch (err) {
      return err;
    }
  }

  

  @Authorized()
  @Mutation(() => String)
  async deleteEvent(@Ctx() context: Context, @Arg('id') id: string) {
    try {
      const user_id = context.req.user.id;

      const message = await this.eventService.delete(id, user_id);

      console.log(message)

    } catch (err) {
      return err;
    }
  }

  @Query(() => [Event])
  @Authorized()
  async events(@Ctx() context: Context) {
    const user_id = context.req.user.id;

    const events = await this.eventService.list(user_id);

    return events;
  }
}

export default EventResolver;
