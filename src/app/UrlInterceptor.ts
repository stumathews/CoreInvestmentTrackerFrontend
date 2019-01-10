import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './AuthService';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('intercept!');
    const auth = this.injector.get(AuthService);
    const notificationService = this.injector.get(NotificationService);
    const router = this.injector.get(Router);
    const token = auth.getAccessToken();

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }
    if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      }

      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
      // return next.handle(req);
      return next.handle(req).pipe(catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          // location.reload(true);
      }
      if (err.status !== 200 || err.status !== 201) {
        router.navigate(['/error'], { queryParams: {error: err.message} });
      }
      const error = err.error.message || err.statusText;
      return _throw(error);
   }));

}}
