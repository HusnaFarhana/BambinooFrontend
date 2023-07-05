import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  time1: string = '';
  time2: string = '';
  time3: string = '';
  time4: string = '';
  time5: string = '';
  time6: string = '';
  time7: string = '';
  time8: string = '';
  time9: string = '';
  time10: string = '';
  updateTime(event: any,variableName:string) {
    if (event.target.checked) {
      const currentTime = new Date().toLocaleTimeString();
      this[variableName] = currentTime;
    } else {
      this[variableName] = '';
    }
  }
}
