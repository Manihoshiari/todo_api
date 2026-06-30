import { IsString } from "class-validator";

export class dtoimage{
    @IsString({message:'img must be string'})
    img!:string 
}