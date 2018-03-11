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
  selector: 'app-select-groups',
  templateUrl: 'select-entities.html',
  })

export class SelectGroupsComponent extends SelectEntitiesComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private investmentService: InvestmentService) {
                  super();
                }
  ngOnInit(): void {
    if (this.investmentService.SelectedGroups && this.investmentService.SelectedGroups.length > 0) {
        console.log('Restoring selected groups');
        this.Items = this.investmentService.SelectedGroups;
    } else {
        this.apiService.GetGroups().subscribe(groups => {
        this.Items = this.ConvertGroupsToCheckModel(groups);
        },
        error => this.error = <any>error);
  }
}
  onNext() {
    this.investmentService.SelectedGroups = this.Items.filter((value) => {  if (value.checked) { return value; } });;
    console.log('saved group selection');
    this.router.navigateByUrl('/NewInvestmentWizard/(NewInvestmentWizardOutlet:SelectRegions)');
  }
}

