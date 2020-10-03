import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  birthdate: Date;
  @Prop({
    required: true,
    enum: ['male', 'female', 'other'],
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
