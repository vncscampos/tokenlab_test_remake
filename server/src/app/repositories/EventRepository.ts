import { EntityRepository, Repository } from 'typeorm';

import Event from '../entities/Event';

@EntityRepository(Event)
class EventRepository extends Repository<Event> { }

export default EventRepository;