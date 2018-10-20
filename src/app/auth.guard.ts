import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {JwtService} from './core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _jwt: JwtService, private _router: Router) {

  }
  canActivate(): boolean {
    if (!!this._jwt.getToken()){
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
