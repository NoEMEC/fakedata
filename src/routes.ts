import { Routes } from 'nest-router';
import { PostsModule } from './v1/controllers/posts/post.module';
import { UserModule } from './v1/controllers/user/user.module';
import { V1Module } from './v1/v1.module';

export const routes: Routes = [
    {
        path: '/v1',
        module: V1Module,
        children: [
            {
                path: '/users',
                module: UserModule,
            },
            {
                path: '/posts',
                module: PostsModule,
            },
        ],
    },
];
