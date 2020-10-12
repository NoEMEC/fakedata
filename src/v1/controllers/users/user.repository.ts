import { Repository, EntityRepository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserDTO } from "./dto/user.dto";
import { Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    logger: Logger = new Logger();
    async createUser(user: UserDTO): Promise<UserEntity> {
        const { firstname, lastname, birthdate, age } = user;
        const userEntity = new UserEntity();
        userEntity.firstname = firstname;
        userEntity.birthdate = birthdate;
        userEntity.lastname = lastname;
        userEntity.age = age;
        // TODO: Comentar si se va a guardar algun usuario!
        userEntity._id = new ObjectId().toHexString()
        try {
            // TODO: not save user
            // await userEntity.save();
            return userEntity;
        } catch (error) {
            this.logger.error('Database Error: ', error.stack);
        }
    }
}