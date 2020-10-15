import { Controller, Get } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller()
export class PostsController {
    constructor(private postService: PostService) {}

    @Get()
    getPosts(): Promise<PostEntity[]> {
        return this.postService.getPosts();
    }
}
