import { Module } from '@nestjs/common';
import { UserModule } from './controllers/user/user.module';
import { PostsModule } from './controllers/posts/post.module';

@Module({
    imports: [UserModule, PostsModule],
})
export class V1Module {}
