import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  flatten,
  Query,
  Logger,
} from '@nestjs/common';
import { TodosService } from './todos.service';

import { newTask } from '@org/models';
import { log } from 'console';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: newTask) {
    return await this.todosService.create(createTodoDto);
  }
  private readonly loger = new Logger(TodosController.name);
  @Get()
 async findAll(@Query('search') searchtext:string) : Promise<newTask[]> {
  if(searchtext){
    return await this.todosService.filteredtask(searchtext)
  }else{
    return await this.todosService.findAll();
  }
    
  }
 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: newTask) {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const updatedlist = await this.todosService.remove(id);
    return updatedlist;
  }
}
