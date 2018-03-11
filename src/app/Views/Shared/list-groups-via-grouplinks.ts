
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, KeyValueDiffers, DoCheck } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { GroupsLink } from '../../Models/Investment';
import { HtmlAction } from '../../Models/HtmlAction';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityTypes } from '../../Utilities';

@Component({
  selector: 'app-list-groups-via-grouplinks',
  templateUrl: './list-groups-via-grouplinks.html'
})

export class ListGroupsViaGroupLinksComponent implements OnInit, DoCheck {
  Groups: InvestmentGroup[] = [];
  differ: any;
  private _GroupLinks: GroupsLink[];
  @Input() ParentId: number;
  @Input()
  set GroupLinks(groups: GroupsLink[]) {
    this._GroupLinks = groups;
  }
  get GroupLinks(): GroupsLink[] {
    return this._GroupLinks;
  }
  constructor(private apiService: ApiService, private differs: KeyValueDiffers ) {
    this.differ = differs.find({}).create();
  }
  errorMessage: string;

  DissasociateEntityFromInvestment(entityId: number, parentId: number) {
    this.apiService
    .DissassociateEntityFromInvestment(EntityTypes.InvestmentGroup, entityId, parentId )
    .finally(() => {
      const toRemove = this.Groups.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.Groups.indexOf(toRemove[0]);
      this.Groups.splice(i, 1);
      this.ngOnInit();
    })
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }
  ngDoCheck(): void {
    const changes = this.differ.diff(this.GroupLinks);
    if  (changes) {
      changes.forEachChangedItem( r =>  console.log('changed ', r.currentValue));
      changes.forEachAddedItem( r => {
          const v: GroupsLink = r.currentValue;
          console.log('Added GroupID: ' + v.investmentGroupID );
          this.apiService.GetGroup(v.investmentGroupID)
            .subscribe(realGroup => this.Groups.push(realGroup), error => this.errorMessage = <any>error);
      });
      changes.forEachRemovedItem( r =>  console.log('removed ', r.currentValue));
   }
  }
  ngOnInit(): void { }
}
