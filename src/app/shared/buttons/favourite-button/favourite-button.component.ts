import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../../../core/models';
import {JwtService} from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../../article-detail/article.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();

  isToggling = false;
  constructor(private _jwt: JwtService, private router: Router, private route: ActivatedRoute,
              private _article: ArticleService) { }

  toggleFavourite() {
    this.isToggling = true;
    if (!this._jwt.getToken()) {
      this.router.navigate(['/login'], {relativeTo: this.route});
    }
    if (!this.article.favorited) {
      this._article.favoriteArticle(this.article.slug)
        .subscribe( data => {
          this.isToggling = false;
          this.toggle.emit(true);
      });
    } else {
      this._article.unFavoriteArticle(this.article.slug)
        .subscribe(data => {
          this.isToggling = false;
          this.toggle.emit(false);
        });
    }
  }

  ngOnInit() {
  }

}
