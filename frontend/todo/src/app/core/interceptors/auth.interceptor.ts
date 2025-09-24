import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;
  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  const retryCount = Number(req.headers.get('x-refresh-count') || '0');

  return next(authReq).pipe(
    catchError((err) => {
      if (
        err.status === 401 &&
        !req.headers.has('x-refresh-attempt') &&
        retryCount < 3
      ) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            authService.token = newToken;
            const retryReq = req.clone({
              headers: req.headers
                .set('Authorization', `Bearer ${newToken}`)
                .set('x-refresh-attempt', 'true'),
            });
            return next(retryReq);
          }),
          catchError((innerErr) => {
            authService.logout();
            return throwError(() => innerErr);
          }),
        );
      }

      return throwError(() => err);
    }),
  );
};
