import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {
  @Input() username: string;
  @Output() toggle = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

}
