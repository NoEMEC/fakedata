import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class PostEntity extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    user_id: string;
}
