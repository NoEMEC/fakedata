import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { ObjectId } from 'mongodb';

const mongoMemory = new MongoMemoryServer();

const testPost = {
    title: 'Test title',
    body: 'Test body',
    userId: 'randomId',
};

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

let randomId;

describe('PostService', () => {
    let service: PostService;
    let testModule: TestingModule;

    beforeEach(async () => {
        const url = await mongoMemory.getUri();
        testModule = await Test.createTestingModule({
            providers: [PostService],
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mongodb',
                    url,
                    entities: [__dirname + '/post.entity{.js,.ts}'],
                    keepConnectionAlive: true,
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                    synchronize: true,
                }),
                TypeOrmModule.forFeature([PostRepository]),
            ],
        }).compile();

        service = testModule.get<PostService>(PostService);
    });

    afterAll(async () => {
        await mongoMemory.stop();
    });

    it('should service be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getPosts', () => {
        it('should be an array', async () => {
            const posts = await service.getPosts();
            expect(posts instanceof Array).toBe(true);
        });
    });

    describe('createPosts', () => {
        it('should return a new post', async () => {
            const post = await service.createPost(testPost);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...postWithoutId } = post;
            expect(postWithoutId).toEqual(testPost);
            expect(post instanceof PostEntity).toBe(true);
        });

        it('should create each post', async () => {
            for await (let post of testPosts) {
                post = await service.createPost(post);
            }

            const posts = await service.getPosts();

            randomId =
                posts[Math.floor(Math.random() * (posts.length - 1))]._id;

            expect(posts.length).toEqual(6);
        });
    });

    describe('getPost', () => {
        it('should obtain a post by id', async () => {
            const post = await service.getPost(randomId);
            expect(post).not.toBe(undefined);
            expect(post instanceof PostEntity).toBe(true);
        });

        it('should return error when id not exist', async () => {
            const badId = new ObjectId().toHexString();
            await expect(service.getPost(badId)).rejects.toThrow(
                `Post with ID "${badId}" not found`,
            );
        });
    });
});
