
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, KeyValueDiffers, DoCheck } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Region } from '../../Models/Region';
import { RegionsLink } from '../../Models/Investment';
import { HtmlAction } from '../../Models/HtmlAction';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityTypes } from '../../Utilities';


@Component({
  selector: 'app-list-regions',
  templateUrl: './list-regions.html'
})

export class ListRegionsComponent implements OnInit, DoCheck {
  constructor(private apiService: ApiService, private differs: KeyValueDiffers ) {
    this.differ = differs.find({}).create();
  }
  differ: any;
  errorMessage: string;
  Regions: Region[] = [];
  private _RegionsLinks: RegionsLink[];
  @Input() ParentId: number;
  @Input()
  set RegionLinks(Regions: RegionsLink[]) {
    this._RegionsLinks = Regions;
  }
  get RegionLinks(): RegionsLink[] {
    return this._RegionsLinks;
  }

  DissasociateEntityFromInvestment(entityId: number, parentId: number) {
    this.apiService
    .DissassociateEntityFromInvestment(EntityTypes.Region, entityId, parentId )
    .finally(() => {
      const toRemove = this.Regions.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.Regions.indexOf(toRemove[0]);
      this.Regions.splice(i, 1);
      this.ngOnInit();
    })
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.RegionLinks);
    if  (changes) {
      changes.forEachChangedItem( r =>  console.log('changed ', r.currentValue));
      changes.forEachAddedItem( r => {
          const v: RegionsLink = r.currentValue;
          console.log('Added RegionID: ' + v.regionID );
          this.apiService.GetRegion(v.regionID)
            .subscribe(realRegion => this.Regions.push(realRegion), error => this.errorMessage = <any>error);
      });
      changes.forEachRemovedItem( r =>  console.log('removed ', r.currentValue));
   }
  }

  ngOnInit(): void { }
}
