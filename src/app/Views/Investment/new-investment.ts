import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/investment';
import { ActivatedRoute , Router} from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvestmentService } from '../../investment.service';
import { InvestmentUtilities, EntityTypes, GetRequiredNumberValidators, GetRequiredTextValidators  } from '../../Utilities';


@Component({
  selector: 'app-new-investment',
  templateUrl: 'new-investment.html',
  })

export class NewInvestmentComponent extends InvestmentUtilities implements OnInit {
  form;
  constructor(protected apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private investmentService: InvestmentService) {
                super(apiService);
              }
  Entity: Investment;
  errorMessage: string;

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl(this.investmentService.Investment.name, GetRequiredTextValidators()),
        description: new FormControl(this.investmentService.Investment.description, GetRequiredTextValidators()),
        symbol: new FormControl(this.investmentService.Investment.symbol, GetRequiredTextValidators()),
        valueProposition: new FormControl(this.investmentService.Investment.valueProposition, GetRequiredTextValidators()),
        desirabilityStatement: new FormControl(this.investmentService.Investment.desirabilityStatement, GetRequiredTextValidators()),
        initialInvestment: new FormControl(this.investmentService.Investment.initialInvestment, GetRequiredNumberValidators()),
        value: new FormControl(this.investmentService.Investment.value, GetRequiredNumberValidators()),
    });
  }

  onSubmit(form: Investment) {
    this.investmentService.Investment = form;
    this.router.navigateByUrl('/NewInvestmentWizard/(NewInvestmentWizardOutlet:SelectFactors)');
  }
}
