import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';

@Component({
  selector: 'app-risk-details',
  templateUrl: './risk-details.html'
})
export class RiskDetailsComponent extends DetailComponentBase implements OnInit {
  Entity: InvestmentRisk;
  constructor(protected apiService: ApiService, private route: ActivatedRoute, private location: Location) {
    super(apiService);
    this.MyType = EntityTypes.InvestmentRisk;
   }

  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetRisk(id).subscribe(risk => this.Entity = risk,
                   error => this.errorMessage = <any>error);
  }
}
