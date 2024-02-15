import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Game Timer
  private time = 5; //seconds
  private timer: any;
  private interval = 1000; // ms

  remainingTime = signal(this.time);
  isTimerCounting = signal(false);
  timeout = signal(false);

  constructor() {}

  startTimer() {
    if (this.isTimerCounting()) return;

    this.timeout.set(false);
    this.isTimerCounting.set(true);

    this.timer = setInterval(() => {
      if (this.remainingTime() > 0) {
        this.remainingTime.set(this.remainingTime() - 1);
      } else {
        this.stopTimer();
        this.isTimerCounting.set(false);
        this.timeout.set(true);
      }
    }, this.interval);
  }

  resetTimer() {
    this.stopTimer()
    this.remainingTime.set(this.time);
    this.isTimerCounting.set(false);
    this.timeout.set(false);
  }

  restartTimer() {
    this.resetTimer();
    this.startTimer();
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
