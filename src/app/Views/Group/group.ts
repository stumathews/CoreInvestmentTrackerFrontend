import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/finally';
import { SharedGraphComponent } from '../../Graphs/graph/shared.graph.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.html'
})
export class GroupComponent implements OnInit {
  @Input() Groups: InvestmentGroup[];
  EntityTypes = EntityTypes;
  searchText: string;
  modalRef: BsModalRef;
  constructor(
    protected apiService: ApiService,
    protected modalService: BsModalService) {}

  errorMessage: string;
  ngOnInit(): void {
    this.apiService.GetGroups()
        .subscribe(groups => this.Groups = groups,
                   error => this.errorMessage = <any>error);
  }
  public delete(id: string) {
    console.log('deleting id=' + id);
    this.apiService.DeleteEntity(EntityTypes.InvestmentGroup, +id)
                   .finally(() => {
                     this.ngOnInit();
                   })
                   .subscribe(entity => console.log(JSON.stringify(entity)),
                    error => this.errorMessage = <any>error);
  }

  openShowRelationships() {
    const initialState = {
      InvestmentId: 0,
      EntityType: EntityTypes.InvestmentGroup
    };
    // <app-shared-graph [EntityType]="EntityTypes.InvestmentGroup" [InvestmentId]="0"></app-shared-graph>-->
    this.modalRef = this.modalService.show(SharedGraphComponent, {initialState});
    this.modalRef.content.InvestmentId = initialState.InvestmentId;
    this.modalRef.content.EntityType = initialState.EntityType;
    this.modalRef.hide();

  }
}
