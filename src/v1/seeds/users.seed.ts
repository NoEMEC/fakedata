import { NestFactory } from '@nestjs/core';
import { User } from '../controllers/user/user.entity';
import { SeedModule } from './seeder.module';
import * as faker from 'faker/locale/es';
import { UserRepository } from '../controllers/user/user.repository';
import { UserGender } from '../controllers/user/user-gender';

const genders = {
    0: UserGender.MALE,
    1: UserGender.FEMALE,
    2: UserGender.OTHER,
};

async function bootstrap() {
    NestFactory.createApplicationContext(SeedModule).then(async appContext => {
        const userRepository = appContext.get(UserRepository);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of Array(1000)) {
            const userTemp = new User();
            const gender = faker.random.number(2);
            userTemp.age = faker.random.number(99);
            userTemp.birthdate = faker.date.past(40).toISOString();
            userTemp.firstname = faker.name.firstName(gender);
            userTemp.lastname = faker.name.lastName();
            userTemp.gender = genders[gender];
            await userRepository.createUser(userTemp);
        }
        appContext.close();
    });
}

bootstrap();
