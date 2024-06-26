import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

export function jwtInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const userService = inject(UserService)

  if (userService.isLoggedIn()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.loggedInUser()?.token}`
      }
    });
  }
  return next(req);
}
