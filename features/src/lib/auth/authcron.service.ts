import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tokensEntity } from "entity/src/lib/tokens.entitiy";
import { LessThan, Repository } from "typeorm";
import { Cron, CronExpression } from '@nestjs/schedule'; // 
@Injectable()
export class authcornService{
    constructor(
        @InjectRepository(tokensEntity)
        private tokenrepository:Repository<tokensEntity>
    ){}
    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async cleanexpiretoken(){
        const now=new Date()
        await this.tokenrepository.delete({
            expire:LessThan(now)
        })
    }
}