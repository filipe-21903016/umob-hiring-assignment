import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);

  // Game Timer
  private time = 60; //seconds
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
        clearInterval(this.timer);
        this.isTimerCounting.set(false);
        this.timeout.set(true);
      }
    }, this.interval);
  }

  resetTimer() {
    clearInterval(this.timer);

    // reset variables
    this.timer = null;
    this.remainingTime.set(this.time);
    this.isTimerCounting.set(false);
    this.timeout.set(false);
  }

  restartTimer() {
    this.resetTimer();
    this.startTimer();
  }

  history(username: string): Observable<History[]> {
    return this.http.get<History[]>(
      `http://localhost:3000/history?username=${username}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  saveGame(username: string, score: number, onSuccess?: (res: any) => void) {
    this.http
      .post(
        `http://localhost:3000/create`,
        { username, score },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        first(),
        tap((res) => console.log({ message: 'Saved game', data: res }))
      )
      .subscribe((res) => (onSuccess ? onSuccess(res) : () => {}));
  }
}
