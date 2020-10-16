import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: UserDTO): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
