import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(user: UserDTO): Promise<UserEntity> {
    return this.userRepository.createUser(user);
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
}
