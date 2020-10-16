import { IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import { UserGender } from '../user-gender';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserDTO {
    @Field()
    @IsNotEmpty()
    firstname: string;

    @Field()
    @IsNotEmpty()
    lastname: string;

    @Field()
    @IsNotEmpty()
    age: number;

    @Field()
    @IsNotEmpty()
    @IsDateString()
    birthdate: string;

    @Field()
    @IsNotEmpty()
    @IsIn([UserGender.FEMALE, UserGender.MALE, UserGender.OTHER])
    gender: string;
}
