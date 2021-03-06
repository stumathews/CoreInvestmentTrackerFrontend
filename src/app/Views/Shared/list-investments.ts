import { Component, Input, Output } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities } from '../../Utilities';

@Component({
  selector: 'app-list-investments',
  templateUrl: './list-investments.html'
})
export class ListInvestmentsComponent extends EntityUtilities {
  errorMessage: string;
  Investments: Investment[] = [];
  _Entity: any;
  @Input()
  set Entity(e: any) {
    this._Entity = e;
    this._Entity.investments.forEach((i, index) => {
      this.apiService.GetInvestment(+i.investmentID).subscribe( (investment) => {
        this.Investments.push(this.populateInvestmentFully(investment));
      },  error => this.errorMessage = <any>error);
    });
  }
  get Entity(): any {
    return this._Entity;
  }


  constructor(protected apiService: ApiService) {
    super(apiService);
  }
}
