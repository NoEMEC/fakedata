import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PostEntity extends BaseEntity {
    @ApiProperty({ type: String })
    @ObjectIdColumn()
    _id: ObjectID;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    body: string;

    @ApiProperty()
    @Column()
    userId: string;
}
