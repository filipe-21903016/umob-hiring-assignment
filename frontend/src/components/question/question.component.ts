import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { IQuestion } from '../../shared/models/question.interface';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class QuestionComponent {
  question = input<IQuestion>();
  @Output() onRightAnswer = new EventEmitter();
  @Output() onWrongAnswer = new EventEmitter();
  protected selectedAnswer?: string = undefined;

  submit() {
    if (!this.selectedAnswer) return;

    if (this.selectedAnswer === this.question()?.answer) {
      this.onRightAnswer.emit();
    } else {
      this.onWrongAnswer.emit();
    }
  }
}
