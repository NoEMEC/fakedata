import { BaseEntity, ObjectIdColumn, Column, Entity } from 'typeorm';
import { UserGender } from './user-gender';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

registerEnumType(UserGender, {
    name: 'UserGender',
});

@Entity()
@ObjectType()
export class User extends BaseEntity {
    // @ObjectIdColumn: solo es usada para conexiones con mongodb, para otras db se usa @PrimaryColumn()
    @ApiProperty()
    @Field(() => ID)
    @ObjectIdColumn()
    _id: string;

    @ApiProperty()
    @Field()
    @Column()
    firstname: string;

    @ApiProperty()
    @Field()
    @Column()
    lastname: string;

    @ApiProperty()
    @Field()
    @Column()
    age: number;

    @ApiProperty()
    @Field()
    @Column()
    birthdate: string;

    @ApiProperty()
    @Field(() => UserGender)
    @Column('enum', { enum: UserGender, default: UserGender.OTHER })
    gender: string;
}
