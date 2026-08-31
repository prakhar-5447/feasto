import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        console.error(
          'Unauthorized request:',
          req.url
        );
      }

      if (error.status === 403) {
        console.error(
          'Forbidden request:',
          req.url
        );
      }

      if (error.status === 500) {
        console.error(
          'Server error occurred:',
          req.url
        );
      }

      return throwError(() => error);
    })
  );
};