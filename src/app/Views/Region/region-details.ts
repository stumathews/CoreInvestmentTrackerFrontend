import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Region } from '../../Models/Region';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase  } from '../../Utilities';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.html'
})
export class RegionDetailsComponent extends DetailComponentBase implements OnInit  {
  Entity: Region;
  constructor(protected apiService: ApiService, private route: ActivatedRoute, private location: Location) {
    super(apiService);
    this.MyType = EntityTypes.Region;
   }
  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetRegion(id).subscribe(region => this.Entity = region,
                   error => this.errorMessage = <any>error);
  }
}
