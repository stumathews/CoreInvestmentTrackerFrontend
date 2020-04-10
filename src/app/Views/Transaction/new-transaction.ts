import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentTransaction } from '../../Models/InvestmentTransaction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators, GetRequiredDecimalNumberValidators } from '../../Utilities';
import {Investment } from '../../Models/Investment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-transaction',
  templateUrl: 'new-transaction.html',
  styleUrls: ['../Investment/select-entities.css']
  })

export class NewTransactionComponent implements OnInit {
  form;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }
  errorMessage: string;
  Investment: Investment;
  @Output() CreatedTransactionEvent = new EventEmitter<InvestmentTransaction>();

  ngOnInit(): void {
      this.form = new FormGroup({
       name: new FormControl('', GetRequiredTextValidators()),
       description: new FormControl('desc', GetRequiredTextValidators()),
       type: new FormControl(0, GetRequiredTextValidators()),
       numUnits: new FormControl(1, GetRequiredNumberValidators()),
       pricePerUnit: new FormControl(1.0, Validators.pattern(/^-?\d+\.?\d*?$/)),
       currency: new FormControl('GBP', GetRequiredTextValidators()),
       commision: new FormControl(0, GetRequiredNumberValidators()),
       transactionDate: new FormControl('01-12-2019',
       Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)),
       transactionType: new FormControl(1, GetRequiredNumberValidators()),
    });
  }

  onSubmit(form: InvestmentTransaction) {
    form.investmentID = this.Investment.id;
    this.apiService.CreateInvestmentTransaction(form).pipe(finalize(() => {
      this.CreatedTransactionEvent.emit(form);
      // this.router.navigate(['/Transactions']);
      console.log('submitted transaction');
    })).subscribe((value) => {
      console.log('create transaction response: ' + JSON.stringify(value));
    });
  }
}
