import { IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import { UserGender } from '../user-gender';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserDTO {
    @ApiProperty()
    @Field()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @Field()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @Field()
    @IsNotEmpty()
    age: number;

    @ApiProperty({ default: new Date().toISOString() })
    @Field()
    @IsNotEmpty()
    @IsDateString()
    birthdate: string;

    @ApiProperty({ default: UserGender.OTHER })
    @Field()
    @IsNotEmpty()
    @IsIn([UserGender.FEMALE, UserGender.MALE, UserGender.OTHER])
    gender: string;
}
