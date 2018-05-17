import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities, EntityTypes } from '../../Utilities';
import { Activity } from '../../Models/Activity';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.html'
})
export class ListActivitiesComponent extends EntityUtilities implements OnInit {
  modalRef: BsModalRef;
  EntityTypes = EntityTypes;
  errorMessage: string;
  Title = 'Activities';
  @Input() Activities: Activity[];
  private _OwningEntityType: EntityTypes;
  @Input() OwningEntityId: number;
  @Input()
  set OwningEntityType(OwningEntityType: EntityTypes) {
      this._OwningEntityType = OwningEntityType;
      this.apiService.GetActivities(OwningEntityType, this.OwningEntityId).subscribe( (a) => {
        a.forEach(act => {
            this.Activities.push(act);
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
}
