import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = '/api/auth';

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
        },
      }),
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
