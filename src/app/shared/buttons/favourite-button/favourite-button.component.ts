import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../../../core/models';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Output() toggle = new EventEmitter();

  isSubmitting = false;
  constructor() { }

  toggleFavourite() {

  }

  ngOnInit() {
  }

}
