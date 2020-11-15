import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';
import { V1Module } from '../v1.module';

@Module({
    imports: [V1Module, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class SeedModule {}
