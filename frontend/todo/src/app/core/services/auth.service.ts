import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.apiUrl}/api/auth`;
  private _isLoggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('accessToken'),
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

  login(
    username: string,
    password: string,
  ): Observable<{ accessToken: string }> {
    const url = `${this.baseURL}/login`;

    return this.http
      .post<{ accessToken: string }>(url, { username, password })
      .pipe(
        tap({
          next: (res) => {
            localStorage.setItem('accessToken', res.accessToken);
            this.isLoggedIn = true;
          },
        }),
      );
  }

  logout() {
    const url = `${this.baseURL}/logout`;
    this.http.post(url, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Logged out successfully');
        localStorage.removeItem('accessToken');
        this.isLoggedIn = false;
      },
      error: (e) => console.error(e),
    });
  }

  set token(v: string | null) {
    if (v) localStorage.setItem('token', v);
  }

  get token() {
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<string> {
    const url = `${this.baseURL}/refresh`;
    return this.http
      .post<{ accessToken: string }>(url, {}, { withCredentials: true })
      .pipe(
        tap((res) => (this.token = res.accessToken)),
        tap(() => console.log('Access token refreshed')),
        map((res) => res.accessToken),
      );
  }
}
