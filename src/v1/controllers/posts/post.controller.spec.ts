import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostsModule } from './post.module';
import { PostRepository } from './post.repository';
import request from 'supertest';
import { PostEntity } from './post.entity';

const mongoMemory = new MongoMemoryServer();

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
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', () => {
        expect(true).toBe(true);
    });

    it(`/GET posts`, async () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect([]);
    });

    it('/POST posts', async done => {
        return request(app.getHttpServer())
            .post('/')
            .send(testPost)
            .expect(201)
            .then(res => {
                const { _id, ...postWithoutId } = res.body;
                randomId = _id;
                expect(postWithoutId).toEqual(testPost);
                done();
            });
    });

    it(`/GET post`, async () => {
        return request(app.getHttpServer())
            .get(`/${randomId}`)
            .expect(200)
            .expect({ ...testPost, _id: randomId });
    });
});
