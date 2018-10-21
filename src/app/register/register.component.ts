import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {JwtService} from '../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  signUpClicked: boolean;
  constructor(private formBuilder: FormBuilder, private _register: RegisterService, private _jwt: JwtService,
              private route: Router, private router: ActivatedRoute, private _user: UserService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
      }
    );
    this.signUpClicked = false;
  }
  signUpTapped() {
    if (this.registerForm.valid) {
      const userDetails = {
        user: this.registerForm.value
      };
      this._register.signUpUser(userDetails)
        .subscribe(
          res => {
            this._jwt.saveToken(res.user.token);
            this.route.navigate([''], {relativeTo: this.router});
            this._user.setCurrentUser();
          },
          err => {
            this._user.logoutUser();
          }
        );
    }
    this.signUpClicked = true;
  }

  ngOnInit() {
  }

}
