import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
})
export class UserModule {}
