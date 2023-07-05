import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service'; 

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set('Authorization', this.auth.token),
    });
    return next.handle(request);
  }
}
