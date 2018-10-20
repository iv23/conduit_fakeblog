import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {JwtService} from '../core/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  signUpClicked: boolean;
  constructor(private formBuilder: FormBuilder, private _register: RegisterService, private _jwt: JwtService,
              private route: Router, private router: ActivatedRoute) {
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
            console.log(res.user.token);
          },
          err => console.log(err)
        );
    }
    this.signUpClicked = true;
  }

  ngOnInit() {
  }

}
