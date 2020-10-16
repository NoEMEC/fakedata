import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { UserGender } from '../user-gender';

registerEnumType(UserGender, {
    name: 'UserGender',
});

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

    @Field(() => UserGender, {
        nullable: true,
    })
    @IsIn([UserGender.FEMALE, UserGender.MALE, UserGender.OTHER])
    gender: UserGender;
}
