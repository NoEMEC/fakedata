import { Module } from '@nestjs/common';
import { UserModule } from './controllers/users/user.module';
import { PostsModule } from './controllers/posts/post.module';

@Module({
    imports: [UserModule, PostsModule],
})
export class V1Module {}
