import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/user/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService, private router: Router) {}

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(httpRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert("Por favor inicia sessión nuevamente :)");
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
