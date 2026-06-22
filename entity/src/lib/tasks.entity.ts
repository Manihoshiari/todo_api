import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestUser } from './test.entity';

@Entity()
export class tasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ nullable: false })
  taskname!: string;
  @Column({ nullable: false })
  describion!: string;
  @Column({ nullable: false })
  date!: string;
  @Column({ nullable: false })
  assignees!: string;
  @Column({ nullable: false })
  pririty!: string;
  @Column({ nullable: true })
  flag: boolean = false;
  @Column({ nullable: false })
  taskstats: string = 'In Progress';

}
