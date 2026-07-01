import { Injectable } from '@nestjs/common';
import { newTask, user } from '@org/models';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from 'entity/src/lib/tasks.entity';
import { Raw, Repository } from 'typeorm';
import { Request } from 'express';
import { TestUser } from 'entity/src/lib/test.entity';
import { use } from 'passport';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(tasksEntity)
    private tasksRepository: Repository<tasksEntity>,
    @InjectRepository(TestUser)
    private userRepository: Repository<TestUser>,
  ) {}
  async findAll(req: Request): Promise<newTask[]> {
    return await this.tasksRepository.find({
      where: { user: req.user },
      order: {
        id: 'DESC',
      },
    });
  }
  async create(createTodoDto: newTask, req: Request) {
    const task = this.tasksRepository.create({
      ...createTodoDto,
      user: req.user,
    });
    await this.tasksRepository.save(task);
    return await this.findAll(req);
  }

  findOne(id: string) {
    return this.tasksRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updateTodoDto: newTask, req: Request) {
    await this.tasksRepository.update(id, updateTodoDto);
    return await this.findAll(req);
  }

  async remove(id: string, req: Request) {
    await this.tasksRepository.delete(id);
    return await this.findAll(req);
  }
  async filteredtask(searchtext: string,req:Request) {
     const user=req.user as user
    const word = searchtext.toString().trim();
    return await this.tasksRepository.find({
      where: {
        user:{id:user.id},
        taskname: Raw((alias) => `${alias} ILIKE :value`, {
          value: `%${word}%`,
        }),
      },
      order: { id: 'ASC' },
    });
   
  }
  async changeimg(req: Request, img: string) {
    const user=req.user as user
    return await this.userRepository.update({ id:user.id }, { profile: img });
  }
  async getimg(req:Request){
    const user=req.user as user
   const restult:TestUser|null=await this.userRepository.findOne({where:{id:user.id}})
   return restult
  }
}
