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
import { DetailedInvestmentsComponent } from './Views/Investment/detailed-investments';
import { LoginComponent } from './Views/Login/login.component';
import { AuthGuard } from './AuthGuardService';
import { SignupComponent } from './Views/signup/signup.component';
import { AssociateCustomEntitiesComponent } from './Views/Investment/associate-custom-entities';
import { NewCustomEntityComponent } from './Views/CustomEntity/new-custom-entity';
import { NewCustomEntityTypeComponent } from './Views/CustomEntityType/new-custom-entity-type';
import { ListCustomEntityTypesComponent } from './Views/CustomEntityType/list-custom-entity-types';
import { CustomEntityTypeComponent } from './Views/CustomEntityType/custom-entity-type-details';
import { ErrorComponent } from './Views/Shared/errors';

const appRoutes: Routes = [
    { path : '', redirectTo: 'Investments', pathMatch: 'full'},
    { path: 'error', component: ErrorComponent },
    { path : 'Login', component: LoginComponent },
    { path : 'Home', component: HomeComponent, canActivate: [AuthGuard] },
    { path : 'Investments', component: InvestmentComponent, canActivate: [AuthGuard]  },
    { path : 'DetailedInvestments', component: DetailedInvestmentsComponent, canActivate: [AuthGuard]  },
    { path : 'InvestmentDetails/:id', component: InvestmentDetailComponent, canActivate: [AuthGuard]  },
    { path : 'Factors', component: FactorComponent, canActivate: [AuthGuard]  },
    { path : 'FactorDetails/:id', component: FactorDetailsComponent, canActivate: [AuthGuard]  },
    { path : 'Groups', component: GroupComponent, canActivate: [AuthGuard]  },
    { path : 'GroupDetails/:id', component: GroupDetailsComponent, canActivate: [AuthGuard]  },
    { path : 'Risks', component: RiskComponent, canActivate: [AuthGuard]  },
    { path : 'RiskDetails/:id', component: RiskDetailsComponent, canActivate: [AuthGuard]  },
    { path : 'Regions', component: RegionComponent, canActivate: [AuthGuard]  },
    { path : 'RegionDetails/:id', component: RegionDetailsComponent, canActivate: [AuthGuard]  },
    { path : 'NewInvestment', component: NewInvestmentComponent, canActivate: [AuthGuard]  },
    { path : 'NewFactor', component: NewFactorComponent, canActivate: [AuthGuard]  },
    { path : 'NewGroup', component: NewGroupComponent, canActivate: [AuthGuard]  },
    { path : 'NewRegion', component: NewRegionComponent, canActivate: [AuthGuard]  },
    { path : 'NewRisk', component: NewRiskComponent, canActivate: [AuthGuard]  },
    { path : 'NewInvestmentWizard', component: NewInvestmentWizardComponent, canActivate: [AuthGuard],  children: [
           { path : 'NewInvestment', component: NewInvestmentComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectFactors', component: SelectFactorsComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectRisks', component: SelectRisksComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectGroups', component: SelectGroupsComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SelectRegions', component: SelectRegionsComponent, outlet: 'NewInvestmentWizardOutlet' },
           { path : 'SummaryOfNewInvestment', component: SummaryOfNewInvestmentComponent, outlet: 'NewInvestmentWizardOutlet' }
    ] },
    { path : 'AssociateFactors/:id', component: AssociateFactorsComponent, canActivate: [AuthGuard]  },
    { path : 'AssociateRisks/:id', component: AssociateRisksComponent, canActivate: [AuthGuard]  },
    { path : 'AssociateGroups/:id', component: AssociateGroupsComponent, canActivate: [AuthGuard]  },
    { path : 'AssociateRegions/:id', component: AssociateRegionsComponent, canActivate: [AuthGuard]  },
    { path : 'AssociateCustomEntities/:id', component: AssociateCustomEntitiesComponent, canActivate: [AuthGuard]  },
    { path : 'NewNote/:owningEntityType/:owningEntityId', component: NewInvestmentNoteComponent, canActivate: [AuthGuard]  },
    // tslint:disable-next-line:max-line-length
    { path : 'NewCustomEntity/:owningEntityType/:owningEntityId/:dataType', component: NewCustomEntityComponent, canActivate: [AuthGuard]  },
    { path : 'NewCustomEntityType', component: NewCustomEntityTypeComponent, canActivate: [AuthGuard]  },
    { path : 'CustomEntityTypes', component: ListCustomEntityTypesComponent, canActivate: [AuthGuard]  },
    { path : 'CustomEntityType/:id', component: CustomEntityTypeComponent, canActivate: [AuthGuard]  },
    { path : 'Signup', component: SignupComponent},
    { path: '**', component: ErrorComponent, data: { error: 404 } },
       /* { path : 'SelectItems', component: SelectItemsComponent, }, */
       /*{ path : 'RisksGraph', component: GraphComponent },*/
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRoutes);
