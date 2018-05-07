import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EntityUtilities, EntityTypes, GetRequiredNumberValidators, GetRequiredTextValidators  } from '../../Utilities';

import { ApiService } from '../../apiservice.service';
import { LoginDetails } from '../../Models/LoginDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends EntityUtilities implements OnInit {
  form;
  logindetails: LoginDetails;
  constructor(apiService: ApiService) {
    super(apiService);
   }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.logindetails.username, GetRequiredTextValidators()),
      description: new FormControl(this.logindetails.password, GetRequiredTextValidators()),
  });
  }

  onSubmit(form: LoginDetails) {
    this.logindetails = form;
  }

}
