import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { taskdata } from '../task.data';
import { log } from 'console';
import { newTask } from '@org/models';

@Injectable()
export class TodosService {
  create(createTodoDto: newTask) {
    return taskdata.unshift(createTodoDto)
  }

  findAll() {
    return taskdata;
    
  }

  findOne(id: string) {
    return taskdata.find(v=>v.id===id)
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: string) {
   
   return  taskdata.filter(v=>v.id!==id)
  }
}
