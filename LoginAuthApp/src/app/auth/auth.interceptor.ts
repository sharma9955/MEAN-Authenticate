import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userservice: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth')) return next.handle(req.clone());
    else {
      const clonedreq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      });

      return next.handle(clonedreq).pipe(
        tap(
          (event) => {},
          (err) => {
            if ((err.err.auth = false)) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    }
  }
}
