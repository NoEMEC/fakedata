import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    V1Module,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb://root:root@mongo:27017/fakedata_db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
      entities: [join(__dirname, '**/**.entity{.js,.ts}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      // Caracteristica para trabajar con "Code first"
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
  ],
})
export class AppModule {}
