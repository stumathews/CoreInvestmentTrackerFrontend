import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators, EntityTypes } from '../../Utilities';
import { CheckModel } from '../../Models/CheckModel';
import { SelectItemsComponent } from './select-items';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { Investment } from '../../Models/Investment';
import { FactorsLink } from '../../Models/Investment';
import { RisksLink } from '../../Models/Investment';
import { GroupsLink } from '../../Models/Investment';
import { RegionsLink } from '../../Models/Investment';
import { Region } from '../../Models/Region';
import { InvestmentService } from '../../investment.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';



@Component({
  selector: 'app-summary-of-new-investment',
  templateUrl: 'summary-of-new-investment.html',
  })

export class SummaryOfNewInvestmentComponent implements OnInit {
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private investmentService: InvestmentService) { }
  EntityTypes = EntityTypes;
  Factors: CheckModel[];
  Groups: CheckModel[];
  Regions: CheckModel[];
  Risks: CheckModel[];
  Investment: Investment;
  error: string;

  ngOnInit(): void {
    this.Investment = this.investmentService.Investment || null;
    this.Factors = this.investmentService.SelectedFactors.filter((item) => {if (item) { return item; } });
    this.Groups = this.investmentService.SelectedGroups.filter((item) => {if (item) { return item; } });
    this.Regions = this.investmentService.SelectedRegions.filter((item) => {if (item) { return item; } });
    this.Risks = this.investmentService.SelectedRisks.filter((item) => {if (item) { return item; } });
   }
  onFinished() {
    this.apiService.CreateInvestment(this.Investment).toPromise()
    .then ( (newInvestment) => {
        /* Generate a list of factors to link to investment */
        if (this.Factors) {
            const FactorLinks: FactorsLink[] = this.Factors.map( (factor) => {
                if (factor) { return <FactorsLink>
                    {
                        investmentID: newInvestment.id,
                        investmentInfluenceFactor: null,
                        investmentInfluenceFactorID: factor.id
                    };
                }
            });
            // Attach to local investment
            this.Investment.factors = FactorLinks.filter((item) => { if (item) { return item; } });
        }

        /* Generate a list of risk to link to investment */
        if (this.Risks) {
            const RiskLinks: RisksLink[] = this.Risks.map( (risk) => {
                if (risk) { return <RisksLink>
                {
                    investmentID: newInvestment.id,
                    investmentRisk: null,
                    investmentRiskID: risk.id  };
                }
            });
            // Attach to local investment
            this.Investment.risks = RiskLinks.filter((item) => { if (item) { return item; } });
        }
        /* Generate a list of groups to link to investment */
        if (this.Groups) {
            const GroupLinks: GroupsLink[] = this.Groups.map( (group) => {
                if (group) { return <GroupsLink>
                    {
                        investmentID: newInvestment.id,
                        investmentGroup: null,
                        investmentGroupID: group.id
                    };
                }
            });
            // Attach to local investment
            this.Investment.groups = GroupLinks.filter((item) => { if (item) { return item; } });
        }
        /* Generate a list of regions to link to investment */
        if (this.Regions) {
            const RegionLinks: RegionsLink[] = this.Regions.map( (region) => {
                if (region) { return <RegionsLink>
                    {
                        investmentID: newInvestment.id,
                        region: null,
                        regionID: region.id
                    };
                }
            });
            // Attach to local investment
            this.Investment.regions = RegionLinks.filter((item) => { if (item) { return item; } });
        }

        /* Now update the investment with each of the newly attached entity links ...*/
        return this.apiService.UpdateEntity(EntityTypes.Investment, newInvestment.id, 'Factors', this.Investment.factors)
            .toPromise()
            .then(() => {
                return this.apiService
                    .UpdateEntity(EntityTypes.Investment, newInvestment.id, 'Risks', this.Investment.risks)
                    .toPromise();
            })
            .then(() => {
                return this.apiService
                    .UpdateEntity(EntityTypes.Investment, newInvestment.id, 'Groups', this.Investment.groups)
                    .toPromise();
            })
            .then(() => {
                return this.apiService
                    .UpdateEntity(EntityTypes.Investment, newInvestment.id, 'Regions', this.Investment.regions)
                    .toPromise();
            }).then(() => {
                console.log('All new links created for investment');
            });
    }).then(() => {
        console.log('Clearing selected items');
        this.investmentService.Investment = <Investment>{};
        this.investmentService.SelectedFactors = null;
        this.investmentService.SelectedRisks = null;
        this.investmentService.SelectedGroups = null;
        this.investmentService.SelectedRegions = null;
        this.router.navigateByUrl('/Investments');
    });
   }
}

