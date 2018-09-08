import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { EntityTypes } from '../../Utilities';
import 'rxjs/add/operator/finally';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedGraphModalPopup } from '../Shared/SharedGraphModalPopup';



@Component({
  selector: 'app-group',
  templateUrl: './group.html'
})
export class GroupComponent extends SharedGraphModalPopup implements OnInit {
  @Input() Groups: InvestmentGroup[];
  EntityTypes = EntityTypes;
  searchText: string;
  errorMessage: string;

  constructor( protected apiService: ApiService,  protected modalService: BsModalService) { super(modalService); }

  ngOnInit(): void {
    this.apiService.GetGroups()
        .subscribe(groups => this.Groups = groups, error => this.errorMessage = <any>error);
  }

  public delete(id: string) {
    this.apiService.DeleteEntity(EntityTypes.InvestmentGroup, +id)
                   .finally(() => this.ngOnInit())
                   .subscribe(entity => console.log(JSON.stringify(entity)), error => this.errorMessage = <any>error);
  }

  // openShowRelationships(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  //   this.modalRef.hide();
  // }
}
