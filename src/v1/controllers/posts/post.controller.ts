import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller()
export class PostsController {
    constructor(private postService: PostService) {}

    @Get()
    getPosts(): Promise<PostEntity[]> {
        return this.postService.getPosts();
    }

    @Get(':id')
    getPost(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.getPost(id);
    }

    @Post()
    createPost(@Body(ValidationPipe) post: PostDTO): Promise<PostEntity> {
        return this.postService.createPost(post);
    }

    @Delete(':id')
    deletePost(@Param('id') id: string): Promise<string> {
        return this.postService.deletePost(id);
    }
}
