import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TestUser } from "./test.entity";

@Entity()
export class tokensEntity{
    @PrimaryGeneratedColumn('uuid')
    id!:string
    @Column()
    acssesToken!:string
    @Column()
    refreshToken!:string
    @ManyToOne(()=>TestUser,user=>user.tokens,{
        onDelete:'CASCADE'
    })
    
    @JoinColumn({name:'user_Id'})
    user!:TestUser
}