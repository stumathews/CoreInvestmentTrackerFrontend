import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { EntityTypes  } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.html'
})
export class RiskComponent implements OnInit {
  Risks: InvestmentRisk[];
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

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
