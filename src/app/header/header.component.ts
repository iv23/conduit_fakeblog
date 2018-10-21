import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtService} from '../core/services';
import {User} from '../core/models';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currUser: User;
  constructor(public _jwt: JwtService, private _user: UserService) {
  }

  ngOnInit() {
    this._user.userData.subscribe((userData) => {
      this.currUser = userData;
    });
  }

}
