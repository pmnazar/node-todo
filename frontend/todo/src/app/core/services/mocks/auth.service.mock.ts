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

  register = jest.fn((_username: string, _email: string, _password: string) => {
    return of(mockRegisterResponse);
  });

  login = jest.fn((_username: string, _password: string) => {
    this.isLoggedIn = true;
    this.token = mockAccessToken;
    return of({ accessToken: mockAccessToken });
  });

  logout = jest.fn(() => {
    this.isLoggedIn = false;
    this.token = null;
    return of({ success: true });
  });

  refreshToken = jest.fn(() => {
    this.token = mockAccessToken;
    return of(mockAccessToken);
  });
}
