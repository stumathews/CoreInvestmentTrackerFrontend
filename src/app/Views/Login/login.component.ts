import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityUtilities, EntityTypes, GetRequiredNumberValidators, GetRequiredTextValidators,
   GetPasswordValidators  } from '../../Utilities';

import { ApiService } from '../../apiservice.service';
import { UserLoginInfo } from '../../Models/UserLoginInfo';
import { AuthService } from '../../AuthService';
import { TokenResponse } from '../../Models/TokenResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  logindetails: UserLoginInfo = <UserLoginInfo> {Username: '', Password: ''};
  constructor(private apiService: ApiService,
    private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      Username: new FormControl(this.logindetails.Username, GetRequiredTextValidators()),
      Password: new FormControl(this.logindetails.Password, GetRequiredTextValidators()),
    });
  }

  onSubmit(form: UserLoginInfo) {
    this.logindetails = form;
    console.log(form);
    this.apiService.Login(form).subscribe( (response: TokenResponse) => {
      this.authService.setToken(response.token);
      if (this.authService.hasValidIdToken()) {
        this.isLoggedIn = true;
        this.router.navigate(['/Investments']);
      }
    } );
  }
}
