import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository])],
    controllers: [PostsController],
    providers: [PostService],
})
export class PostsModule {}
