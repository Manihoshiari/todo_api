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
import { newTask, user } from '@org/models';
import { log } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { dtoimage } from 'features/src/lib/auth/dto/profile.dto';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTodoDto: newTask, @Req() req: Request) {
    return await this.todosService.create(createTodoDto, req);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: Request): Promise<newTask[]> {
    return await this.todosService.findAll(req);
  }
  @Get('search')
  @UseGuards(JwtAuthGuard)
  async search(@Query('search') searchtext: string, @Req() req: Request) {
    if (searchtext && searchtext.trim() !== '') {
      const result = await this.todosService.filteredtask(searchtext, req);
      return result;
    } else {
      return await this.todosService.findAll(req);
    }
  }
  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async changeimg(@Req() req: Request, @Body() img: dtoimage) {
    return await this.todosService.changeimg(req, img.img);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getimg(@Req() req: Request) {
    return await this.todosService.getimg(req);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: newTask,
    @Req() req: Request,
  ) {
    return await this.todosService.update(id, updateTodoDto, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const updatedlist = await this.todosService.remove(id, req);
    return updatedlist;
  }
}
