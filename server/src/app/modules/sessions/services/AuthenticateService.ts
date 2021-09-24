import { getCustomRepository, Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import User from '../../../entities/User';
import UserRepository from '../../../repositories/UserRepository';

interface Response {
  user: User;
  token: string;
}

class AuthenticateService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async store(email: string, password: string): Promise<Response> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect password!');
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateService;
