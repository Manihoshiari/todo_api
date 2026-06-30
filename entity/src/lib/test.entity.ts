import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { tokensEntity } from './tokens.entitiy';
import { tasksEntity } from './tasks.entity';

@Entity()
export class TestUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
@Column({nullable:true})
refreshtoken!:string
  @Column({ nullable: false })
  name!: string;
  @Column({ nullable: false, unique: true })
  email!: string;
  @Column({ nullable: false, select: false })
  password!: string;
  @OneToMany(()=>tokensEntity,token=>token.user)
  tokens!:tokensEntity[]
  @Column({nullable:true})
  profile!:string
  @OneToMany(()=>tasksEntity,task=>task.user)
  task!:tasksEntity
}
