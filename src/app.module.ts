import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        V1Module,
        TypeOrmModule.forRoot(typeOrmConfig),
    ],
})
export class AppModule {}
