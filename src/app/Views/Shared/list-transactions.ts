
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, KeyValueDiffers, DoCheck } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentTransaction } from '../../Models/InvestmentTransaction';
import { TransactionsLink } from '../../Models/Investment';
import { HtmlAction } from '../../Models/HtmlAction';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityTypes, EntityUtilities } from '../../Utilities';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-list-transactionss',
  templateUrl: 'list-transactions.html'
})

export class ListTransactionsComponent extends EntityUtilities implements OnInit {
  @Input() Transactions: InvestmentTransaction[] = [];
  Title = 'Transactions';
  constructor(protected apiService: ApiService, private differs: KeyValueDiffers ) {
    super(apiService);
  }
  errorMessage: string;

  ngOnInit(): void { }

  public saveEditable(element, id: number) {
    const toRemove = this.Transactions.filter((each) => { if (each.id === id) { return each; } });
      const i = this.Transactions.indexOf(toRemove[0]);
    this.saveEditableWrapper(element, id, EntityTypes.InvestmentTransaction, this.Transactions[i]);
  }

  DeleteTransaction(entityId: number) {
    this.apiService.DeleteEntity(EntityTypes.InvestmentTransaction, entityId)
    .pipe(finalize(() => {
      const toRemove = this.Transactions.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.Transactions.indexOf(toRemove[0]);
      this.Transactions.splice(i, 1);
      this.ngOnInit();
    }))
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }
}
