import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { BsModalService } from 'ngx-bootstrap';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { NewGroupComponent } from './new-group';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.html'
})
export class GroupDetailsComponent extends DetailComponentBase implements OnInit  {
  Entity: InvestmentGroup;
  Notes: InvestmentNote[] = [];
  constructor(protected apiService: ApiService,
     protected route: ActivatedRoute,
     protected location: Location,
     protected modalService: BsModalService,
     protected router: Router) {
    super(apiService, EntityTypes.InvestmentGroup, route, location, modalService, router);
    this.MyType = EntityTypes.InvestmentGroup;
  }

  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetGroup(id).subscribe(group => this.Entity = group,
                   error => this.errorMessage = <any>error);
  }

  func() {
    // {x, y}
    this.Entity.investments.map( (i) => [i.investmentID])
  }

  openModalWithNewNoteComponent() {
    this.modalRef = this.modalService.show(NewInvestmentNoteComponent);
    this.modalRef.content.OwningEntityId = this.Entity.id;
    this.modalRef.content.OwningEntityType = EntityTypes.InvestmentGroup;
    this.modalRef.content.CreatedNote.subscribe((value) => {
      this.Notes.push(value);
      this.modalRef.hide();
    });
  }

}
