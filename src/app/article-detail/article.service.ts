import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';
import {Article} from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _api: ApiService) { }

  favoriteArticle(slug: string) {
    return this._api.post('/articles/' + slug + '/favorite');
  }
  unFavoriteArticle(slug: string) {
    return this._api.delete('/articles/' + slug + '/favorite');
  }
  getArticle(slug: string) {
    return this._api.get('/articles/' + slug);
  }

  deleteArticle(slug: string) {
    return this._api.delete('/articles/' + slug);
  }

  deleteComment(id: number, slug: string) {
    return this._api.delete('/articles/' + slug + '/comments/' + id);
  }

  getCommentsForArticle(slug: string) {
    return this._api.get('/articles/' + slug + '/comments');
  }

  postCommentForArticle(comment: string, slug: string) {
    const body = {
      comment: {
        body: comment
      }
    };
    return this._api.post('/articles/' + slug + '/comments', body);
  }

  createArticle(article) {
    return this._api.post('/articles', article);
  }

  updateArticle(slug: string, article) {
    return this._api.put('/articles/' + slug , article);
  }

}
