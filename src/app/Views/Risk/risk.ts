import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { EntityTypes  } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';

import 'rxjs/add/operator/finally';
import { SharedGraphModalPopup } from '../Shared/SharedGraphModalPopup';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.html'
})
export class RiskComponent extends SharedGraphModalPopup implements OnInit {
  EntityTypes = EntityTypes;
  Risks: InvestmentRisk[];
  searchText: string;
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private bsModalService: BsModalService) { super(bsModalService); }

  errorMessage: string;
  ngOnInit(): void {
    this.apiService.GetRisks()
        .subscribe(risks => this.Risks = risks,
                   error => this.errorMessage = <any>error);
  }

  public delete(id: string) {
    console.log('deleting id=' + id);
    this.apiService.DeleteEntity(EntityTypes.InvestmentRisk, +id)
                    .finally(() => {
                      this.ngOnInit();
                    })
                   .subscribe(entity => {
                      console.log('Received: ' + JSON.stringify(entity));
                      console.log('Attempting to redirect...');
                      this.router.navigate(['/Risks']);
                  },
                              error => this.errorMessage = <any>error);
  }
}
