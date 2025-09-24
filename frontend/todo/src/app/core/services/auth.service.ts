import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.apiUrl}/api/auth`;
  private _isLoggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token'),
  );
  isLoggedIn$ = this._isLoggedIn.asObservable();
  set isLoggedIn(v: boolean) {
    this._isLoggedIn.next(v);
  }
  get isLoggedIn() {
    return this._isLoggedIn.getValue();
  }

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseURL}/register`;
    return this.http.post(url, { username, email, password });
  }

  login(username: string, password: string): Observable<{ token: string }> {
    const url = `${this.baseURL}/login`;

    return this.http.post<{ token: string }>(url, { username, password }).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.isLoggedIn = true;
        },
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  get token() {
    return localStorage.getItem('token');
  }
}
