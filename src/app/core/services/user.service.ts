import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {User} from '../models';
import {distinctUntilChanged} from 'rxjs/operators';
import {JwtService} from './jwt.service';
import {ApiService} from './api.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class UserService {
  private userDataSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  public userData: Observable<User> = this.userDataSubject.asObservable().pipe(distinctUntilChanged());
  constructor(private _jwt: JwtService, private _api: ApiService) {
  }
  setCurrentUser() {
    if (this._jwt.getToken()) {
      this._api.get('/user')
        .subscribe(res => {
          this.loginUser(res.user);
        },
          error1 => {
            this.logoutUser();
          });
    } else {
      this.logoutUser();
    }
  }

  getCurrentUser(): User {
    return this.userDataSubject.value;
  }

  loginUser(user: User) {
    this._jwt.saveToken(user.token);
    this.userDataSubject.next(user);
  }

  logoutUser() {
    this._jwt.deleteToken();
    this.userDataSubject.next({} as User);
  }

}
