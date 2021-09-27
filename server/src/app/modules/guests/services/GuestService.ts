import { getCustomRepository, Repository } from 'typeorm';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../../../entities/User';
import Guest from '../../../entities/Guest';
import Event from '../../../entities/Event';
import UserRepository from '../../../repositories/UserRepository';
import GuestRepository from '../../../repositories/GuestRepository';
import EventRepository from '../../../repositories/EventRepository';

import Mail from '../../../../lib/Mail';

class EventService {
  private eventRepository: Repository<Event>;
  private userRepository: Repository<User>;
  private guestRepository: Repository<Guest>;

  constructor() {
    this.eventRepository = getCustomRepository(EventRepository);
    this.userRepository = getCustomRepository(UserRepository);
    this.guestRepository = getCustomRepository(GuestRepository);
  }

  async create(guests: string, event_id: string) {
    const guestsArr = guests.split(' ');

    guestsArr.forEach(async email => {
      const user = await this.userRepository.findOne({ email });

      if (!user) {
        throw new Error('User not found!');
      }

      const event = await this.eventRepository.findOne({ id: event_id });

      const guest = this.guestRepository.create({
        user_id: user.id,
        event_id: event.id,
      });

      await this.guestRepository.save(guest);

      await Mail.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'Você recebeu um novo convite',
        template: 'invitation',
        context: {
          name: user.name,
          date: format(event.start_date, "dd 'de' MMMM', às' H:mm'h'", {
            locale: pt,
          }),
          description: event.description,
        },
      });
    });

    return guestsArr;
  }

  async list(user_id: string) {
    const user = await this.userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not found!');
    }

    const invites = await this.guestRepository.find({
      relations: ['event'],
      where: { user_id },
      select: ['event'],
    });

    const formatInvites = await invites.map(({ event }) => {
      return {
        id: event.id,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
      };
    });

    return formatInvites;
  }

  async delete(event_id: string, user_id: string) {
    const user = await this.userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not found!');
    }

    const event = await this.eventRepository.findOne({ id: event_id });

    if (!event) {
      throw new Error('Event not found!');
    }

    const guest = await this.guestRepository.findOne({ event_id, user_id });

    if (!guest) {
      throw new Error('Invite not found!');
    }

    await this.guestRepository.delete({ event_id });

    return { message: 'Invite removed' };
  }
}

export default EventService;
