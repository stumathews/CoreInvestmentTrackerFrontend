import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { ActivatedRoute , Router} from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvestmentService } from '../../investment.service';
import { EntityUtilities, EntityTypes, GetRequiredNumberValidators, GetRequiredTextValidators  } from '../../Utilities';
import { CustomEntityType } from '../../Models/CustomEntityType';


@Component({
  selector: 'app-new-custom-entity-type',
  templateUrl: 'new-custom-entity-type.html',
  })

export class NewCustomEntityTypeComponent extends EntityUtilities implements OnInit {
  form;
  constructor(protected apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private investmentService: InvestmentService) {
                super(apiService);
              }
  Entity: CustomEntityType;
  dataTypes = EntityTypes; // Note no datatype specified for enum here for select enumerations
  errorMessage: string;
  @Input() DataType: EntityTypes;
  @Output() CreatedCustomEntityTypeEvent = new EventEmitter<CustomEntityType>();

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl(this.investmentService.Investment.name, GetRequiredTextValidators()),
        description: new FormControl(this.investmentService.Investment.description, GetRequiredTextValidators()),
        dataType: new FormControl(null, Validators.required),
    });
  }

  onSubmit(form: CustomEntityType) {
    this.apiService.CreateCustomEntityType(form).subscribe( (entityType) => this.Entity = entityType);
    // this.router.navigateByUrl('/CustomEntityTypes');
    this.CreatedCustomEntityTypeEvent.emit(form);
  }
}
