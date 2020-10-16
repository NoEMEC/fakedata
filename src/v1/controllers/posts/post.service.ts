import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDTO } from './dto/post.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
    ) {}

    async getPosts(): Promise<PostEntity[]> {
        return this.postRepository.find();
    }

    async getPost(id: string): Promise<PostEntity> {
        const post = await this.postRepository.findOne(id);

        if (!post)
            throw new NotFoundException(`Post with ID "${id}" not found`);

        return post;
    }

    async createPost(post: PostDTO): Promise<PostEntity> {
        return this.postRepository.createPost(post);
    }

    async deletePost(id: string): Promise<string> {
        await this.getPost(id);
        return `Post deleted`;
    }
}
