import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Article} from '../core/models';
import {ArticleService} from '../article-detail/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  articleForm: FormGroup;
  slug: string;
  article: Article = {} as Article;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private _article: ArticleService,
              private router: Router) {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      body: ['', Validators.compose([Validators.required])],
      tagList: ['']
    });
    this.route.paramMap.subscribe((paramsMap: ParamMap) => {
      if (paramsMap.get('slug')) {
        this.slug = paramsMap.get('slug');
      }
    });
  }

  publishArticleTapped() {
    if (this.articleForm.valid) {
      if (this.slug != (undefined || null)) {
        const article = {
          article : {
            title: this.articleForm.value.title,
            description: this.articleForm.value.description,
            body: this.articleForm.value.body
          }
        };
        this._article.updateArticle(this.slug, article)
          .subscribe(data => {
            this.router.navigate(['article', data.article.slug]);
          });
      } else {
        const tags = this.articleForm.value.tagList;
        let tagsArray = [];
        if (tags != undefined) {
          tagsArray = tags.split(' ');
        }
        console.log(this.articleForm.value.title);
        const article = {
          article : {
            title: this.articleForm.value.title,
            description: this.articleForm.value.description,
            body: this.articleForm.value.body,
            tagList: tagsArray
          }
        };
        console.log(JSON.stringify(article));
        this._article.createArticle(article).subscribe(data => {
          this.router.navigate(['article', data.article.slug]);
        },
          error1 => {
          console.log(error1);
          });
      }
    }
  }
  ngOnInit() {
    if (this.slug != (undefined || null)) {
      this._article.getArticle(this.slug).subscribe( data => {
        this.article = data.article;
        this.articleForm.setValue({
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList.join(' ')
        });
      });
    }
  }
}
