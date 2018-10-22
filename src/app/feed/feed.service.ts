import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';
import {HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

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
    return this._api.get('/articles/feed');

  }

  getCustomGlobalFeed(offset: number) {
    const httpParams = new HttpParams({'limit': this.limit , 'offset': offset} as HttpParamsOptions);
    return this._api.get('/articles', httpParams);
  }

  getGlobalFeedByTag(tag: string) {
    return this._api.get('/articles/?tag=' + tag);
  }

  getMyFeedByAuthor(author: string) {
    return this._api.get('/articles/?author=' + author);
  }

  getFavoritedFeed(username: string) {
    return this._api.get('/articles/?favorited=' + username);
  }

}
