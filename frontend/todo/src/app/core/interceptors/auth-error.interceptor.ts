import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && err.error?.message === 'Token expired') {
        console.warn('⚠️ Token expired — logging out');
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }

      return throwError(() => err);
    }),
  );
};
