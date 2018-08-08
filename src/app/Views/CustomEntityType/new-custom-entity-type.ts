import { Component, OnInit, Input } from '@angular/core';
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
  errorMessage: string;

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl(this.investmentService.Investment.name, GetRequiredTextValidators()),
        description: new FormControl(this.investmentService.Investment.description, GetRequiredTextValidators()),
    });
  }

  onSubmit(form: CustomEntityType) {
    this.apiService.CreateCustomEntityType(form).subscribe( (entityType) => this.Entity = entityType);
    this.router.navigateByUrl('/NewInvestmentWizard/(NewInvestmentWizardOutlet:SelectFactors)');
  }
}
