import { EntityRepository, Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { PostEntity } from './post.entity';
import { ObjectId } from 'mongodb';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    async createPost(post: PostDTO): Promise<PostEntity> {
        const { title, body, userId } = post;
        const postEntity = new PostEntity();
        postEntity.title = title;
        postEntity.body = body;
        postEntity.userId = userId;
        postEntity._id = new ObjectId().toHexString();
        try {
            return postEntity;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
