import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {EntityModule}from '@org/entity'
import {AuthModule} from 'features/src/lib/auth/auth.module'
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [TodosModule,ScheduleModule.forRoot({
    
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',         
      port: 5432,                 
      username: 'myuser',         
      password: 'mysecretpassword', 
      database: 'mydatabase',      
      autoLoadEntities: true, 
      synchronize: true
    }),
    EntityModule,AuthModule
  ],
  controllers: [AppController,TodosController],
  providers: [AppService,TodosService],
})
export class AppModule {}
