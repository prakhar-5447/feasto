import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error) => {

      if (error.status === 401) {
        console.error('Unauthorized request');
      }

      if (error.status === 500) {
        console.error('Server error occurred');
      }

      return throwError(() => error);
    })
  );
};