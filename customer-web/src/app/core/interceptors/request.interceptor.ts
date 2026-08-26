import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const requestId =
    typeof window === 'undefined'
      ? (globalThis as any)?.REQUEST_ID
      ?? crypto.randomUUID()
      : crypto.randomUUID();

  const cloned = req.clone({
    setHeaders: {
      'x-request-id': requestId
    }
  });

  return next(cloned);
};