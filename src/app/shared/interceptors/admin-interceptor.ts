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
    //console.log('intercetpt');
    //console.log('not req', req.url);
    //console.log('body', req.body.token);
    if (req.url.includes('new-password')) {
      console.log('password');
      const authReq = req.clone({
        setHeaders: {
          reset: req.body.token,
        },
      });
      console.log('authReq', authReq);
      return next.handle(authReq);
      console.log('después del return');
    }
    else if ( (req.url.includes('users') || req.url.includes('actions') )
     && !req.url.includes('actions/register') && !req.url.includes('forgot-password') 
     && !req.url.includes('/actions/confirm-user') && !req.url.includes('/actions/requestSmsCode')
     && !req.url.includes('/actions/validateSmsCode')) {
      console.log('intercept if');
      const userValue = this.authSvc.userValue;
      console.log('userValue = ',userValue);
      const authReq = req.clone({
        setHeaders: {
         // authorization: userValue.token,
          'Content-Type': 'application/json',
      'Authorization': `Bearer ${userValue.token}`,
        },
      });
      console.log('authReq in admin interceptor', authReq);
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
