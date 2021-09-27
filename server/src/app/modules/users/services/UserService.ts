import { getCustomRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../../entities/User';
import UserRepository from '../../../repositories/UserRepository';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ name, email, password }: IUser) {
    const checkUserExists = await this.userRepository.findOne({ email });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export default UserService;
