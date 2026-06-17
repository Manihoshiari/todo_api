import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';
import { tokensEntity } from './tokens.entitiy';

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
}
