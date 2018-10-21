import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {JwtService} from './core/services';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request, next) {
    const jwtService = this.injector.get(JwtService);
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const token = jwtService.getToken();
    if ( token ) {
      headers['Authorization'] = `Token ${token}`;
    }
    const req = request.clone({setHeaders: headers});
    return next.handle(req);
  }
}
