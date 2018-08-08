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
import { CustomEntity } from '../../Models/CustomEntity';
import { BsModalRef } from 'ngx-bootstrap';



@Component({
  selector: 'app-associate-cusotm-entities',
  templateUrl: 'select-entities.html',
  styleUrls: ['select-entities.css']
  })

export class AssociateCustomEntitiesComponent extends SelectEntitiesComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              public bsModalRef: BsModalRef) {
                  super();
                }
  EntityType: EntityTypes = EntityTypes.CustomEntity;
  @Input() InvestmentId: number;
  @Input() CustomEntityType: string;
  @Output() AssociatedCustomEntityEvent = new EventEmitter<CustomEntity>();

  ngOnInit(): void {

  }

  init() {
    console.log('getting custom entities of type ' + this.CustomEntityType + ' id is: ' + this.InvestmentId);
    this.apiService.GetCustomEntitiesByType(this.CustomEntityType , this.InvestmentId + '')
    .subscribe(entities => {this.Items = this.ConvertCustomEntitiesToCheckModels(entities); },
    error => this.error = <any>error);
  }

  onNext() {
    const investmentId = this.InvestmentId ? this.InvestmentId : +this.route.snapshot.paramMap.get('id');
    const entityIds = this.GetEntityIds();

    this.apiService
    .AssociateEntityWithInvestment(EntityTypes.CustomEntity, entityIds, investmentId)
    .subscribe((value) => {
      entityIds.forEach( id => {
        this.apiService.GetCustomEntity(id).subscribe( entity => {
        console.log('pushing newly associated custom entity');
          this.AssociatedCustomEntityEvent.emit(entity);
        }, error => { this.error = <any>error; });

      });

    }, error => {});
  }
}

