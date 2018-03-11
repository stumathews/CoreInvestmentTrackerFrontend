
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { GroupsLink } from '../../Models/Investment';
import { HtmlAction } from '../../Models/HtmlAction';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityTypes } from '../../Utilities';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NewGroupComponent } from '../Group/new-group';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.html'
})

export class ListGroupsComponent implements OnInit {
  private _parentGroup: InvestmentGroup | null;
  errorMessage: string;
  modalRef: BsModalRef;
  @Input() Groups: InvestmentGroup[] = [];
  @Input() Title: string;
  @Input() set ParentGroup(parentGroup: InvestmentGroup | null) {
    this._parentGroup = parentGroup;
    console.log('ListGroupsComponent: ParentGroup set to ' + this._parentGroup.name);
  }
  get ParentGroup(): InvestmentGroup {
    return this._parentGroup;
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.Title = 'Groups';
   }
}
