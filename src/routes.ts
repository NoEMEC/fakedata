import { Routes } from 'nest-router';
import { PostsModule } from './v1/controllers/posts/posts.module';
import { UserModule } from './v1/controllers/users/user.module';
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
