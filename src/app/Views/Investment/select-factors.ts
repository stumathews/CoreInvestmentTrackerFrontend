/* TODO:
1. Fix restoring wizard data
*/
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators, EntityTypes, SelectEntitiesComponent } from '../../Utilities';
import { CheckModel } from '../../Models/CheckModel';
import { SelectItemsComponent } from './select-items';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { InvestmentService } from '../../investment.service';
import { FactorsLink } from '../../Models/Investment';

@Component({
  selector: 'app-select-factors',
  templateUrl: 'select-entities.html',
  })

export class SelectFactorsComponent extends SelectEntitiesComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private investmentService: InvestmentService) {
                super();
               }
  Entities: InvestmentInfluenceFactor[];
  ngOnInit(): void {
    if (this.investmentService.SelectedFactors && this.investmentService.SelectedFactors.length > 0) {
      console.log('Restoring selected factors..');
      this.Items = this.investmentService.SelectedFactors;
    } else {
      this.apiService.GetFactors()
                     .subscribe(factors => { this.Items = this.ConvertFactorsToCheckModels(factors); },
                                error => this.error = <any>error);
    }
  }

  onNext() {
    this.investmentService.SelectedFactors = this.Items.filter((value) => {  if (value.checked) { return value; } });
    console.log('Saved selected factor selection');
    this.router.navigateByUrl('/NewInvestmentWizard/(NewInvestmentWizardOutlet:SelectRisks)');
  }
}

