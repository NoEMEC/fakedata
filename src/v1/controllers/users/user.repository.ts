import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import { Logger } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    logger: Logger = new Logger();
    async createUser(user: UserDTO): Promise<User> {
        const { firstname, lastname, birthdate, age, gender } = user;
        const userCreated = new User();
        userCreated.firstname = firstname;
        userCreated.birthdate = birthdate;
        userCreated.lastname = lastname;
        userCreated.gender = gender;
        userCreated.age = age;
        // TODO: Comentar si se va a guardar algun usuario!
        // userCreated._id = new ObjectId().toHexString();
        try {
            // TODO: not save user
            await userCreated.save();
            return userCreated;
        } catch (error) {
            this.logger.error('Database Error: ', error.stack);
        }
    }

    async updateUser(id: string, user: Partial<UserDTO>): Promise<User> {
        const currentUser = await this.findOne(id);
        const userUpdated = { ...classToPlain(currentUser), ...user };
        const userp = new User();
        userp._id = currentUser._id;
        Object.entries(userUpdated).forEach(([key, value]) => {
            if (key !== '_id') userp[key] = value;
        });
        return userp;
    }
}
