import {
  IsNotEmpty,
  IsString,

} from 'class-validator';

export class logindto {
  @IsNotEmpty({ message: 'username cant be empty' })
  name!: string;
  @IsNotEmpty()
  @IsString()
  password!: string;
}
