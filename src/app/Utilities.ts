import { Component, OnInit, Input } from '@angular/core';
import { Investment } from './Models/investment';
import { InvestmentGroup } from './Models/InvestmentGroup';
import { InvestmentInfluenceFactor } from './Models/InvestmentInfluenceFactor';
import { InvestmentRisk } from './Models/InvestmentRisk';
import { Region } from './Models/Region';
import { ApiService } from './apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckModel } from './Models/CheckModel';
import { Link } from './Models/Link';


export abstract class SelectEntitiesComponent {
    EntityTypes = EntityTypes;
    error: string;
    Items: CheckModel[] = [];
    ExtraLinks: Link[] = [];

    public ConvertRegionsToCheckModels(regions: Region[]) {
        if (regions) {
            return regions.filter((item) => { if (item) { return item; } }).map( (value, index, array) => {
                return  <CheckModel> {
                    id: value.id,
                    name: value.name,
                    description: value.description,
                    checked: false
                };
            });
        }
      }
    public ConvertFactorsToCheckModels(factors: InvestmentInfluenceFactor[]): CheckModel[] {
        if (factors && factors.length > 0) {
          return factors.filter((item) => { if (item) { return item; } }).map( (factor, index, array) => {
            return <CheckModel> {
              id: factor.id,
              name: factor.name,
              description:
              factor.description,
              checked: false
            };
          });
        }
      }
    public ConvertGroupsToCheckModel(groups: InvestmentGroup[]): CheckModel[] {
        if (groups) {
          return groups.filter((item) => { if (item) { return item; } }).map( (value, index, array) => {
              return  <CheckModel> {
                  id: value.id,
                  name: value.name,
                  description: value.description,
                  checked: false
              };
          });
        }
      }
    public ConvertRisksToCheckModels(risks: InvestmentRisk[]): CheckModel[] {
        if (risks) {
          return risks.filter((item) => { if (item) { return item; } }).map( (value, index, array) => {
              return  <CheckModel> {
                  id: value.id,
                  name: value.name,
                  description: value.description,
                  checked: false
              };
          });
        }
      }
    public GetEntityIds(): number[] {
        return this.Items.map((item) => {
            if (item.checked) { return item.id; }
        }).filter((id) => { if (id !== null) { return id; } });
    }
}

export abstract class DetailComponentBase implements OnInit  {
    EntityTypes = EntityTypes;
    Entity: Investment | InvestmentGroup | InvestmentInfluenceFactor | InvestmentRisk | Region;
    MyType: EntityTypes;
    errorMessage: string;
    constructor(protected apiService: ApiService) { }

    ngOnInit() { }

    public saveEditable(element, id: number) {
            const property = element.name;
            const newVal = this.Entity[property];
            console.log('name=' + element.name);
            console.log('http.service.UpdateEntity(' + id + ',' + property + ',' + this.Entity[property] + ')');

            this.apiService.UpdateEntity(this.MyType, +id, property, newVal)
                           .subscribe(code =>  console.log('back from patch'),
                                      error => this.errorMessage = <any>error);
    }

}

export function GetRequiredTextValidators() {
    return Validators.compose( [
      Validators.required,
      Validators.pattern('.+')]);
   }

 export function GetRequiredNumberValidators() {
    return Validators.compose( [
      Validators.required,
      Validators.pattern('\\d+')]);
   }

export enum EntityTypes {
    Investment = 0,
    InvestmentGroup,
    InvestmentRisk,
    InvestmentInfluenceFactor,
    Region,
    Note
}

export abstract class InvestmentUtilities {
    EntityTypes = EntityTypes;
    constructor(protected apiService: ApiService) { }
    errorMessage: string;
    populateInvestmentFully(investment: Investment) {
        investment.factors.forEach((factor, findex) => {
        this.apiService.GetFactor(factor.investmentInfluenceFactorID).subscribe( result => {
            factor.investmentInfluenceFactor = result;
        }, error => this.errorMessage = <any>error);
        });
        investment.risks.forEach((risk, riskIndex) => {
        this.apiService.GetRisk(risk.investmentRiskID).subscribe( result => {
            risk.investmentRisk = result;
        }, error => this.errorMessage = <any>error);
        });
        investment.regions.forEach((region, regionIndex) => {
        this.apiService.GetRegion(region.regionID).subscribe( result => {
            region.region = result;
        }, error => this.errorMessage = <any>error);
        });
        investment.groups.forEach((group, gindex) => {
        this.apiService.GetGroup(group.investmentGroupID).subscribe( result => {
            group.investmentGroup = result;
        }, error => this.errorMessage = <any>error);
        });
        return investment;
    }
  }
