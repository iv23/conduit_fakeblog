import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';
import {Observable} from 'rxjs';
import {User} from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private route: string;
  constructor(private apiService: ApiService) {
    this.route = '/users';
  }

  signUpUser(user): Observable<User> {
    return this.apiService.post(this.route, user);
  }
}
