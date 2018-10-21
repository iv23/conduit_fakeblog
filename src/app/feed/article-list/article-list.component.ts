import {Component, Input, OnInit} from '@angular/core';
import {Article, User} from '../../core/models';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input() articles: Array<Article>;
  constructor() { }

  ngOnInit() {
  }

}
