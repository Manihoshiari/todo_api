import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AuthModule } from 'features/src/lib/auth/auth.module';
import { tasksEntity } from 'entity/src/lib/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from 'entity/src/lib/test.entity';

@Module({
  imports:[TypeOrmModule.forFeature([tasksEntity,TestUser]),AuthModule],
  controllers: [TodosController],
  providers: [TodosService,AuthModule,tasksEntity],
})
export class TodosModule {}
