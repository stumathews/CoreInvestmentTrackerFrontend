import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities, EntityTypes } from '../../Utilities';
import { Activity } from '../../Models/Activity';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import 'rxjs/add/operator/finally';
import { CustomEntityType } from '../../Models/CustomEntityType';

@Component({
  selector: 'app-list-custom-entities',
  templateUrl: './list-custom-entities.html'
})
export class ListCustomEntitiesComponent  implements OnInit {
  errorMessage: string;
  Title = 'Custom entities';
  CustomEntities: CustomEntityType[];
  private _type: string;
  @Input() private Id: string;

  @Input()
  set Type(type: string) {
    this.apiService.GetCustomEntitiesByType(type, this.Id)
    .subscribe(entities => this.CustomEntities = entities, error => this.errorMessage = <any>error);
    this._type = type;
  }
  get Type(): string {
    return this._type;
  }

  ngOnInit() { }

  constructor(protected apiService: ApiService) { }
}
