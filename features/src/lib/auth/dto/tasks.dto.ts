import { IsNotEmpty, isNotEmpty, IsString } from 'class-validator';
export class tasksdto {
  @IsNotEmpty({ message: 'title cant be empty' })
  @IsString()
  title!: string;
  @IsNotEmpty({ message: 'describtion cant be empty' })
  @IsString()
  describtion!: string;
  @IsNotEmpty({ message: 'date cant be empty' })
  @IsString()
  date!: string;
  @IsNotEmpty({ message: 'assignees cant be empty' })
  @IsString()
  assignees!: string;
  @IsNotEmpty({ message: 'pririty cant be empty' })
  @IsString()
  pririty!: string;
  
}
