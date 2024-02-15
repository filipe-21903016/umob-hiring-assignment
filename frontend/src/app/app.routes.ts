import { Routes } from '@angular/router';
import { GameComponent } from '../components/game/game.component';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from '../components/authentication/authentication.component';

export const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  { path: 'play', component: GameComponent },
  { path: 'history', component: AppComponent },
];
