import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';
import {HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  limit = 10;
  constructor(private _api: ApiService ) {}

  getGlobalFeedDefault() {
    return this._api.get('/articles');
  }

  getUserFeed() {

  }

    getCustomGlobalFeed(offset: number) {
    const httpParams = new HttpParams({'limit': this.limit , 'offset': offset} as HttpParamsOptions);
    return this._api.get('/articles', httpParams);
  }

  getGlobalFeedByTag(tag: string, offset: number) {
    const httpParams = new HttpParams({'limit': this.limit , 'offset': offset, 'tag': tag} as HttpParamsOptions);
    return this._api.get('/articles', httpParams);
  }


}
