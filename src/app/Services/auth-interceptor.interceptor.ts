import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('userAuth') !== null) {
      const registerUserReq = request.clone({
        params: new HttpParams().set(
          'auth',
          <string>request.headers.get('userAuth')
        ),
      });
      return next.handle(registerUserReq);
    }

    return this.authService.loggedInUserObserver.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', <string>user.idToken),
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
