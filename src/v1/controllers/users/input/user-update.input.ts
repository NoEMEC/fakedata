import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { UserGender } from '../user-gender';

@InputType()
export class UpdateUserInput {
    @Field({
        nullable: true,
    })
    firstname: string;

    @Field({
        nullable: true,
    })
    lastname: string;

    @Field({
        nullable: true,
    })
    age: number;

    @Field({
        nullable: true,
    })
    birthdate: string;

    @Field({
        nullable: true,
    })
    @IsIn([UserGender.FEMALE, UserGender.MALE, UserGender.OTHER])
    gender: string;
}
