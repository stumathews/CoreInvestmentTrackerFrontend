
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, DoCheck, KeyValueDiffers, IterableDiffers } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { RisksLink } from '../../Models/Investment';
import { HtmlAction } from '../../Models/HtmlAction';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityTypes } from '../../Utilities';

@Component({
  selector: 'app-list-risks',
  templateUrl: './list-risks.html'
})

export class ListRiskComponent implements OnInit, DoCheck {
  errorMessage: string;
  differ: any;
  Risks: InvestmentRisk[] = [];
  /* Note: we deal with RiskLikns which are lighteight.
    We get the RiskLink objects that are references to the risks via RiskIDs.
    So, lets use those IDs and get the full risks. */
  private _RiskLinks: RisksLink[];
  @Input() ParentId: number;

  // Setter
  @Input()
  set RiskLinks(Risks: RisksLink[]) {
    this._RiskLinks = Risks;
  }
  // Getter
  get RiskLinks(): RisksLink[] {
    return this._RiskLinks;
  }

  constructor(private apiService: ApiService, private differs: KeyValueDiffers ) {
    this.differ = differs.find({}).create();
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.RiskLinks);
    if  (changes) {
      changes.forEachChangedItem( r =>  console.log('changed ', r.currentValue));
      changes.forEachAddedItem( r => {
          const v: RisksLink = r.currentValue;
          console.log('Added RiskID: ' + v.investmentRiskID );
          this.apiService.GetRisk(v.investmentRiskID)
            .subscribe(realRisk => this.Risks.push(realRisk), error => this.errorMessage = <any>error);
      });
      changes.forEachRemovedItem( r =>  console.log('removed ', r.currentValue));
   }
  }

  DissasociateEntityFromInvestment(entityId: number, parentId: number) {
    this.apiService
    .DissassociateEntityFromInvestment(EntityTypes.InvestmentRisk, entityId, parentId )
    .finally(() => {
      const toRemove = this.Risks.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.Risks.indexOf(toRemove[0]);
      this.Risks.splice(i, 1);
      this.ngOnInit();
    })
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }

  ngOnInit(): void {

   }
}
