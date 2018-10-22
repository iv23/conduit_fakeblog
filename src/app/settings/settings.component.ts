import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../core/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../core/models';
import {JwtService} from '../core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currUser: User;
  constructor(private router: Router, private _user: UserService, private formBuilder: FormBuilder, private _jwt: JwtService) {
    this.settingsForm = this.formBuilder.group({
      email: '',
      password: '',
      image: '',
      bio: '',
      username: ''
    });
    this._user.userData.subscribe(data => {
      this.currUser = data;
      console.log(data);
      this.settingsForm.setValue({
        email: data.email,
        image: data.image,
        bio: data.bio,
        username: data.username,
        password: ''
      });
    });
  }

  ngOnInit() {
  }

  updateSettingsTapped() {
    console.log(this.settingsForm.value);
    this._user.updateCurrentUser(this.settingsForm.value).subscribe(res => {
      this._jwt.saveToken(res.user.token);
      this.router.navigate(['']);
      this._user.setCurrentUser();
    });
  }

  logoutClicked() {
    this._user.logoutUser();
    this.router.navigate(['']);
  }

}
