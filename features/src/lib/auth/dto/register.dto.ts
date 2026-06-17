import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  minLength,
  MinLength,
} from 'class-validator';
export class registerdto {
  @IsEmail({}, { message: 'failed' })
  @IsNotEmpty({ message: 'email is required' })
  email!: string;
  @IsNotEmpty({ message: 'username is required' })
  @MinLength(6, { message: 'password should be more than 6 charecter' })
  password!: string;
  @IsNotEmpty({ message: 'username is required' })
  name!: string;
}
