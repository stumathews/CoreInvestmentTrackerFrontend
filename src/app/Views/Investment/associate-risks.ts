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
import { InvestmentComponent } from './investment';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';



@Component({
  selector: 'app-associate-risks',
  templateUrl: 'select-entities.html',
  styleUrls: ['select-entities.css']
  })

export class AssociateRisksComponent extends SelectEntitiesComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
                  super();
                  this.ExtraLinks = [ {displayName: 'Add New Risk', url: '/NewRisk'},
                                      {displayName: 'test1', url: 'testUrl1'}];
                }

  @Input() InvestmentId: number;
  @Output() AssociatedRiskEvent = new EventEmitter<InvestmentRisk>();
  ngOnInit(): void {
    this.apiService.GetRisks().subscribe(risks => { this.Items = this.ConvertRisksToCheckModels(risks); },
                                         error => this.error = <any>error);
  }

  onNext() {
    const investmentId = this.InvestmentId ? this.InvestmentId : +this.route.snapshot.paramMap.get('id');
    const entityIds = this.GetEntityIds();

    this.apiService
    .AssociateEntityWithInvestment(EntityTypes.InvestmentRisk, entityIds, investmentId)
    .subscribe((value) => {
      entityIds.forEach( id => {
        this.apiService.GetRisk(id).subscribe( risk => {
          console.log('pushing newly associated risk ' + risk.name);
          this.AssociatedRiskEvent.emit(risk);
        }, error => { this.error = <any>error; });

      });

      // this.router.navigateByUrl('/InvestmentDetails/' + investmentId);

    },
               error => {});
  }
}

