import { Injectable, NotFoundException } from '@nestjs/common';
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
        const user = await this.userRepository.findOne(id);
        if (!user)
            throw new NotFoundException(`User with ID "${id}" not found`);
        return user;
    }

    async createUser(user: UserDTO): Promise<User> {
        return this.userRepository.createUser(user);
    }

    async updateUser(id: string, user: Partial<UserDTO>): Promise<User> {
        await this.getUser(id);
        return this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: string): Promise<string> {
        await this.getUser(id);
        return 'User deleted';
    }
}
