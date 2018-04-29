import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Region } from '../../Models/Region';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase  } from '../../Utilities';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.html'
})
export class RegionDetailsComponent extends DetailComponentBase implements OnInit  {
  Entity: Region;
  constructor(
     protected apiService: ApiService,
     protected route: ActivatedRoute,
     protected location: Location,
     protected modalService: BsModalService,
     protected router: Router) {
    super(apiService, EntityTypes.Region, route, location, modalService, router );
    this.MyType = EntityTypes.Region;
   }
  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetRegion(id).subscribe(region => this.Entity = region,
                   error => this.errorMessage = <any>error);
  }
}
