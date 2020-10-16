import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    V1Module,
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      // Caracteristica para trabajar con "Code first"
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
  ]})
export class AppModule {}
