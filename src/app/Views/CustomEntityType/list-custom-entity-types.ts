import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities, EntityTypes } from '../../Utilities';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { CustomEntityType } from '../../Models/CustomEntityType';
import { NewCustomEntityTypeComponent } from './new-custom-entity-type';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-custom-entity-types',
  templateUrl: './list-custom-entity-types.html'
})
export class ListCustomEntityTypesComponent extends EntityUtilities implements OnInit {
  modalRef: BsModalRef;
  EntityTypes = EntityTypes;
  errorMessage: string;
  Title = 'Custom Entities';
  CustomEntityTypes: CustomEntityType[] = [];

  ngOnInit() {
    this.apiService.GetCustomEntityTypes().subscribe( (types) => this.CustomEntityTypes = types);
  }

  constructor(protected apiService: ApiService,
              private modalService: BsModalService) { super(apiService); }

  DeleteType(entityId: number) {
    this.apiService.DeleteCustomEntityType(entityId)
    .pipe(finalize(() => {
      const toRemove = this.CustomEntityTypes.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.CustomEntityTypes.indexOf(toRemove[0]);
      this.CustomEntityTypes.splice(i, 1);
      this.ngOnInit();
    }))
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);

   }

   openModalWithNewEntityTypeComponent() {
    this.modalRef = this.modalService.show(NewCustomEntityTypeComponent);
    this.modalRef.content.CreatedCustomEntityTypeEvent.subscribe((value) => {
      this.CustomEntityTypes.push(value);
      this.modalRef.hide();
    });
  }
}
