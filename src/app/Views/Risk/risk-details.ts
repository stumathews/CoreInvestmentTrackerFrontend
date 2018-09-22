import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { BsModalService } from 'ngx-bootstrap';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';

@Component({
  selector: 'app-risk-details',
  templateUrl: './risk-details.html'
})
export class RiskDetailsComponent extends DetailComponentBase implements OnInit {
  Entity: InvestmentRisk;
  Notes: InvestmentNote[] = [];
  constructor(protected apiService: ApiService,
    protected route: ActivatedRoute,
    protected location: Location,
    protected modalService: BsModalService,
    protected router: Router) {
    super(apiService, EntityTypes.InvestmentRisk, route, location, modalService, router);
    this.MyType = EntityTypes.InvestmentRisk;
   }

  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetRisk(id).subscribe(risk => this.Entity = risk,
                   error => this.errorMessage = <any>error);
  }
  openModalWithNewNoteComponent() {
    this.modalRef = this.modalService.show(NewInvestmentNoteComponent);
    this.modalRef.content.OwningEntityId = this.Entity.id;
    this.modalRef.content.OwningEntityType = EntityTypes.InvestmentRisk;
    this.modalRef.content.CreatedNote.subscribe((value) => {
      this.Notes.push(value);
      this.modalRef.hide();
    });
  }
}
