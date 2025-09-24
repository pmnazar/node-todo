import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseURL = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    const url = `${this._baseURL}/me`;
    return this.http.get<User>(url);
  }
}
