import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent {
  action = signal<'login' | 'signup' | undefined>(undefined);

  email = new FormControl('');
  password = new FormControl('');

  setAction(action: 'login' | 'signup') {
    this.action.set(action);
  }

  submit() {
    //TODO: Validate fields
    if (this.action() === 'login') {
      this.login();
    } else {
      this.login();
    }
  }

  login() {
    console.log('login', {
      email: this.email.value,
      password: this.password.value,
    });
  }
  signup() {
    console.log('signup', {
      email: this.email.value,
      password: this.password.value,
    });
  }
}
