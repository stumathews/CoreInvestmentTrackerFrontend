import { Component, Input, Output, OnInit, } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities, EntityTypes } from '../../Utilities';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



import { DbEntity } from '../../Models/DbEntity';
import { ListCustomEntitiesComponent } from './list-custom-entities';
import { CustomEntity } from '../../Models/CustomEntity';

@Component({
  selector: 'app-list-pinned',
  templateUrl: './list-pinned-items.html'
})
export class ListPinnedEntitiesComponent extends ListCustomEntitiesComponent implements OnInit {
  modalRef: BsModalRef;
  EntityTypes = EntityTypes;
  errorMessage: string;
  Title = 'Pinned Items';

  @Input() set PinnedItems(items: CustomEntity[])
  {
    this.CustomEntities = items;
  }

  get PinnedItems(): CustomEntity[]
  {
    return this.CustomEntities.filter((item: DbEntity) => item.isFlagged);
  }

  ngOnInit() {
    console.log('list-notes init()');
  }

  constructor(protected apiService: ApiService,
              private modalService: BsModalService) {
    super(apiService);
  }
}
