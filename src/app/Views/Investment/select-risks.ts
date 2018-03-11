import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators, EntityTypes, SelectEntitiesComponent } from '../../Utilities';
import { CheckModel } from '../../Models/CheckModel';
import { SelectItemsComponent } from './select-items';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { InvestmentService } from '../../investment.service';



@Component({
  selector: 'app-select-risks',
  templateUrl: 'select-entities.html',
  })

export class SelectRisksComponent extends SelectEntitiesComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private investmentService: InvestmentService) {
                  super();
              }
  ngOnInit(): void {
    if (this.investmentService.SelectedRisks && this.investmentService.SelectedRisks.length > 0) {
        console.log('Restoring slected risks');
        this.Items = this.investmentService.SelectedRisks;
    } else {
    this.apiService.GetRisks().subscribe(risks => {
        this.Items = this.ConvertRisksToCheckModels(risks);
        },
        error => this.error = <any>error);
    }
  }

  onNext() {
      /* Convert Selected items to Risks */
    this.investmentService.SelectedRisks = this.Items.filter((value) => {  if (value.checked) { return value; } });
    console.log('saved risks selection');
    this.router.navigateByUrl('/NewInvestmentWizard/(NewInvestmentWizardOutlet:SelectGroups)');
  }
}

