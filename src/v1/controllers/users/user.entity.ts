import { BaseEntity, ObjectIdColumn, Column, Entity } from 'typeorm';
import { UserGender } from './user-gender';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';

registerEnumType(UserGender, {
    name: 'UserGender',
});

@Entity()
@ObjectType()
export class User extends BaseEntity {
    // @ObjectIdColumn: solo es usada para conexiones con mongodb, para otras db se usa @PrimaryColumn()
    @Field(() => ID)
    @ObjectIdColumn()
    _id: string;

    @Field()
    @Column()
    firstname: string;

    @Field()
    @Column()
    lastname: string;

    @Field()
    @Column()
    age: number;

    @Field()
    @Column()
    birthdate: string;

    @Field(() => UserGender)
    @Column('enum', { enum: UserGender, default: UserGender.OTHER })
    gender: string;
}
