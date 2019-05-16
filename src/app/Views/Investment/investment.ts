import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityTypes, EntityUtilities  } from '../../Utilities';

import 'rxjs/add/operator/finally';
import { Common } from '../../Common/Common';
import { textBinding } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.html'
})
export class InvestmentComponent extends EntityUtilities implements OnInit {
  Investments: Investment[];
  errorMessage: string;
  p: number;
  Common: Common = new Common();
  constructor(protected apiService: ApiService) {
    super(apiService);
    this.p = 0;
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
    console.log('not getting investment children');
    this.apiService.GetInvestments(false).subscribe(investments => {
      this.Investments = investments;
      // this is a unpopulated investment meant to be lean and quick in terms of wmount of data it contains
    }, error => this.errorMessage = <any>error);
  }
}
