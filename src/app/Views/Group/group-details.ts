import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.html'
})
export class GroupDetailsComponent extends DetailComponentBase implements OnInit  {
  Entity: InvestmentGroup;
  constructor(protected apiService: ApiService, private route: ActivatedRoute, private location: Location) { 
    super(apiService);
    this.MyType = EntityTypes.InvestmentGroup;
  }

  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetGroup(id).subscribe(group => this.Entity = group,
                   error => this.errorMessage = <any>error);
  }
}
