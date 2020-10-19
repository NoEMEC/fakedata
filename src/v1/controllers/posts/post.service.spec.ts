import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { ObjectId } from 'mongodb';
import { Connection } from 'typeorm';
import { seed } from '../../seeds/test.seed';

const mongoMemory = new MongoMemoryServer();
let connection: Connection;

const testPost = {
    title: 'Test title',
    body: 'Test body',
    userId: 'randomId',
};

let randomId;

describe('PostService', () => {
    let service: PostService;
    let testModule: TestingModule;
    let repository: PostRepository;

    beforeAll(async () => {
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
        repository = testModule.get<PostRepository>(PostRepository);
        connection = testModule.get(getConnectionToken());
        await seed(repository);
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
        it('should return a simulate new create post', async done => {
            const post = await service.createPost(testPost);
            delete post._id;
            expect(post).toEqual(testPost);
            expect(post instanceof PostEntity).toBe(true);
            done();
        });

        it('should not alter the length of database', async done => {
            const posts = await service.getPosts();
            expect(posts.length).toEqual(5);
            done();
        });
    });

    describe('getPost', () => {
        it('should obtain all posts', async done => {
            const posts = await service.getPosts();
            expect(posts).not.toBe(undefined);
            randomId = posts[0]._id;
            done();
        });

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
