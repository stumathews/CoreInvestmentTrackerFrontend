import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities, EntityTypes } from '../../Utilities';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import 'rxjs/add/operator/finally';
import { CustomEntityType } from '../../Models/CustomEntityType';

@Component({
  selector: 'app-list-custom-entity-types',
  templateUrl: './list-custom-entity-types.html'
})
export class ListCustomEntityTypesComponent extends EntityUtilities implements OnInit {
  modalRef: BsModalRef;
  EntityTypes = EntityTypes;
  errorMessage: string;
  Title = 'Create new Custom Entity Type';
  CustomEntityTypes: CustomEntityType[] = [];

  ngOnInit() {
    this.apiService.GetCustomEntityTypes().subscribe( (types) => this.CustomEntityTypes = types);
  }

  constructor(protected apiService: ApiService,
              private modalService: BsModalService) { super(apiService); }

  DeleteNote(entityId: number) { }
}
