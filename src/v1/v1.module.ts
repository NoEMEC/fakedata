import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/users.module';
import { PostsModule } from './controllers/posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
})
export class V1Module {}
