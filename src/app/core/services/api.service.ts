import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {JwtService} from './jwt.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable()
export class ApiService {

  apiURL: string;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {
    this.apiURL = environment.apiURL;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiURL}${path}`, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.apiURL}${path}`,
      JSON.stringify(body));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.apiURL}${path}`,
      JSON.stringify(body));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.apiURL}${path}`);
  }

}
