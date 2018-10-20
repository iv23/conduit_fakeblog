import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {JwtService} from './core/services';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(request, next) {
    const jwtService = this.injector.get(JwtService);
    const tokenizeRequest = request.clone({
      setHeaders: {
        Authorization: `Token ${jwtService.getToken()}`
      }
    });
    return next.handle(tokenizeRequest);
  }
}
