import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './AuthService';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('intercept!');
    const auth = this.injector.get(AuthService);
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
      const error = err.error.message || err.statusText;
      return _throw(error);
   }));

}}
