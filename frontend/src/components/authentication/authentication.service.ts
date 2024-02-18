import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, catchError, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticatedUser() {
    return localStorage.getItem('username');
  }

  login(username: string, password: string, onSuccess: (data: any) => void) {
    this.http
      .post(
        'http://localhost:3000/login',
        { username, password },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          observe: 'response',
        }
      )
      .pipe(
        first(),
        tap((data) => {
          console.log({ data });
          const { username } = data.body as { username: string };
          if (username) {
            localStorage.setItem('username', username);
          }
        }),
        catchError((error) => EMPTY)
      )
      .subscribe((data) => onSuccess(data));
  }

  signup(username: string, password: string, onSuccess: (data: any) => void) {
    return this.http
      .post(
        'http://localhost:3000/signup',
        { username, password },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          observe: 'response',
        }
      )
      .pipe(
        first(),
        tap((data) => {
          const { username } = data.body as { username: string };
          if (username) {
            localStorage.setItem('username', username);
          }
        }),
        catchError((error) => EMPTY)
      )
      .subscribe((data) => onSuccess(data));
  }

  signout() {
    localStorage.removeItem('username');
  }
}
