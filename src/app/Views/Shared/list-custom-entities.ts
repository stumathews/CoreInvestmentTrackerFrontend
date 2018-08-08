import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment } from '../../Models/Investment';
import { EntityUtilities, EntityTypes } from '../../Utilities';
import { Activity } from '../../Models/Activity';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import 'rxjs/add/operator/finally';
import { CustomEntityType } from '../../Models/CustomEntityType';
import { CustomEntity } from '../../Models/CustomEntity';

@Component({
  selector: 'app-list-custom-entities',
  templateUrl: './list-custom-entities.html'
})
export class ListCustomEntitiesComponent  implements OnInit {
  errorMessage: string;
  Title = 'Custom entities';
  @Input() CustomEntities: CustomEntity[];
  @Input() private Id: string;
  @Input() Type: string;

  ngOnInit() {
    console.log('Getting entities by type: ' + this.Type );
    this.apiService.GetCustomEntitiesByType(this.Type , this.Id)
    .subscribe(entities => this.CustomEntities = entities , error => this.errorMessage = <any>error);
   }

  constructor(protected apiService: ApiService) { }

  DeleteCustomEntity(entityId: number) {
    const toRemove = this.CustomEntities.filter((each) => { if (each.id === entityId) { return each; } });
    this.apiService
    .DeleteEntity(EntityTypes.CustomEntity, entityId)
    .finally(() => {
      const i = this.CustomEntities.indexOf(toRemove[0]);
      this.CustomEntities.splice(i, 1);
      this.ngOnInit();
    })
    .subscribe( code => console.log('code was' + code) , error => this.errorMessage = error);
  }
}
