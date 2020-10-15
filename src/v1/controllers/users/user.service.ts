import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserDTO } from './dto/user.dto';
import { UserGender } from './user-gender';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        console.log(this.userRepository.manager.connection.getRepository);
        const userDto = new UserDTO();
        userDto.firstname = 'Jose';
        userDto.age = 24;
        userDto.birthdate = new Date();
        userDto.gender = UserGender.MALE;
        userDto.lastname = 'Altamar Molina';
        this.userRepository.createUser(userDto);
        console.log('USUARIOS', users);
        return this.userRepository.find();
    }

    async createUser(user: UserDTO): Promise<UserEntity> {
        return this.userRepository.createUser(user);
    }

    async getUser(id: string): Promise<UserEntity> {
        return this.userRepository.findOne(id);
    }
}
