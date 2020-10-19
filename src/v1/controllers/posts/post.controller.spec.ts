import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostsModule } from './post.module';
import { PostRepository } from './post.repository';
import request from 'supertest';
import { PostEntity } from './post.entity';
import { Connection } from 'typeorm';
import { seed } from '../../seeds/test.seed';

const mongoMemory: MongoMemoryServer = new MongoMemoryServer();
let connection: Connection;

const testPost = {
    title: 'Test title',
    body: 'Test body',
    userId: 'randomId',
};

let randomId;

describe('PostsController & e2e', () => {
    let app: INestApplication;
    let repository: PostRepository;
    beforeAll(async () => {
        const url = await mongoMemory.getUri();
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PostsModule,
                TypeOrmModule.forRoot({
                    type: 'mongodb',
                    url,
                    entities: [PostEntity],
                    keepConnectionAlive: true,
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                }),
                TypeOrmModule.forFeature([PostRepository]),
            ],
        }).compile();

        app = module.createNestApplication();
        connection = module.get(getConnectionToken());
        repository = module.get<PostRepository>(PostRepository);
        await seed(repository);
        await app.init();
    });

    afterAll(async done => {
        connection.close();
        await mongoMemory.stop();
        app.close();
        done();
    });

    it(`/GET posts`, async done => {
        request(app.getHttpServer())
            .get('/')
            .expect(200)
            .then(({ body }) => {
                expect(body instanceof Array).toBe(true);
                expect(body.length).toEqual(5);
                done();
            });
    });

    it('/POST posts', async done => {
        request(app.getHttpServer())
            .post('/')
            .send(testPost)
            .expect(201)
            .then(async ({ body }) => {
                delete body._id;
                expect(body).toEqual(testPost);
                const posts = await repository.find();
                randomId = posts[0]._id;
                expect(posts.length).toEqual(5);
                done();
            });
    });

    it(`/GET post`, async done => {
        request(app.getHttpServer())
            .get(`/${randomId}`)
            .expect(200)
            .then(({ body }) => {
                expect(body).not.toBe(undefined);
                expect(body instanceof Object).toBe(true);
                done();
            });
    });
});
