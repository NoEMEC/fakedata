import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { ObjectId } from 'mongodb';
import { Connection } from 'typeorm';

const mongoMemory = new MongoMemoryServer();
let connection: Connection;

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
        connection = testModule.get(getConnectionToken());
    });

    afterAll(async done => {
        connection.close();
        await mongoMemory.stop();
        done();
    });

    it('should service be defined', done => {
        expect(service).toBeDefined();
        done();
    });

    describe('getPosts', () => {
        it('should be an array', async done => {
            const posts = await service.getPosts();
            expect(posts instanceof Array).toBe(true);
            done();
        });
    });

    describe('createPosts', () => {
        it('should return a new post', async done => {
            const post = await service.createPost(testPost);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...postWithoutId } = post;
            expect(postWithoutId).toEqual(testPost);
            expect(post instanceof PostEntity).toBe(true);
            done();
        });

        it('should create each post', async done => {
            for await (let post of testPosts) {
                post = await service.createPost(post);
            }

            const posts = await service.getPosts();

            randomId =
                posts[Math.floor(Math.random() * (posts.length - 1))]._id;

            expect(posts.length).toEqual(6);
            done();
        });
    });

    describe('getPost', () => {
        it('should obtain a post by id', async done => {
            const post = await service.getPost(randomId);
            expect(post).not.toBe(undefined);
            expect(post instanceof PostEntity).toBe(true);
            done();
        });

        it('should return error when id not exist', async done => {
            const badId = new ObjectId().toHexString();
            await expect(service.getPost(badId)).rejects.toThrow(
                `Post with ID "${badId}" not found`,
            );
            done();
        });
    });
});
