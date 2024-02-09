import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/user/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(httpRequest.url.includes(this._authenticationService.host + "/auth/login")) {
      return next.handle(httpRequest);
    }

    if(httpRequest.url.includes(this._authenticationService.host + "/auth/register")) {
      return next.handle(httpRequest);
    }

    this._authenticationService.loadToken();
    const token = this._authenticationService.getToken();
    const requestWithHeader =  httpRequest.clone({setHeaders: { Authorization: "Bearer " + token}});
    return next.handle(requestWithHeader);
  }
}
