import {Component, Input, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {FeedService} from './feed.service';
import {Article} from '../core/models';
import {JwtService} from '../core/services';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  isLoggedIn: boolean;
  @Input() parent: string;
  currUser: Object;
  isTagTabActive = false;
  activeTagName: string;
  globalFeedPagesCount: number;
  userFeedPagesCount: number;
  tagFeedPagesCount: number;
  globalFeedPages: Array<number> = [];
  tagFeedPages: Array<number> = [];
  userFeedPages: Array<number> = [];
  feedArticles: Object;
  userFeedArticles: Object;
  tagFeedArticles: Object;

  constructor(private _feed: FeedService, private _jwt: JwtService, private _user: UserService) {
    if (_jwt.getToken()) {
      this.isLoggedIn = true;
      this.currUser = _user.getCurrentUser();
    } else {
      this.isLoggedIn = false;
      this.currUser = {};
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    this.globalFeedPages = [];
    if ('Global Feed' === event.tab.textLabel) {
      this._feed.getGlobalFeedDefault().subscribe(data => {
        this.globalFeedPagesCount = data.articlesCount / 10;
        console.log(this.globalFeedPagesCount);
      });
      for (let i = 0; i < this.globalFeedPagesCount; i++) {
        this.globalFeedPages.push(i + 1);
      }
    } else if (event.tab.textLabel === 'Your feed') {
      this.isLoggedIn = false;
      this.isTagTabActive = false;
    } else {
    }
  }

  globalFeedPageNumberClicked(pageNumber: number) {
    const offset = (pageNumber - 1) * 10;
    this._feed.getCustomGlobalFeed(offset)
      .subscribe(data => {
        this.feedArticles = data.articles;
      });
  }

  abc(event: AnimationEvent) {
    this._feed.getCustomGlobalFeed(10)
      .subscribe(data => {
        this.feedArticles = data.articles;
      });
    console.log('in abc');
    console.log(event);
  }

  onTagChanged(tag: string) {
    this.activeTagName = tag;
    this.isTagTabActive = true;
    this._feed.getGlobalFeedByTag(tag, 0)
      .subscribe(data => {
        this.tagFeedArticles = data.articles;
      });
  }

  ngOnInit() {
  }

}
