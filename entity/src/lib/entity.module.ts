import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './test.entity';
import { tasksEntity } from './tasks.entity';
import { tokensEntity } from './tokens.entitiy';
@Module({
  imports:[TypeOrmModule.forFeature([TestUser,tasksEntity,tokensEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class EntityModule {}
