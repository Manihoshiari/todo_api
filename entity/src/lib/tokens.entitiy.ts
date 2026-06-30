import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TestUser } from "./test.entity";

@Entity()
export class tokensEntity{
    @PrimaryGeneratedColumn('uuid')
    id!:string
    @Column()
    acssesToken!:string
    @Column()
    refreshToken!:string
    @Column({type:'timestamp',nullable:true})
    expire!:Date
    @CreateDateColumn({type:'timestamp'})
    creat!:Date
    @ManyToOne(()=>TestUser,(user)=>user.tokens,{onDelete:'CASCADE'})
    user!:TestUser
}