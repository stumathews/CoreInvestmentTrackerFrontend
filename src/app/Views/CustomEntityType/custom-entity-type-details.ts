import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { BsModalService } from 'ngx-bootstrap';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { CustomEntityType } from '../../Models/CustomEntityType';
import { CustomEntity } from '../../Models/CustomEntity';

@Component({
  selector: 'app-custom-entity-type-details',
  templateUrl: './custom-entity-type-details.html'
})
export class CustomEntityTypeComponent extends DetailComponentBase implements OnInit  {
  Entity: CustomEntityType;
  CustomEntities: CustomEntity[] = [];
  Notes: InvestmentNote[] = [];
  constructor(protected apiService: ApiService,
     protected route: ActivatedRoute,
     protected location: Location,
     protected modalService: BsModalService,
     protected router: Router) {
    super(apiService, EntityTypes.CustomEntityType, route, location, modalService, router);
    this.MyType = EntityTypes.CustomEntityType;
  }

  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetCustomEntityType(id + '').subscribe((entity) => {
        this.Entity = entity;
        this.apiService.GetAllCustomEntitiesByType(this.Entity.name).subscribe((got) => this.CustomEntities = got);
     });
  }

  openModalWithNewNoteComponent() {
    this.modalRef = this.modalService.show(NewInvestmentNoteComponent);
    this.modalRef.content.OwningEntityId = this.Entity.id;
    this.modalRef.content.OwningEntityType = EntityTypes.CustomEntityType;
    this.modalRef.content.CreatedNote.subscribe((value) => {
      this.Notes.push(value);
      this.modalRef.hide();
    });
  }

}
