import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    V1Module,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb://root:root@mongo:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
      entities: [join(__dirname, '**/**.entity{.js,.ts}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
