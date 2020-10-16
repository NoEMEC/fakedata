import { BaseEntity, ObjectIdColumn, Column, Entity } from 'typeorm';
import { UserGender } from './user-gender';

@Entity()
export class UserEntity extends BaseEntity {
    // @ObjectIdColumn: solo es usada para conexiones con mongodb, para otras db se usa @PrimaryColumn()
    @ObjectIdColumn()
    _id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    age: number;

    @Column()
    birthdate: Date;

    @Column()
    gender: UserGender;
}
