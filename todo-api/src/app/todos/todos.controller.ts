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
  Req,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'features/src/lib/auth/jwt.gaurd';
import { newTask } from '@org/models';
import { log } from 'console';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTodoDto: newTask) {
    return await this.todosService.create(createTodoDto);
  }
  private readonly loger = new Logger(TodosController.name);
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('search') searchtext: string): Promise<newTask[]> {
    if (searchtext) {
      return await this.todosService.filteredtask(searchtext);
    } else {
      return await this.todosService.findAll();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateTodoDto: newTask) {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const updatedlist = await this.todosService.remove(id);
    return updatedlist;
  }
}
