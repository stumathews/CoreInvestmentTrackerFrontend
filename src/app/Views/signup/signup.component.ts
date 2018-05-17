import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityUtilities, EntityTypes,
  GetRequiredNumberValidators, GetRequiredTextValidators,
  GetPasswordValidators} from '../../Utilities';
import { SignupDetails } from '../../Models/SignupDetails';
import { ApiService } from '../../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private apiService: ApiService,
    private readonly router: Router) { }
  form: FormGroup;
  signupdetails: SignupDetails = <SignupDetails> {Username: '', Password: '', Email: '', Timezone: 0};


  ngOnInit() {
    this.form = new FormGroup({
      Username: new FormControl(this.signupdetails.Username, GetRequiredTextValidators()),
      Password: new FormControl(this.signupdetails.Password, GetRequiredTextValidators()),
      Email: new FormControl(this.signupdetails.Email, ),
      Timezone: new FormControl(this.signupdetails.Timezone, GetRequiredNumberValidators()),
    });
  }

  onSubmit(form: SignupDetails) {
    this.signupdetails = form;
    console.log(form);
    this.apiService.Signup(form).subscribe( (response: any) => {
      console.log('back from signup call and in page again');
    } );
  }

}
