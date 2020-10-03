import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/v1/schema/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from 'src/v1/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUser(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async create(user: UserDTO): Promise<User> {
    return this.userModel.create(user);
  }
}
