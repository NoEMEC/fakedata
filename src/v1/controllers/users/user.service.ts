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

    async getUser(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async createUser(user: UserDTO): Promise<User> {
        return this.userRepository.createUser(user);
    }

    async updateUser(id: string, user: Partial<UserDTO>): Promise<User> {
        return this.userRepository.updateUser(id, user);
    }
}
