import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './v1/v1.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    V1Module,
    MongooseModule.forRoot(
      'mongodb://root:root@database:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    ),
  ],
})
export class AppModule {}
