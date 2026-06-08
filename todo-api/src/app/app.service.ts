import { Injectable } from '@nestjs/common';
import { newTask } from '@org/models';
@Injectable({
})
export class AppService {
  getData(): newTask[] {
    return [
     
    ];
  }
 
}
