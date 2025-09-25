// auth.service.mock.ts
import { BehaviorSubject, of } from 'rxjs';

export const mockAccessToken = 'mocked-access-token';
export const mockRegisterResponse = { message: 'User registered successfully' };

export class MockAuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  set isLoggedIn(v: boolean) {
    this._isLoggedIn.next(v);
  }

  get isLoggedIn() {
    return this._isLoggedIn.getValue();
  }

  token: string | null = mockAccessToken;

  register(_username: string, _email: string, _password: string) {
    return of(mockRegisterResponse);
  }

  login(_username: string, _password: string) {
    this.isLoggedIn = true;
    this.token = mockAccessToken;
    return of({ accessToken: mockAccessToken });
  }

  logout() {
    this.isLoggedIn = false;
    this.token = null;
    return of({ success: true });
  }

  refreshToken() {
    this.token = mockAccessToken;
    return of(mockAccessToken);
  }
}
