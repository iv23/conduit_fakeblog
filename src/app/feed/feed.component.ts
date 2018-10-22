import {Component, Input, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {FeedService} from './feed.service';
import {Article} from '../core/models';
import {ApiService, JwtService} from '../core/services';
import {UserService} from '../core/services/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  isLoggedIn: boolean;
  parent: string;
  profileName: string;
  currUser: Object;
  isTagTabActive = false;
  activeTagName: string;
  feedArticles: Object;
  favoriteArticles: Object;
  myArticles: Object;
  userFeedArticles: Object;
  tagFeedArticles: Object;

  constructor(private _feed: FeedService, private _jwt: JwtService, private _user: UserService,
              private route: ActivatedRoute, private _api: ApiService) {
    if (_jwt.getToken()) {
      this.isLoggedIn = true;
      this.currUser = _user.getCurrentUser();
    } else {
      this.isLoggedIn = false;
      this.currUser = {};
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    if ('Global Feed' === event.tab.textLabel) {
      this.isTagTabActive = false;
    } else if (event.tab.textLabel === 'Your Feed') {
      this.isTagTabActive = false;
    }
  }

  homeAnimateEvent(event: AnimationEvent) {
    this._feed.getCustomGlobalFeed(10)
      .subscribe(data => {
        this.feedArticles = data.articles;
      });
    if (this.isLoggedIn) {
      this._feed.getUserFeed()
        .subscribe(data => {
          this.userFeedArticles = data.articles;
        });
    }
  }

  profileAnimateEvent(event: AnimationEvent) {
    this._feed.getMyFeedByAuthor(this.profileName)
      .subscribe(data => {
        this.myArticles = data.articles;
      });
    this._feed.getFavoritedFeed(this.profileName)
      .subscribe(data => {
        this.favoriteArticles = data.articles;
      });
  }

  onTagChanged(tag: string) {
    this.activeTagName = tag;
    this.isTagTabActive = true;
    this._feed.getGlobalFeedByTag(tag)
      .subscribe(data => {
        this.tagFeedArticles = data.articles;
      });
  }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.parent = data.parent;
    });
    if (this.parent === 'profile') {
      this.route.paramMap.subscribe((paramsMap: ParamMap) => {
        this.profileName = paramsMap.get('username');
      });
    }
  }


}
