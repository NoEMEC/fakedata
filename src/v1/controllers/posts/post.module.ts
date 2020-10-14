import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';

@Module({
  controllers: [PostsController],
})
export class PostsModule {}
