import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Region } from '../../Models/Region';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators, EntityUtilities, EntityTypes} from '../../Utilities';

import 'rxjs/add/operator/finally';
import { CustomEntity } from '../../Models/CustomEntity';
import { CustomEntityType } from '../../Models/CustomEntityType';

@Component({
  selector: 'app-new-custom-entity',
  templateUrl: 'new-custom-entity.html',
  styleUrls: ['../Investment/select-entities.css']
  })

export class NewCustomEntityComponent extends EntityUtilities implements OnInit {
  form;
  constructor(protected apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
                super(apiService);
              }
  errorMessage: string;
  @Output() CreatedCustomEntity = new EventEmitter<CustomEntity>();
  @Input() Type: string;
  @Input() OwningEntityId: number;
  @Input() OwningEntityType: number;

  ngOnInit(): void {
      this.OwningEntityId = this.OwningEntityId ? this.OwningEntityId : +this.route.snapshot.paramMap.get('owningEntityId');
      this.OwningEntityType = this.OwningEntityType ? this.OwningEntityType : +this.route.snapshot.paramMap.get('owningEntityType');
      this.form = new FormGroup({
        name: new FormControl('', GetRequiredTextValidators()),
        description: new FormControl('', null),
    });
  }

  init(): void {
    
   }

  onSubmit(form: CustomEntity) {
    form.owningEntityType = this.OwningEntityType;
    form.owningEntityId = this.OwningEntityId;
    form.owningCustomEntity = <CustomEntity>{};
    form.customEntityType = <CustomEntityType>{ name: this.Type};
    console.log('custom entity looks liks this: ' + JSON.stringify(form));
    this.apiService.CreateCustomEntity(form).finally(() => {
      let redirectUrl = '';
      switch (this.OwningEntityType) {
        case EntityTypes.Investment:
          redirectUrl = '/InvestmentDetails/';
          break;
        case EntityTypes.InvestmentGroup:
          redirectUrl = 'GroupDetails/';
          break;
        case EntityTypes.InvestmentInfluenceFactor:
          redirectUrl = 'FactorDetails/';
          break;
        case EntityTypes.InvestmentRisk:
          redirectUrl = 'RiskDetails/';
          break;
        case EntityTypes.Region:
          redirectUrl = 'RegionDetails/';
          break;
        default:
          redirectUrl = '';
      }
      // this.router.navigate([redirectUrl + this.OwningEntityId]);
    }).subscribe( (value) => {
      console.log('About to emit value:' + JSON.stringify(value));
      this.CreatedCustomEntity.emit(value);
      console.log('received response: ' + JSON.stringify(value));
    });
  }


}
