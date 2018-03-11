import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithComponentFactories } from '@angular/core/src/linker/compiler';

import { HomeComponent } from './Views/Home/home';
import { InvestmentComponent } from './Views/Investment/investment';
import { InvestmentDetailComponent } from './Views/Investment/investment.detail';
import { FactorComponent } from './Views/Factor/factor';
import { GroupComponent } from './Views/Group/group';
import { RiskComponent } from './Views/Risk/risk';
import { RegionComponent } from './Views/Region/region';
import { FactorDetailsComponent } from './Views/Factor/factor-details';
import { GroupDetailsComponent } from './Views/Group/group-details';
import { RegionDetailsComponent } from './Views/Region/region-details';
import { RiskDetailsComponent } from './Views/Risk/risk-details';
import { NewInvestmentComponent } from './Views/Investment/new-investment';
import { NewFactorComponent } from './Views/Factor/new-factor';
import { NewGroupComponent } from './Views/Group/new-group';
import { NewRegionComponent } from './Views/Region/new-region';
import { NewRiskComponent } from './Views/Risk/new-risk';
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
import { NewInvestmentNoteComponent } from './Views/Note/new-note';

const appRoutes: Routes = [
    { path : '', redirectTo: 'Home', pathMatch: 'full'},
    { path : 'Home', component: HomeComponent },
    { path : 'Investments', component: InvestmentComponent },
    { path : 'InvestmentDetails/:id', component: InvestmentDetailComponent },
    { path : 'Factors', component: FactorComponent },
    { path : 'FactorDetails/:id', component: FactorDetailsComponent },
    { path : 'Groups', component: GroupComponent },
    { path : 'GroupDetails/:id', component: GroupDetailsComponent },
    { path : 'Risks', component: RiskComponent },
    { path : 'RiskDetails/:id', component: RiskDetailsComponent },
    { path : 'Regions', component: RegionComponent },
    { path : 'RegionDetails/:id', component: RegionDetailsComponent },
    { path : 'NewInvestment', component: NewInvestmentComponent },
    { path : 'NewFactor', component: NewFactorComponent },
    { path : 'NewGroup', component: NewGroupComponent },
    { path : 'NewRegion', component: NewRegionComponent },
    { path : 'NewRisk', component: NewRiskComponent },
   /* { path : 'SelectItems', component: SelectItemsComponent, }, */
    { path : 'NewInvestmentWizard', component: NewInvestmentWizardComponent,  children: [
           { path : 'NewInvestment', component: NewInvestmentComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectFactors', component: SelectFactorsComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectRisks', component: SelectRisksComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectGroups', component: SelectGroupsComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectRegions', component: SelectRegionsComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SummaryOfNewInvestment', component: SummaryOfNewInvestmentComponent, outlet: 'NewInvestmentWizardOutlet' }
    ] },
    { path : 'AssociateFactors/:id', component: AssociateFactorsComponent },
    { path : 'AssociateRisks/:id', component: AssociateRisksComponent },
    { path : 'AssociateGroups/:id', component: AssociateGroupsComponent },
    { path : 'AssociateRegions/:id', component: AssociateRegionsComponent },
    { path : 'RisksGraph', component: GraphComponent },
    { path : 'NewNote/:owningEntityType/:owningEntityId', component: NewInvestmentNoteComponent }
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRoutes);
