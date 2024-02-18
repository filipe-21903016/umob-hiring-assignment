import { CanActivateFn, Routes } from '@angular/router';
import { GameComponent } from '../components/game/game.component';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from '../components/authentication/authentication.component';
import { authGuard } from '../guards/auth.guard';
import { HistoryComponent } from '../components/history/history.component';

export const routes: Routes = [
  { path: 'play', component: GameComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthenticationComponent },
  { path: '', redirectTo: '/play', pathMatch: 'full' },
];
