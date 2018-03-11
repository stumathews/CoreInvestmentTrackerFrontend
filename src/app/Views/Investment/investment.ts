import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/investment';
import { InvestmentDetailComponent } from './investment.detail';
import { EntityTypes, InvestmentUtilities  } from '../../Utilities';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.html'
})
export class InvestmentComponent extends InvestmentUtilities implements OnInit {
  Investments: Investment[];
  errorMessage: string;

  constructor(protected apiService: ApiService) {
    super(apiService);
   }

  public delete(id: string) {
    console.log('deleting id=' + id);
    this.apiService.DeleteEntity(EntityTypes.Investment, +id)
                    .finally(() => {
                      const deleted = this.Investments.filter((i) => { if (i.id === +id) { return i; } });
                      const index = this.Investments.indexOf(deleted[0], 0);
                      this.Investments.splice(index, 1);
                    })
                   .subscribe(entity => console.log(JSON.stringify(entity)),
                              error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.apiService.GetInvestments().subscribe(investments => {
      this.Investments = investments;
      investments.forEach((investment, iindex) => { investment = this.populateInvestmentFully(investment); });
    }, error => this.errorMessage = <any>error);
  }
}
