import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { BsModalService } from 'ngx-bootstrap';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';

@Component({
  selector: 'app-factor-details',
  templateUrl: './factor-details.html'
})
export class FactorDetailsComponent extends DetailComponentBase implements OnInit {
  EntityTypes = EntityTypes;
  Entity: InvestmentInfluenceFactor;
  Notes: InvestmentNote[] = [];
  constructor(protected apiService: ApiService,
    protected route: ActivatedRoute,
    protected location: Location,
    protected modalService: BsModalService,
    protected router: Router) {
    super(apiService, EntityTypes.InvestmentInfluenceFactor, route, location, modalService, router);
    this.MyType = EntityTypes.InvestmentInfluenceFactor;
  }
  errorMessage: string;
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetFactor(id).subscribe(factor => this.Entity = factor,
                   error => this.errorMessage = <any>error);
  }
  openModalWithNewNoteComponent() {
    this.modalRef = this.modalService.show(NewInvestmentNoteComponent);
    this.modalRef.content.OwningEntityId = this.Entity.id;
    this.modalRef.content.OwningEntityType = EntityTypes.InvestmentInfluenceFactor;
    this.modalRef.content.CreatedNote.subscribe((value) => {
      this.Notes.push(value);
      this.modalRef.hide();
    });
  }
}
