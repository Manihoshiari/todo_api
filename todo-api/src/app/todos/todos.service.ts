import { Injectable, Logger } from '@nestjs/common';
import { newTask } from '@org/models';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from 'entity/src/lib/tasks.entity';
import { Like, Raw, Repository } from 'typeorm';
import { SrvRecord } from 'dns';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(tasksEntity)
    private tasksRepository: Repository<tasksEntity>,
  ) {}
  async findAll(): Promise<newTask[]> {
    return await this.tasksRepository.find({

      order: {
        id: 'DESC',
      },
    });
  }
  async create(createTodoDto: newTask) {
    const task = this.tasksRepository.create(createTodoDto);
    await this.tasksRepository.save(task);
    return await this.findAll();
  }

  findOne(id: string) {
    return this.tasksRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updateTodoDto: newTask) {
    await this.tasksRepository.update(id, updateTodoDto);
    return await this.findAll();
  }

  async remove(id: string) {
    await this.tasksRepository.delete(id);
    return await this.findAll();
  }
  async filteredtask(searchtext: string) {
    const word =  searchtext.toString().trim() ;
    return await this.tasksRepository.find({
      where: {
        taskname: Raw((alias) => `${alias} ILIKE :value`, {
          value: `%${word}%`,
        }),
      },
      order: { id: 'ASC' },
    });
  }
}
