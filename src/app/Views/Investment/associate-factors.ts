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
  selector: 'app-associate-factors',
  templateUrl: 'select-entities.html',
  styleUrls: ['select-entities.css']
  })

export class AssociateFactorsComponent extends SelectEntitiesComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
                super();
               }

  @Input() InvestmentId: number;
  @Output() AssociatedFactorEvent = new EventEmitter<InvestmentInfluenceFactor>();
  Entities: InvestmentInfluenceFactor[];
  ngOnInit(): void {
      this.apiService.GetFactors().subscribe(factors => { this.Items = this.ConvertFactorsToCheckModels(factors); },
                                             error => this.error = <any>error);
  }

  onNext() {
  const investmentId = this.InvestmentId ? this.InvestmentId : +this.route.snapshot.paramMap.get('id');
  const entityIds = this.GetEntityIds();

    this.apiService
    .AssociateEntityWithInvestment(EntityTypes.InvestmentInfluenceFactor, entityIds, investmentId)
    .subscribe((value) => {
      entityIds.forEach(id => {
        this.apiService.GetFactor( id).subscribe( factor => {
          console.log('pushing newly associated factor ' + factor.name);
          this.AssociatedFactorEvent.emit(factor);
        }, error => { this.error = <any>error; });
      });
  }, error => console.log('an error occured associating factors:' + error));
}
}
