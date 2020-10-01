import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [RouterModule.forRoutes(routes), V1Module],
})
export class AppModule {}
