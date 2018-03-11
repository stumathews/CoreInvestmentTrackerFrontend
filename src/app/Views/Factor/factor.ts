import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { EntityTypes  } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.html'
})
export class FactorComponent implements OnInit {
  Factors: InvestmentInfluenceFactor[];
  constructor(private apiService: ApiService) { }

  errorMessage: string;
  ngOnInit(): void {
    this.apiService.GetFactors().subscribe(factors => this.Factors = factors,
                   error => this.errorMessage = <any>error);
  }
  public delete(id: string) {
    console.log('deleting id=' + id);
    this.apiService.DeleteEntity(EntityTypes.InvestmentInfluenceFactor, +id)
                    .finally(() => {
                      this.ngOnInit();
                    })
                   .subscribe(entity => console.log('Received: ' + JSON.stringify(entity)),
                              error => this.errorMessage = <any>error);
  }
}
