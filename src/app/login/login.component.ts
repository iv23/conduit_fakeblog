import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from './login.service';
import {JwtService} from '../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _login: LoginService, private _jwt: JwtService,
              private router: ActivatedRoute, private route: Router, private _user: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  signInTapped() {
    if (this.loginForm.valid) {
      const userCred = {
        user: this.loginForm.value
      };
      this._login.logInUser(userCred)
        .subscribe(
        res => {
          this._jwt.saveToken(res.user.token);
          this.route.navigate([''], {relativeTo: this.router});
          this._user.setCurrentUser();
        },
        err => console.log(err)
      );
    }
  }

  ngOnInit() {
  }

}
