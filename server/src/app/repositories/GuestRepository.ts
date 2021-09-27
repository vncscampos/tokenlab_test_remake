import { EntityRepository, Repository } from 'typeorm';

import Guest from '../entities/Guest';

@EntityRepository(Guest)
class UserRepository extends Repository<Guest> {}

export default UserRepository;
