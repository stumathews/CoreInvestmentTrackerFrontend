import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment, RisksLink, FactorsLink, GroupsLink, RegionsLink } from '../../Models/investment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EntityTypes, DetailComponentBase } from '../../Utilities';
import { BsModalService, ModalDirective  } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TabsModule } from 'ngx-bootstrap';

import { AssociateRisksComponent } from './associate-risks';
import { InvestmentRisk } from '../../Models/InvestmentRisk';
import { InvestmentNote } from '../../Models/InvestmentNote';
import { NewInvestmentNoteComponent } from '../Note/new-note';
import { InvestmentInfluenceFactor } from '../../Models/InvestmentInfluenceFactor';
import { AssociateFactorsComponent } from './associate-factors';
import { AssociateGroupsComponent } from './associate-groups';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { AssociateRegionsComponent } from './associate-regions';
import { Region } from '../../Models/Region';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment.detail.html',
  })

export class InvestmentDetailComponent extends DetailComponentBase implements OnInit {
  EntityTypes = EntityTypes;
  Entity: Investment;
  Notes: InvestmentNote[] = [];
  errorMessage: string;
  modalRef: BsModalRef;
  @ViewChild('childModal') childModal: ModalDirective;
  constructor(protected apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
    private router: Router) {
    super(apiService);
    this.MyType = EntityTypes.Investment;
   }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap .get('id');
    this.apiService.GetInvestment(id)
        .subscribe(investment => this.Entity = investment, error => this.errorMessage = <any>error);
  }

  openModalWithAssociateRisksComponent() {
    this.modalRef = this.modalService.show(AssociateRisksComponent);
    this.modalRef.content.InvestmentId = this.Entity.id;
    this.modalRef.content.AssociatedRiskEvent.subscribe((risk: InvestmentRisk) => {
      console.log('event recieved:' + JSON.stringify(risk));
      const link: RisksLink = {investmentRisk: null, investmentID: this.Entity.id, investmentRiskID: risk.id};
      this.Entity.risks.push(link);
      this.modalRef.hide();
    });
  }

  openModalWithAssociateFactorsComponent() {
    this.modalRef = this.modalService.show(AssociateFactorsComponent);
    this.modalRef.content.InvestmentId = this.Entity.id;
    this.modalRef.content.AssociatedFactorEvent.subscribe((factor: InvestmentInfluenceFactor) => {
      console.log('event recieved:' + JSON.stringify(factor));
      const link: FactorsLink = {investmentInfluenceFactor: null, investmentID: this.Entity.id, investmentInfluenceFactorID: factor.id};
      this.Entity.factors.push(link);
      this.modalRef.hide();
    });
  }

  openModalWithAssociateGroupsComponent() {
    this.modalRef = this.modalService.show(AssociateGroupsComponent);
    this.modalRef.content.InvestmentId = this.Entity.id;
    this.modalRef.content.AssociatedGroupEvent.subscribe((group: InvestmentGroup) => {
      console.log('event recieved:' + JSON.stringify(group));
      const link: GroupsLink = {investmentGroup: null, investmentID: this.Entity.id, investmentGroupID: group.id};
      this.Entity.groups.push(link);
      this.modalRef.hide();
    });
  }

  openModalWithAssociateRegionsComponent() {
    this.modalRef = this.modalService.show(AssociateRegionsComponent);
    this.modalRef.content.InvestmentId = this.Entity.id;
    this.modalRef.content.AssociatedRegionEvent.subscribe((region: Region) => {
      console.log('event recieved:' + JSON.stringify(region));
      const link: RegionsLink = {region: null, investmentID: this.Entity.id, regionID: region.id};
      this.Entity.regions.push(link);
      this.modalRef.hide();
    });
  }

  openModalWithNewNoteComponent() {
    this.modalRef = this.modalService.show(NewInvestmentNoteComponent);
    this.modalRef.content.OwningEntityId = this.Entity.id;
    this.modalRef.content.OwningEntityType = EntityTypes.Investment;
    this.modalRef.content.CreatedNote.subscribe((value) => {
      this.Notes.push(value);
      this.modalRef.hide();
    });
  }
}
