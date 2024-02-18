import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  action = signal<'login' | 'signup' | undefined>(undefined);

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  setAction(action: 'login' | 'signup') {
    this.action.set(action);
  }

  login() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if (username && password) {
      this.authenticationService.login(username, password, () => {
        this.router.navigate(['/play']);
      });
    }
  }

  signup() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (username && password) {
      this.authenticationService.signup(username, password, () => {
        this.router.navigate(['/play']);
      });
    }
  }

  cancel() {
    this.form.setValue({
      username: '',
      password: '',
    });
    this.action.set(undefined);
  }
}
