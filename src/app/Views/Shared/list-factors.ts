
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, KeyValueDiffers } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { FactorsLink } from '../../Models/Investment';
import { HtmlAction } from '../../Models/HtmlAction';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityTypes } from '../../Utilities';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-list-factors',
  templateUrl: './list-factors.html'
})

export class ListFactorsComponent implements OnInit, DoCheck {
  Factors: InvestmentInfluenceFactor[] = [];
  differ: any;
  private _FactorLinks: FactorsLink[];
  /* We get the RiskLink objects that are references to the risks via RiskIDs.
     So, lets use those IDs and get the full risks. */
  @Input() ParentId: number;
  @Input()
  set FactorLinks(Factors: FactorsLink[]) {
    this._FactorLinks = Factors;
  }
  get FactorLinks(): FactorsLink[] {
    return this._FactorLinks;
  }
  constructor(private apiService: ApiService, private differs: KeyValueDiffers ) {
    this.differ = differs.find({}).create();
  }
  errorMessage: string;

  DissasociateEntityFromInvestment(entityId: number, parentId: number) {
    this.apiService
    .DissassociateEntityFromInvestment(EntityTypes.InvestmentInfluenceFactor, entityId, parentId )
    .finally(() => {
      const toRemove = this.Factors.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.Factors.indexOf(toRemove[0]);
      this.Factors.splice(i, 1);
      this.ngOnInit();
    })
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.FactorLinks);
    if  (changes) {
      changes.forEachChangedItem( r =>  console.log('changed ', r.currentValue));
      changes.forEachAddedItem( r => {
        if (r) {
          const v: FactorsLink = r.currentValue;
          this.apiService.GetFactor(v.investmentInfluenceFactorID)
            .subscribe(realFactor => this.Factors.push(realFactor), error => this.errorMessage = <any>error);
        }
      });
      changes.forEachRemovedItem( r =>  console.log('removed ', r.currentValue));
   }
  }

  ngOnInit(): void { }
}
