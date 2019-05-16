import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentTransaction } from '../../Models/InvestmentTransaction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators } from '../../Utilities';
import {Investment } from '../../Models/Investment';
import 'rxjs/add/operator/finally';

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
       pricePerUnit: new FormControl(1, GetRequiredNumberValidators()),
       currency: new FormControl('GBP', GetRequiredTextValidators()),
       transactionType: new FormControl(1, GetRequiredNumberValidators()),
    });
  }

  onSubmit(form: InvestmentTransaction) {
    form.investmentID = this.Investment.id;
    this.apiService.CreateInvestmentTransaction(form).finally(() => {
      this.CreatedTransactionEvent.emit(form);
      // this.router.navigate(['/Transactions']);
      console.log('submitted transaction');
    }).subscribe((value) => {
      console.log('create transaction response: ' + JSON.stringify(value));
    });
  }
}
