import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  route: string;
  constructor(private apiService: ApiService) {
    this.route = '/users/login';
  }
  logInUser(user) {
    return this.apiService.post(this.route, user);
  }
}
