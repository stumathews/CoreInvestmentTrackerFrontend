import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { APP_ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './Views/App/app';
import { HomeComponent } from './Views/Home/home';
import { SideNavComponent } from './Views/Shared/side-nav';
import { InvestmentComponent } from './Views/Investment/investment';
import { FactorComponent } from './Views/Factor/factor';
import { GroupComponent } from './Views/Group/group';
import { RiskComponent } from './Views/Risk/risk';
import { RegionComponent } from './Views/Region/region';
import { InvestmentDetailComponent } from './Views/Investment/investment.detail';
import { ApiService } from './apiservice.service';
import { ListRiskComponent } from './Views/Shared/list-risks';
import { ListFactorsComponent } from './Views/Shared/list-factors';
import { ListInvestmentsComponent } from './Views/Shared/list-investments';
import { ListGroupsViaGroupLinksComponent } from './Views/Shared/list-groups-via-grouplinks';
import { ListRegionsComponent } from './Views/Shared/list-regions';
import { FactorDetailsComponent } from './Views/Factor/factor-details';
import { GroupDetailsComponent } from './Views/Group/group-details';
import { RegionDetailsComponent } from './Views/Region/region-details';
import { RiskDetailsComponent } from './Views/Risk/risk-details';
import { ReactiveFormsModule } from '@angular/forms';
import { NewInvestmentComponent } from './Views/Investment/new-investment';
import { NewFactorComponent } from './Views/Factor/new-factor';
import { NewGroupComponent } from './Views/Group/new-group';
import { NewRegionComponent } from './Views/Region/new-region';
import { NewRiskComponent } from './Views/Risk/new-risk';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { InvestmentService } from './investment.service';
import { SelectItemsComponent } from './Views/Investment/select-items';
import { SelectFactorsComponent } from './Views/Investment/select-factors';
import { SelectRisksComponent } from './Views/Investment/select-risks';
import { SelectGroupsComponent } from './Views/Investment/select-groups';
import { SelectRegionsComponent } from './Views/Investment/select-regions';
import { SummaryOfNewInvestmentComponent } from './Views/Investment/summary-of-new-investment';
import { NewInvestmentWizardComponent } from './Views/Investment/new-investment-wizard';
import { AssociateFactorsComponent } from './Views/Investment/associate-factors';
import { AssociateRisksComponent } from './Views/Investment/associate-risks';
import { AssociateGroupsComponent } from './Views/Investment/associate-groups';
import { AssociateRegionsComponent } from './Views/Investment/associate-regions';
import { GraphComponent } from './Graphs/graph/graph.component';
import { ListGroupsComponent } from './Views/Shared/list-groups';
import { ListNotesComponent } from './Views/Shared/list-notes';
import { NewInvestmentNoteComponent } from './Views/Note/new-note';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, SideNavComponent, InvestmentComponent,
    FactorComponent, GroupComponent, RiskComponent, RegionComponent, InvestmentDetailComponent,
    ListRiskComponent, ListFactorsComponent, ListGroupsViaGroupLinksComponent, ListRegionsComponent,
    FactorDetailsComponent, GroupDetailsComponent, RegionDetailsComponent, ListInvestmentsComponent,
    RiskDetailsComponent, NewInvestmentComponent, NewFactorComponent, NewGroupComponent,
    NewRegionComponent, NewRiskComponent, SelectItemsComponent, SelectFactorsComponent,
    NewInvestmentWizardComponent, SelectRisksComponent, SelectGroupsComponent, SelectRegionsComponent,
    SummaryOfNewInvestmentComponent, AssociateFactorsComponent, AssociateRisksComponent,
    AssociateGroupsComponent, AssociateRegionsComponent, GraphComponent, ListGroupsComponent,
    ListNotesComponent, NewInvestmentNoteComponent
  ],
  imports: [
    TabsModule.forRoot(),
    BrowserModule, APP_ROUTING, AlertModule.forRoot(), ModalModule.forRoot(), HttpModule, FormsModule, ReactiveFormsModule,
    InlineEditorModule, Angular2FontawesomeModule
  ],
  entryComponents: [
    ListGroupsComponent,
  ],
  providers: [ApiService, InvestmentService, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
