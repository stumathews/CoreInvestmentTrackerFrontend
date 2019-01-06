import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators } from '../../Utilities';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-new-factor',
  templateUrl: 'new-factor.html',
  })

export class NewFactorComponent implements OnInit {
  form;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }
  errorMessage: string;
  @Output() FactorCreatedEvent = new EventEmitter<InvestmentInfluenceFactor>();

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl('', GetRequiredTextValidators()),
        description: new FormControl('', GetRequiredTextValidators()),
        influence: new FormControl('£', GetRequiredTextValidators()),
    });
  }

  onSubmit(form: InvestmentInfluenceFactor) {
    this.apiService.CreateInvestmentInfluenceFactor(form)
    .finally(() => {
      this.FactorCreatedEvent.emit(form);
      this.router.navigate(['/Factors']);
    })
    .subscribe( (value) => {
      console.log('received response: ' + JSON.stringify(value));
      this.goHome();
    });
  }

  goHome() {
    this.router.navigate(['']);
  }

}
