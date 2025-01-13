import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../domain/User";

export function jwtInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // const userService = inject(UserService) // leads to circular dependency; fix me
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem('loggedInUser')) as User

  if (localStorage.getItem('loggedInUser') !== null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }
  return next(req);
}
