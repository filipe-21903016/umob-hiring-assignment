import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private gameService = inject(GameService);

  title = 'frontend';
  remainingTime = this.gameService.remainingTime;
  timeout = this.gameService.timeout;
  isCounting = this.gameService.isTimerCounting;

  start() {
    this.gameService.startTimer();
  }

  restart() {
    this.gameService.restartTimer();
  }
}
