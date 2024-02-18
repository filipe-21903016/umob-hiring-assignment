import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { GameService } from '../game/game.service';
import { EMPTY } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
  private authenticationService = inject(AuthenticationService);
  private gameService = inject(GameService);
  authenticatedUser = this.authenticationService.authenticatedUser;

  displayedColumns: string[] = ['username', 'score', 'createdAt'];
  history$ = this.authenticatedUser()
    ? this.gameService.history(this.authenticatedUser() as string)
    : EMPTY;
}
