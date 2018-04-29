import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.html'
})
export class GroupDetailsComponent extends DetailComponentBase implements OnInit  {
  Entity: InvestmentGroup;
  constructor(protected apiService: ApiService,
     protected route: ActivatedRoute,
     protected location: Location,
     protected modalService: BsModalService,
     protected router: Router) {
    super(apiService, EntityTypes.InvestmentGroup, route, location, modalService, router);
    this.MyType = EntityTypes.InvestmentGroup;
  }

  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetGroup(id).subscribe(group => this.Entity = group,
                   error => this.errorMessage = <any>error);
  }
}
