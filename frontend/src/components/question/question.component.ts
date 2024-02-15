import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { IQuestion } from '../../models/question.interface';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  question = input<IQuestion>();
  @Output() onAnswerSubmitted = new EventEmitter<string>();
  @Output() onRightAnswer = new EventEmitter();
  @Output() onWrongAnswer = new EventEmitter();
  protected selectedAnswer?: string = undefined;

  submit() {
    if (!this.selectedAnswer) return;

    this.onAnswerSubmitted.emit(this.selectedAnswer);

    if (this.selectedAnswer === this.question()?.answer) {
      this.onRightAnswer.emit();
    } else {
      this.onWrongAnswer.emit();
    }
  }
}
