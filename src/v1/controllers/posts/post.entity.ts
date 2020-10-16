import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class PostEntity extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    userId: string;
}
