import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostsModule } from './post.module';
import { PostRepository } from './post.repository';
import request from 'supertest';
import { PostEntity } from './post.entity';
import { Connection } from 'typeorm';

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
    beforeEach(async () => {
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
        await app.init();
    });

    afterAll(async done => {
        connection.close();
        await mongoMemory.stop();
        app.close();
        done();
    });

    it('should be defined', done => {
        expect(true).toBe(true);
        done();
    });

    it(`/GET posts`, async done => {
        request(app.getHttpServer())
            .get('/')
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual([]);
                done();
            });
    });

    it('/POST posts', async done => {
        request(app.getHttpServer())
            .post('/')
            .send(testPost)
            .expect(201)
            .then(({ body }) => {
                const { _id, ...postWithoutId } = body;
                randomId = _id;
                expect(postWithoutId).toEqual(testPost);
                done();
            });
    });

    it(`/GET post`, async done => {
        request(app.getHttpServer())
            .get(`/${randomId}`)
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual({ ...testPost, _id: randomId });
                done();
            });
    });
});
