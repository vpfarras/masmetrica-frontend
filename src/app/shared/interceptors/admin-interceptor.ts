import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Ignorar rutas que no requieren autenticación
    if (req.url.includes('/recoveryPassword') || req.url.includes('/actions/register') || req.url.includes('forgot-password') || req.url.includes('/actions/confirm-user') || req.url.includes('/actions/requestSmsCode') || req.url.includes('/actions/validateSmsCode')) {
      return next.handle(req);
    }

    if (req.url.includes('new-password')) {
      console.log('password');
      const authReq = req.clone({
        setHeaders: {
          reset: req.body.token,
        },
      });
      console.log('authReq', authReq);
      return next.handle(authReq);
    }

    if (req.url.includes('users') || req.url.includes('actions')) {
      console.log('intercept if');
      const userValue = this.authSvc.userValue;
      if (userValue) {
        console.log('userValue = ', userValue);
        // Condición para no modificar el Content-Type si es una subida de archivos
        const isFileUpload = req.body instanceof FormData;
        const headersConfig = {
          'Authorization': `Bearer ${userValue.token}`,
          // Solo agregamos el Content-Type si NO es una subida de archivos
          ...(isFileUpload ? {} : { 'Content-Type': 'application/json' })
        };
        
        const authReq = req.clone({
          setHeaders: headersConfig,
        });
        console.log('authReq in admin interceptor', authReq);
        return next.handle(authReq);
      } else {
        console.error('User is not authenticated');
        // Maneja el caso cuando el usuario no está autenticado
        return next.handle(req); // o redirigir, o lanzar un error, etc.
      }
    }

    return next.handle(req);
  }
}
