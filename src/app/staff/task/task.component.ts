import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
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

  ngOnInit() {
    // Set initial checkbox state on component initialization
    this.loadCheckboxStates();
    // Reset checkbox states at midnight
    this.resetCheckboxStatesAtMidnight();
  }

  updateTime(event: any, variableName: string) {
    if (event.target.checked) {
      const currentTime = new Date().toLocaleTimeString();
      this[variableName] = currentTime;
      // Save checkbox state in localStorage
      localStorage.setItem(variableName, currentTime);
    } else {
      this[variableName] = '';
      // Remove checkbox state from localStorage
      localStorage.removeItem(variableName);
    }
  }

  loadCheckboxStates() {
    // Load checkbox states from localStorage
    for (let i = 1; i <= 10; i++) {
      const variableName = 'time' + i;
      const savedTime = localStorage.getItem(variableName);
      if (savedTime) {
        this[variableName] = savedTime;
      }
    }
  }

  resetCheckboxStatesAtMidnight() {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const millisecondsToMidnight = tomorrow.getTime() - now.getTime();

    setTimeout(() => {
       for (let i = 1; i <= 10; i++) {
        const variableName = 'time' + i;
        this[variableName] = '';
        localStorage.removeItem(variableName);
      }
      this.resetCheckboxStatesAtMidnight();
    }, millisecondsToMidnight);
  }
}
