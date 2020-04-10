import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { EntityTypes  } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';


import { SharedGraphModalPopup } from '../Shared/SharedGraphModalPopup';
import { BsModalService } from 'ngx-bootstrap';
import { NewFactorComponent } from './new-factor';
import { finalize } from 'rxjs/operators';

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
                    .pipe(finalize( () => this.ngOnInit()))
                   .subscribe(entity => console.log('Received: ' + JSON.stringify(entity)),
                              error => this.errorMessage = <any>error);
  }
  openModalWithNewFactorComponent() {
    this.modalRef = this.modalService.show(NewFactorComponent);
    this.modalRef.content.FactorCreatedEvent.subscribe((value) => {
      this.Factors.push(value);
      this.modalRef.hide();
    });
  }
}
