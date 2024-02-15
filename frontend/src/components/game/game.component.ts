import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IQuestion } from '../../models/question.interface';
import { GameService } from '../../services/game.service';
import { QuestionComponent } from "../question/question.component";

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, QuestionComponent]
})
export class GameComponent {
  private gameService = inject(GameService);

  remainingTime = this.gameService.remainingTime;
  timeout = this.gameService.timeout;
  isCounting = this.gameService.isTimerCounting;

  dummyQuestion: IQuestion = {
    description: 'asdasda',
    options: ['a', 'b'],
    answer: 'a',
  };

  rightAnswer() {
    console.log('right');
  }

  wrongAnswer() {
    console.log('wrong');
  }

  start() {
    this.gameService.startTimer();
  }

  restart() {
    this.gameService.restartTimer();
  }
}
