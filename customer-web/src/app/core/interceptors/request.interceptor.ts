import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  let requestId: string;

  // ✅ SSR environment
  if (typeof window === 'undefined') {
    requestId = (globalThis as any)?.REQUEST_ID || crypto.randomUUID();
  } else {
    // ✅ browser
    requestId = crypto.randomUUID();
  }

  const cloned = req.clone({
    setHeaders: {
      'x-request-id': requestId
    }
  });
  return next(cloned);
};