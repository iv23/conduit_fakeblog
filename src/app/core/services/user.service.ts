import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models';

@Injectable()
export class UserService {
  private userDataSubject: BehaviorSubject<User>;
  public userData: Observable<User>;
  constructor(){

  }
  logoutUser(){

  }

}
