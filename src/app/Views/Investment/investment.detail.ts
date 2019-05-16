import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Investment, RisksLink, FactorsLink, GroupsLink, RegionsLink } from '../../Models/Investment';
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
import { Activity } from '../../Models/Activity';
import { CustomEntityType } from '../../Models/CustomEntityType';
import { AssociateCustomEntitiesComponent } from './associate-custom-entities';
import { CustomEntity } from '../../Models/CustomEntity';
import { NewCustomEntityComponent } from '../CustomEntity/new-custom-entity';
import { DbEntity } from '../../Models/DbEntity';
import { NewTransactionComponent } from '../Transaction/new-transaction';
import { InvestmentTransaction } from '../../Models/InvestmentTransaction';
import { Common } from '../../Common/Common';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment.detail.html',
  styleUrls: ['./investment.detail.css']
  })

export class InvestmentDetailComponent extends DetailComponentBase implements OnInit {
  EntityTypes = EntityTypes;
  Entity: Investment;
  Notes: InvestmentNote[] = [];
  Activities: Activity[] = [];
  CustomTypes: CustomEntityType[] = [];
  CustomEntities: CustomEntity[] = [];
  TotalCost = 0;
  errorMessage: string;
  showTabs = true;
  Common: Common = new Common();

  @ViewChild('childModal') childModal: ModalDirective;
  constructor(protected apiService: ApiService,
    protected route: ActivatedRoute,
    protected location: Location,
    protected modalService: BsModalService,
    protected router: Router) {
      super(apiService, EntityTypes.Investment, route, location, modalService, router);
   }

  ngOnInit(): void {

    // Get Investement Id
    const id = +this.route.snapshot.paramMap.get('id');

    // Fetch investment ojbect
    this.apiService.GetInvestment(id)
        .subscribe(investment => {
           this.Entity = investment, error => this.errorMessage = <any>error;
           this.TotalCost = this.Common.GetBookValueFromTransactions(this.Entity.transactions);
        });

    // Get All entity types in the system
    this.refreshCustomEntities(id, true);
  }

  switchView(): void {
    this.showTabs = !this.showTabs;
  }


  refreshCustomEntities(id: number, getTypes: boolean) {
    const tempTypes = this.CustomTypes;
    if (tempTypes.length > 0 || !getTypes) {
      this.updateEntities(id, tempTypes);
    } else {
      this.CustomTypes = [];
      this.apiService.GetCustomEntityTypes()
      .subscribe(types => {
        // For each entity type get this investment's custom entities
        this.CustomTypes = types;
        this.updateEntities(id, types);
      }, error => this.errorMessage = <any>error);
    }
  }

  updateEntities(id: number, types: CustomEntityType[]) {
    this.CustomEntities = [];
    types.forEach(type => {
      this.apiService.GetCustomEntitiesByType(type.name, id + '').subscribe(entities => {
          entities.forEach(entity => {
            // Add each entity to the investment's known custom entities
            this.CustomEntities.push(entity);
           } );
        } , error => this.errorMessage = <any>error);
    });
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

  openAppGraph(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.hide();
  }

  openModalWithAssociateCustomEntityComponent(type: string) {
    const initialState = {
      InvestmentId: this.Entity.id,
      CustomEntityType: type
    };
    // this.modalRef = this.modalService.show(AssociateCustomEntitiesComponent);
    this.modalRef = this.modalService.show(AssociateCustomEntitiesComponent, {initialState});
    this.modalRef.content.InvestmentId = this.Entity.id;
    this.modalRef.content.CustomEntityType = type;
    this.modalRef.content.AssociatedCustomEntityEvent.subscribe((entity: CustomEntity) => {
      this.CustomEntities.push(entity);
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

  openModalWithNewTransactionComponent() {
    this.modalRef = this.modalService.show(NewTransactionComponent);
    this.modalRef.content.Investment = this.Entity;
    this.modalRef.content.CreatedTransactionEvent.subscribe((value) => {
      console.log('transaction created event fired');
      this.Entity.transactions.push(value);
      this.TotalCost = this.Common.GetBookValueFromTransactions(this.Entity.transactions);
      this.modalRef.hide();
    });
  }

  openModalWithNewCustomEntityComponent(type: string, dataType: string) {
    this.modalRef = this.modalService.show(NewCustomEntityComponent);
    this.modalRef.content.OwningEntityId = this.Entity.id;
    this.modalRef.content.OwningEntityType = EntityTypes.Investment;
    this.modalRef.content.Type = type;
    this.modalRef.content.DataType = dataType;
    this.modalRef.content.CreatedCustomEntity.subscribe((value) => {
      this.CustomEntities.push(value);
      this.modalRef.hide();
    });

  }

  myHandleError(event) {
    console.log(event);
  }
}
