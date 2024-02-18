import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { GameService } from './game.service';
import { QuestionComponent } from '../question/question.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from './questions.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HistoryComponent } from '../history/history.component';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    QuestionComponent,
    HistoryComponent,
    MatIconModule,
    MatButtonModule,
  ],
})
export class GameComponent {
  private gameService = inject(GameService);
  private questionsService = inject(QuestionsService);
  private authenticationService = inject(AuthenticationService);

  remainingTime = this.gameService.remainingTime;
  timeout = this.gameService.timeout;
  isCounting = this.gameService.isTimerCounting;
  score = signal(0);
  questionsIterator = signal(0);
  questions = toSignal(this.questionsService.questions$);
  isLoading = computed(() => !this.questions());

  constructor() {
    effect(() => {
      if (this.timeout()) {
        this.saveGame();
      }
    });
  }

  rightAnswer() {
    const score = this.score();
    this.score.set(score + 50);
    this.nextQuestion();
  }

  nextQuestion() {
    const i = this.questionsIterator();

    if (i + 1 < this.questions()!.length) {
      this.questionsIterator.set(i + 1);
    } else {
      this.timeout.set(true);
    }
  }

  wrongAnswer() {
    const score = this.score();
    this.score.set(score - 20);
    this.nextQuestion();
  }

  start() {
    this.gameService.startTimer();
  }

  reset() {
    this.score.set(0);
    this.questionsIterator.set(0);
    this.gameService.resetTimer();
  }

  restart() {
    this.reset();
    this.gameService.restartTimer();
  }

  saveGame() {
    this.gameService.saveGame(
      this.authenticationService.authenticatedUser()!,
      this.score()
    );
  }

  back() {
    this.reset();
  }
}
