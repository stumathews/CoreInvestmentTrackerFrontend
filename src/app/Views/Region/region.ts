import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Region } from '../../Models/Region';
import { EntityTypes, EntityUtilities  } from '../../Utilities';


import { SharedGraphModalPopup } from '../Shared/SharedGraphModalPopup';
import { BsModalService } from 'ngx-bootstrap';
import { NewRegionComponent } from './new-region';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-region',
  templateUrl: './region.html'
})
export class RegionComponent extends SharedGraphModalPopup implements OnInit {
  EntityTypes = EntityTypes;
  Regions: Region[];
  searchText: string;
  constructor(protected apiService: ApiService, protected bsModalService: BsModalService) { super(bsModalService); }

  errorMessage: string;
  ngOnInit(): void {
    this.apiService.GetRegions()
        .subscribe(regions => this.Regions = regions,
                   error => this.errorMessage = <any>error);
  }

  public delete(id: string) {
    this.apiService.DeleteEntity(EntityTypes.Region, +id)
                    .pipe(finalize(() => this.ngOnInit()))
                   .subscribe(entity => console.log(JSON.stringify(entity)), error => this.errorMessage = <any>error);
  }

  openModalWithNewRegionComponent() {
    this.modalRef = this.modalService.show(NewRegionComponent);
    this.modalRef.content.CreatedRegionEvent.subscribe((value) => {
      this.Regions.push(value);
      this.modalRef.hide();
    });
  }
}
