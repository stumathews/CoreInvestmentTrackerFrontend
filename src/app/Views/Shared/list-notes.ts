import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/investment';
import { InvestmentUtilities, EntityTypes } from '../../Utilities';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.html'
})
export class ListNotesComponent extends InvestmentUtilities implements OnInit {
  modalRef: BsModalRef;
  EntityTypes = EntityTypes;
  errorMessage: string;
  Title = 'Investment Notes';
  @Input() Notes: InvestmentNote[];
  private _OwningEntityType: EntityTypes;
  @Input() OwningEntityId: number;
  @Input()
  set OwningEntityType(OwningEntityType: EntityTypes) {
      this._OwningEntityType = OwningEntityType;
      this.apiService.GetNotes(OwningEntityType, this.OwningEntityId).subscribe( (notes) => {
          console.log('got some notres!');
        notes.forEach(note => {
            this.Notes.push(note);
           console.log('note is' + note.name);
        });
      },  error => this.errorMessage = <any>error);
  }
  get OwningEntityType(): EntityTypes {
    return this._OwningEntityType;
  }

  ngOnInit() {

  }

  constructor(protected apiService: ApiService,
              private modalService: BsModalService) {
    super(apiService);
  }

  DeleteNote(entityId: number) {
    this.apiService
    .DeleteInvestmentNote(this.OwningEntityId, this.OwningEntityType, entityId)
    .finally(() => {
      const toRemove = this.Notes.filter((each) => { if (each.id === entityId) { return each; } });
      const i = this.Notes.indexOf(toRemove[0]);
      this.Notes.splice(i, 1);
      this.ngOnInit();
    })
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }
}
