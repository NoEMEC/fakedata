import { PostRepository } from '../controllers/posts/post.repository';
import { PostEntity } from '../controllers/posts/post.entity';

const testPosts = [
    {
        title: 'Test title 1',
        body: 'Test body 1',
        userId: 'randomId',
    },
    {
        title: 'Test title 2',
        body: 'Test body 2',
        userId: 'randomId',
    },
    {
        title: 'Test title 3',
        body: 'Test body 3',
        userId: 'randomId',
    },
    {
        title: 'Test title 4',
        body: 'Test body 4',
        userId: 'randomId',
    },
    {
        title: 'Test title 5',
        body: 'Test body 5',
        userId: 'randomId',
    },
];

export const seed = async (repository: PostRepository) => {
    for await (const post of testPosts) {
        let testPost = new PostEntity();
        testPost.title = post.title;
        testPost.body = post.body;
        testPost.userId = post.userId;
        testPost = await repository.create(testPost);
        testPost.save();
    }
};
