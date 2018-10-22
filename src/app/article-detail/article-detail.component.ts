import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Article, Comment, User} from '../core/models';
import {ArticleService} from './article.service';
import {JwtService} from '../core/services';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  slug: string;
  article: Article;
  isUserLoggedIn: boolean;
  currentUser: User;
  defaultText = '';
  allComments: Array<Comment>;

  constructor(private route: ActivatedRoute, private _article: ArticleService, private _jwt: JwtService,
              private _user: UserService, private router: Router) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug');
    });
  }

  ngOnInit() {
    this.getArticle();
    this.getAllComments();
    this.isUserLoggedIn = !!this._jwt.getToken();
    this._user.userData
      .subscribe((data) => {
        this.currentUser = data;
      });
  }

  getArticle() {
    this._article.getArticle(this.slug)
      .subscribe(data => {
        this.article = data.article;
      });
  }

  getAllComments() {
    this._article.getCommentsForArticle(this.slug)
      .subscribe(data => {
        this.allComments = data.comments;
      });
  }

  deleteArticle() {
    this._article.deleteArticle(this.slug)
      .subscribe(data => {
        this.router.navigate([''], {relativeTo: this.route});
      });
  }

  postComment(comment: string) {
    this._article.postCommentForArticle(comment, this.slug)
      .subscribe( data => {
        this.allComments.unshift(data.comment);
        this.defaultText = '';
      });
  }

  favouriteToggled(favorited: boolean) {
    this.article.favorited = favorited;
    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  deleteComment(id: number) {
    this._article.deleteComment(id, this.slug)
      .subscribe(data => {
        this.getAllComments();
      });
  }

  editClicked() {
    this.router.navigate(['editor', this.slug]);
  }

  deleteClicked() {
    this._article.deleteArticle(this.slug).subscribe( data => {
      this.router.navigate(['']);
    });
  }

}
