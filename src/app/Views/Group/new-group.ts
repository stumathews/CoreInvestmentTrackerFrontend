import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators } from '../../Utilities';


@Component({
  selector: 'app-new-group',
  templateUrl: 'new-group.html',
  })

export class NewGroupComponent implements OnInit {
  form;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }
  errorMessage: string;
  @Output() CreatedGroupEvent = new EventEmitter<InvestmentGroup>();

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl('', GetRequiredTextValidators()),
        description: new FormControl('', GetRequiredTextValidators()),
        type: new FormControl('£', GetRequiredTextValidators()),
    });
  }

  onSubmit(form: InvestmentGroup) {
    this.apiService.CreateInvestmentGroup(form).finally(() => {
      this.CreatedGroupEvent.emit(form);
      this.router.navigate(['/Groups']);
    }).subscribe( (value) => {
      console.log('received response: ' + JSON.stringify(value));
    });
  }
}
