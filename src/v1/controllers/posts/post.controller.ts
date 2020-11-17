import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from './../../../paginate';
import { PostDTO } from './dto/post.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller()
export class PostsController {
    constructor(private postService: PostService) {}

    @Get()
    @ApiOperation({ summary: 'Get all post by pages' })
    @ApiResponse({ status: 200, type: Pagination })
    getPosts(): Promise<PostEntity[]> {
        return this.postService.getPosts();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get post by id' })
    @ApiResponse({ status: 200, type: PostEntity })
    getPost(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.getPost(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create post' })
    @ApiResponse({ status: 201, type: PostEntity })
    createPost(@Body(ValidationPipe) post: PostDTO): Promise<PostEntity> {
        return this.postService.createPost(post);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 204, type: String })
    deletePost(@Param('id') id: string): Promise<string> {
        return this.postService.deletePost(id);
    }
}
