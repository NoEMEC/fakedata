import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    url: process.env.DB_URL || dbConfig.url,
    entities: [__dirname + '/../**/**.entity{.js,.ts}'],
    useNewUrlParser: true,
    logging: true,
    synchronize: dbConfig.synchronize,
};
