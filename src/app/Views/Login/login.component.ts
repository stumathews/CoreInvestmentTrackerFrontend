import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityUtilities, EntityTypes, GetRequiredNumberValidators, GetRequiredTextValidators,
   GetPasswordValidators  } from '../../Utilities';

import { ApiService } from '../../apiservice.service';
import { LoginDetails } from '../../Models/LoginDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  logindetails: LoginDetails = <LoginDetails> {username: '', password: ''};
  constructor(apiService: ApiService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(this.logindetails.username, GetRequiredTextValidators()),
      password: new FormControl(this.logindetails.password, GetPasswordValidators()),
    });
  }

  onSubmit(form: LoginDetails) {
    this.logindetails = form;
    console.log(`ok logging in... username=${this.logindetails.username} password= ${this.logindetails.password}`);
  }

}
