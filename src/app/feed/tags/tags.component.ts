import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '../../core/services';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Output() tagValueChange = new EventEmitter<string>();
  tags: [string];
  constructor(private _api: ApiService) {
    this._api.get('/tags')
      .subscribe(data => {
        this.tags = data.tags;
      });
  }

  tagValueChanged(tag: string) {
    this.tagValueChange.emit(tag);
  }

  ngOnInit() {
  }

}
