import { getCustomRepository, Repository } from 'typeorm';
import { startOfHour, parseISO, isBefore, endOfHour } from 'date-fns';

import Event from '../../../entities/Event';
import User from '../../../entities/User';
import EventRepository from '../../../repositories/EventRepository';
import UserRepository from '../../../repositories/UserRepository';

interface IEventCreate {
  id: string;
  user_id: string;
  description: string;
  start_date: string;
  end_date: string;
}

class EventService {
  private eventRepository: Repository<Event>;
  private userRepository: Repository<User>;

  constructor() {
    this.eventRepository = getCustomRepository(EventRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ user_id, description, start_date, end_date }: IEventCreate) {
    const user = await this.userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not found!');
    }

    // Check if the time has passed
    const hourStart = startOfHour(parseISO(start_date));
    const hourEnd = endOfHour(parseISO(end_date));

    if (isBefore(hourStart, new Date()) || isBefore(hourEnd, new Date())) {
      throw new Error('Past date are no permitted!');
    }

    if(new Date(start_date).getDate() > new Date(end_date).getDate() || new Date(start_date).getMonth() > new Date(end_date).getMonth()) {
      throw new Error('Start date greater than end date is not allowed!');
    }

    // Check if you already have an event at this time
    const checkAvailability = await this.eventRepository.findOne({
      where: {
        user_id,
        start_date,
      },
    });

    if (checkAvailability) {
      throw new Error('Event date is not available');
    }

    const newStartDate = new Date(start_date);
    const newEndDate = new Date(end_date);

    const event = this.eventRepository.create({
      user_id,
      description,
      start_date: newStartDate,
      end_date: newEndDate,
    });

    await this.eventRepository.save(event);

    return event;
  }

  async list(user_id: string) {
    const user = await this.userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not found!');
    }

    const events = await this.eventRepository.find({ user_id });

    return events;
  }

  async update({
    id,
    user_id,
    description,
    start_date,
    end_date,
  }: IEventCreate) {
    const user = await this.userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not found!');
    }

    const event = await this.eventRepository.findOne({ id });

    if (!event) {
      throw new Error('Event not found!');
    }

    if (description) {
      event.description = description;
    }

    if (start_date) {
      event.start_date = parseISO(start_date);
    }

    if (end_date) {
      event.end_date = parseISO(end_date);
    }

    await this.eventRepository.save(event);

    return event;
  }

  async delete({ id, user_id }: IEventCreate) {
    const user = await this.userRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not found!');
    }
    
    const event = await this.eventRepository.findOne({ id });


    if (!event) {
      throw new Error('Event not found!');
    }

    await this.eventRepository.delete({ id });

    return 'Event removed!';
  }
}

export default EventService;
