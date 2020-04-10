import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators } from '../../Utilities';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-new-risk',
  templateUrl: 'new-risk.html',
  })

export class NewRiskComponent implements OnInit {
  form;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }
  errorMessage: string;
  @Output() CreatedRiskEvent = new EventEmitter<InvestmentRisk>();

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl('', GetRequiredTextValidators()),
        description: new FormControl('', GetRequiredTextValidators()),
        type: new FormControl('', GetRequiredNumberValidators()),
    });
  }

  onSubmit(form: InvestmentRisk) {
    this.apiService.CreateInvestmentRisk(form).pipe(finalize(() => {
       this.router.navigate(['/Risks']);
       this.CreatedRiskEvent.emit(form);
    })).subscribe( (value) => {
      console.log('received response: ' + JSON.stringify(value));
       this.goHome();
    });
  }

  goHome() {
    this.router.navigate(['']);
  }

}
