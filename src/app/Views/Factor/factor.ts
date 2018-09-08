import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { EntityTypes  } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';

import 'rxjs/add/operator/finally';
import { SharedGraphModalPopup } from '../Shared/SharedGraphModalPopup';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.html'
})
export class FactorComponent extends SharedGraphModalPopup implements OnInit {
  Factors: InvestmentInfluenceFactor[];
  constructor(private apiService: ApiService, private bsModalService: BsModalService) { super(bsModalService); }
  EntityTypes = EntityTypes;
  errorMessage: string;
  searchText: string;
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
