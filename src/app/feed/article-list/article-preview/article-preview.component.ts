import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../core/models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article: Article;
  constructor(private router: Router, private route: ActivatedRoute) { }

  toArticlePage(slug) {
    this.router.navigate(['article', slug]);
  }

  ngOnInit() {
  }

}
