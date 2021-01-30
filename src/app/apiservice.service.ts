
import {throwError as observableThrowError,  Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Investment } from './Models/Investment';
import { InvestmentInfluenceFactor } from './Models/InvestmentInfluenceFactor';
import { FactorComponent } from './Views/Factor/factor';
import { GroupComponent } from './Views/Group/group';
import { RiskComponent } from './Views/Risk/risk';
import { InvestmentGroup } from './Models/InvestmentGroup';
import { Region } from './Models/Region';
import { InvestmentRisk } from './Models/InvestmentRisk';
import { EntityTypes  } from './Utilities';
import { GraphData } from './Models/GraphData';
import { InvestmentNote } from './Models/InvestmentNote';
import { HttpClient } from '@angular/common/http';



import { environment } from '../environments/environment';
import { UserLoginInfo } from './Models/UserLoginInfo';
import { SignupDetails } from './Models/SignupDetails';
import { Activity } from './Models/Activity';
import { AuthService } from './AuthService';
import { CustomEntityType } from './Models/CustomEntityType';
import { CustomEntity } from './Models/CustomEntity';
import { InvestmentTransaction } from './Models/InvestmentTransaction';
import { catchError } from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class ApiService {

    private baseURL = environment.baseUrl + '/api';
    private InvestmentsUrlEndpoint = this.baseURL + '/Investment';
    private InvestmentsWithoutChildrenUrlEndpoint = this.InvestmentsUrlEndpoint + '/WithoutChildren';
    private FactorsUrlEndpoint = this.baseURL + '/Factor';
    private GroupsUrlEndpoint = this.baseURL + '/Group';
    private TransactionsUrlEndpoint = this.baseURL + '/Transaction';
    private RisksUrlEndpoint = this.baseURL + '/Risk';
    private RegionsUrlEndpoint = this.baseURL + '/Region';
    private NotesUrlEndpoint = this.baseURL + '/Notes';
    private NotesUrlByIdEndpoint = this.baseURL + '/Notes/{id}';
    private ActivitiesUrlEndpoint = this.baseURL + '/Activity';
    private InvestmentByIdUrlEndpoint = this.baseURL + '/Investment/{id}';
    private RiskByIdUrlEndpoint = this.baseURL + '/Risk/{id}';
    private FactorByIdUrlEndpoint = this.baseURL + '/Factor/{id}';
    private GroupByIdUrlEndpoint = this.baseURL + '/Group/{id}';
    private TransactionByIdUrlEndpoint = this.baseURL + '/Transaction/{id}';
    private RegionByIdUrlEndpoint = this.baseURL + '/Region/{id}';
    private TokenUrlEndpoint = this.baseURL + '/Token';
    private NotesByParamsUrlEndpoint = this.baseURL + '/Notes/{owningEntityId}/{owningEntityType}/{id}';
    private ActivitiesByParamsUrlEndpoint = this.baseURL + '/Activities/{owningEntityId}/{owningEntityType}/{id}';
    private SignupUrlEndpoint = this.baseURL + '/Signup';
    private CustomEntityEndpoint = this.baseURL + '/CustomEntity';
    private CustomEntityTypeEndpoint = this.baseURL + '/CustomEntityType';

    private OwningEntityNotesUrlEndpoint = this.NotesUrlEndpoint + '/{owningEntityID}/{owningEntityType}';
    private OwningEntityActivitiessUrlEndpoint = this.ActivitiesUrlEndpoint + '/{owningEntityID}/{owningEntityType}';

    private DissassociateGroupFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateGroup/{groupID}/{investmentID}';
    private DissassociateRegionFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateRegion/{regionID}/{investmentID}';
    private DissassociateFactorFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateFactor/{factorID}/{investmentID}';
    private DissassociateRiskFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateRisk/{riskID}/{investmentID}';
    private DissassociateCustomEntityFromInvestmentUrl = this.InvestmentsUrlEndpoint
    + '/DissassociateCustomEntity/{customEntityID}/{investmentID}';

    /* Body contains the list of entities */
    private AssociateGroupWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateGroups/{investmentID}';
    private AssociateRegionWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateRegions/{investmentID}';
    private AssociateFactorWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateFactors/{investmentID}';
    private AssociateRiskWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateRisks/{investmentID}';
    private AssociateCustomEntityWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateCustomEntities/{investmentID}';

    private InvestmentRisksGraphUrl = this.InvestmentsUrlEndpoint + '/RisksGraph/{id}';
    private InvestmentGroupsGraphUrl = this.InvestmentsUrlEndpoint + '/GroupsGraph/{id}';
    private InvestmentFactorsGraphUrl = this.InvestmentsUrlEndpoint + '/FactorsGraph/{id}';
    private InvestmentRegionsGraphUrl = this.InvestmentsUrlEndpoint + '/RegionsGraph/{id}';
    private InvestmentCustomEntitiesGraphUrl = this.InvestmentsUrlEndpoint + '/CustomEntitiesGraph/{id}';
    private GenerateSharedInvestmentsGraphDataForAllUrl = this.baseURL + '/{entityType}/GenerateSharedInvestmentsGraphDataForAll';
    private GenerateEntityInvestmentsGraphForForUrl = this.baseURL + '/{entityType}/GenerateEntityInvestmentsGraphFor/{id}';
    private GetTokenEndpointUrl = this.TokenUrlEndpoint;
    private GetSignupEndpointUrl = this.SignupUrlEndpoint;
    private GetCustomEntityTypesUrl = this.CustomEntityTypeEndpoint;
    private GetCustomEntitiesByTypeAndIdUrl = this.CustomEntityEndpoint + '/ByType/{type}/{id}';
    private GetAllCustomEntitiesByTypeUrl = this.CustomEntityEndpoint + '/ByType/{type}';
    private CustomEntitiesUrl = this.CustomEntityEndpoint + '/{id}';
    private CustomEntityTypeUrl = this.CustomEntityTypeEndpoint + '/{id}';
    private CustomEntityTypesByOwningEntity = this.CustomEntityTypeEndpoint + '/ByOwningId/{owningId}';

    constructor(private http: HttpClient) { }

    testBadRequest(): any {
        throw new Error('Method not implemented.');
      }

    Login(userLoginInfo: UserLoginInfo): Observable<any> {
        return this.http
        .post(this.GetTokenEndpointUrl, userLoginInfo);
    }

    Signup(signupDetails: SignupDetails): Observable<any> {
        console.log('API call signup...');
        return this.http
        .post(this.GetSignupEndpointUrl, signupDetails)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    ReplaceEntityTypeInUrl(type: EntityTypes, url: string): string {
        if ( type === EntityTypes.InvestmentGroup) {
            url = url.replace('{entityType}', 'Group');
        } else if (type === EntityTypes.InvestmentInfluenceFactor) {
            url = url.replace('{entityType}', 'Factor');
        } else if (type === EntityTypes.InvestmentRisk) {
            url = url.replace('{entityType}', 'Risk');
        } else if ( type === EntityTypes.Region) {
            url = url.replace('{entityType}', 'Region');
        } else if ( type === EntityTypes.CustomEntity) {
            url = url.replace('{entitytype', 'CustomEntity');
        }
        return url;
    }

    GetSharedInvestmentGraphData(type: EntityTypes): Observable<GraphData> {
        console.log('GetSharedInvestmentGraphData: Entity=' + EntityTypes[type]);
           let url = this.GenerateSharedInvestmentsGraphDataForAllUrl;

        url = this.ReplaceEntityTypeInUrl(type, url);
        console.log('GetSharedInvestmentGraphData: Url=' + url);
        return this.http.get(url);
    }

    GetSharedInvestmentGraphDataFor(type: EntityTypes, entityId: number): Observable<GraphData> {
        console.log('GetSharedInvestmentGraphData: Entity=' + EntityTypes[type]);
           let url = this.GenerateEntityInvestmentsGraphForForUrl;
               url = this.ReplaceEntityTypeInUrl(type, url);
               url = url.replace('{id}', entityId + '');

        url = this.ReplaceEntityTypeInUrl(type, url);
        console.log('GetSharedInvestmentGraphData: Url=' + url);
        return this.http.get(url);
    }



    GetInvestmentGraphData(type: EntityTypes , investmentID: number): Observable<GraphData> {
        console.log('Entity=' + EntityTypes[type] +
        ' investmentID=' + investmentID );
        let url;

        if ( type === EntityTypes.InvestmentGroup) {
            url = this.InvestmentGroupsGraphUrl;
        } else if (type === EntityTypes.InvestmentInfluenceFactor) {
            url = this.InvestmentFactorsGraphUrl;
        } else if (type === EntityTypes.InvestmentRisk) {
            url = this.InvestmentRisksGraphUrl;
        } else if ( type === EntityTypes.Region) {
            url = this.InvestmentRegionsGraphUrl;
        } else if ( type === EntityTypes.CustomEntity) {
            url = this.InvestmentCustomEntitiesGraphUrl;
        }

        url = url.replace('{id}', investmentID);
        console.log('Getting graph data for...' + EntityTypes[type]);
        return this.http.get(url);
    }

    GetInvestments(withChildren = true): Observable<Investment[]> {
        console.log('withChildren=' + withChildren);
        let endpoint: string;
        if (withChildren === true) {
            endpoint = this.InvestmentsUrlEndpoint;
        } else {
            endpoint = this.InvestmentsWithoutChildrenUrlEndpoint;
        }
        console.log('Getting investments...endpoint:' + endpoint);
        return this.http.get<Investment[]>(endpoint);
    }

    GetFactors(): Observable<InvestmentInfluenceFactor[]> {
        console.log('Getting factors...');
        return this.http.get<InvestmentInfluenceFactor[]>(this.FactorsUrlEndpoint);
    }

    GetGroups(): Observable<InvestmentGroup[]> {
        console.log('Getting groups...');
        return this.http.get<InvestmentGroup[]>(this.GroupsUrlEndpoint)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetRisks(): Observable<InvestmentRisk[]> {
        console.log('Getting risks...');
        return this.http.get<InvestmentRisk[]>(this.RisksUrlEndpoint)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetRegions(): Observable<Region[]> {
        console.log('Getting regions...');
        return this.http.get<Region[]>(this.RegionsUrlEndpoint)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetInvestment(id: number): Observable<Investment> {
        console.log('Getting investment id=' + id);
        return this.http.get<Investment>(this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetRisk(id: number): Observable<InvestmentRisk> {
        console.log('Getting Risk id=' + id);
        return this.http.get<InvestmentRisk>(this.RiskByIdUrlEndpoint.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetFactor(id: number): Observable<InvestmentInfluenceFactor> {
        console.log('Getting Risk id=' + id);
        return this.http.get<InvestmentInfluenceFactor>(this.FactorByIdUrlEndpoint.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetGroup(id: number): Observable<InvestmentGroup> {
        console.log('Getting Group id=' + id);
        return this.http.get<InvestmentGroup>(this.GroupByIdUrlEndpoint.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetTransaction(id: number): Observable<InvestmentTransaction> {
        console.log('Getting transaction id=' + id);
        return this.http.get<InvestmentTransaction>(this.TransactionByIdUrlEndpoint.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetNotes(OwningEntityType: EntityTypes, OwningEntityId: number): Observable<InvestmentNote[]> {
        console.log('Getting ' + OwningEntityType + 'notes...');
        return this.http.get<InvestmentNote[]>(this.OwningEntityNotesUrlEndpoint.replace('{owningEntityID}', '' + OwningEntityId)
        .replace('{owningEntityType}', EntityTypes[OwningEntityType]))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetActivities(OwningEntityType: EntityTypes, OwningEntityId: number): Observable<Activity[]> {
        console.log('Getting ' + OwningEntityType + 'activites...');
        return this.http.get<Activity[]>(this.OwningEntityActivitiessUrlEndpoint
            .replace('{owningEntityID}', '' + OwningEntityId)
            .replace('{owningEntityType}', EntityTypes[OwningEntityType]))
            .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetRegion(id: number): Observable<Region> {
        console.log('Getting Region id=' + id);
        return this.http.get<Region>(this.RegionByIdUrlEndpoint.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetCustomEntity(id: number): Observable<CustomEntity> {
        console.log('Getting Custom Entity id=' + id);
        return this.http.get<CustomEntity>(this.CustomEntitiesUrl.replace('{id}', '' + id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    AssociateEntityWithInvestment(entityType: EntityTypes, entityIDs: number[], investmentId: number): Observable<any> {
        console.log('Entity=' + EntityTypes[entityType] +
        ' AssociateEntityWithInvestment ids=' + entityIDs.join(',') +
        ' investmentID=' + investmentId );
        let url;
        if (entityType === EntityTypes.InvestmentInfluenceFactor) {
            url =  this.AssociateFactorWithInvestmentUrl;
        } else if (entityType === EntityTypes.InvestmentRisk) {
            url =  this.AssociateRiskWithInvestmentUrl;
        } else if (entityType === EntityTypes.InvestmentGroup) {
            url =  this.AssociateGroupWithInvestmentUrl;
        } else if (entityType === EntityTypes.Region) {
            url =  this.AssociateRegionWithInvestmentUrl;
        } else if (entityType === EntityTypes.CustomEntity) {
            url = this.AssociateCustomEntityWithInvestmentUrl;
        }

        console.log('url is ' + url);
        url = url.replace('{investmentID}', '' + investmentId);
        return this.http.post(url, entityIDs)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    DissassociateEntityFromInvestment(entityType: EntityTypes, entityID: number, investmentId: number): Observable<any> {
        console.log('Entity=' + EntityTypes[entityType] +
                    ' DissassociateEntityFromInvestment id=' + entityID +
                    ' investmentID=' + investmentId );
        let url;
        if (entityType === EntityTypes.InvestmentInfluenceFactor) {
            url =  this.DissassociateFactorFromInvestmentUrl.replace('{factorID}', '' + entityID);
        } else if (entityType === EntityTypes.InvestmentRisk) {
            url =  this.DissassociateRiskFromInvestmentUrl.replace('{riskID}', '' + entityID);
        } else if (entityType === EntityTypes.InvestmentGroup) {
            url =  this.DissassociateGroupFromInvestmentUrl.replace('{groupID}', '' + entityID);
        } else if (entityType === EntityTypes.Region) {
            url =  this.DissassociateRegionFromInvestmentUrl.replace('{regionID}', '' + entityID);
        } else if (entityType === EntityTypes.CustomEntity) {
            url = this.DissassociateCustomEntityFromInvestmentUrl.replace('{customEntityID}', '' + entityID);
        }
        url = url.replace('{investmentID}', '' + investmentId);
        console.log('url is ' + url);
        return this.http.post(url, {})
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }


    CreateInvestment(investment: Investment): Observable<Investment> {
        console.log('CreateInvestment...' + JSON.stringify(investment));
        return this.http.post<Investment>(this.InvestmentsUrlEndpoint, investment)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    CreateCustomEntity(customEntity: CustomEntity): Observable<CustomEntity> {
        console.log('CreateCustom...' + JSON.stringify(customEntity));
        return this.http.post<CustomEntity>(this.CustomEntityEndpoint, customEntity)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    CreateCustomEntityType(customEntityType: CustomEntityType): Observable<CustomEntityType> {
        console.log('CreateCustomType...' + JSON.stringify(customEntityType));
        return this.http.post<CustomEntityType>(this.CustomEntityTypeEndpoint, customEntityType)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    DeleteCustomEntityType(id: number): Observable<any> {
        const url = this.CustomEntityTypeUrl.replace('{id}', id + '');
        console.log('Delete entity TYPE via url:' + url);
        return this.http.delete(url)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }



    CreateInvestmentInfluenceFactor(factor: InvestmentInfluenceFactor): Observable<InvestmentInfluenceFactor> {
        console.log('CreateInvestmentInfluenceFactor...' + JSON.stringify(factor));
        return this.http.post<InvestmentInfluenceFactor>(this.FactorsUrlEndpoint, factor)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    CreateInvestmentTransaction(transaction: InvestmentTransaction): Observable<InvestmentTransaction> {
        console.log('CreateInvestmentTransaction...' + JSON.stringify(transaction));
        return this.http.post<InvestmentTransaction>(this.TransactionsUrlEndpoint, transaction)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }
    CreateInvestmentGroup(group: InvestmentGroup): Observable<InvestmentGroup> {
        console.log('CreateInvestmentGroup...' + JSON.stringify(group));
        return this.http.post<InvestmentGroup>(this.GroupsUrlEndpoint, group)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    CreateInvestmentRisk(risk: InvestmentRisk): Observable<InvestmentRisk> {
        console.log('CreateRisk...' + JSON.stringify(risk));
        return this.http.post<InvestmentRisk>(this.RisksUrlEndpoint, risk)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    CreateInvestmentNote(investmentNote: InvestmentNote): Observable<InvestmentNote> {
        console.log('Create Note...' + JSON.stringify(investmentNote));
        return this.http.post<InvestmentNote>(this.NotesUrlEndpoint, investmentNote)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    CreateRegion(region: Region): Observable<Region> {
        console.log('Create Region...' + JSON.stringify(region));
        return this.http.post<Region>(this.RegionsUrlEndpoint, region)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    DeleteEntity(entityType: EntityTypes, id: number): Observable<any>  {
        let url;

        if (entityType === EntityTypes.Investment) {
            url =  this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentInfluenceFactor) {
            url =  this.FactorByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentRisk) {
            url =  this.RiskByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentGroup) {
            url =  this.GroupByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.Region) {
            url =  this.RegionByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.CustomEntity) {
            url = this.CustomEntitiesUrl.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentTransaction) {
            url = this.TransactionByIdUrlEndpoint.replace('{id}', '' + id);
        }

        console.log('Delete entity via url:' + url);
        return this.http.delete(url)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }


    DeleteInvestmentNote(OwningEntityId: number, OwningEntityType: EntityTypes, id: number): Observable<any> {
        console.log(`OwningEntityId=${OwningEntityId}, OwningEntityType=${OwningEntityType}, id=${id}`);
            const url = this.NotesByParamsUrlEndpoint.replace('{owningEntityId}', '' + OwningEntityId)
                                                    .replace('{owningEntityType}', '' + EntityTypes[OwningEntityType])
                                                    .replace('{id}', '' + id);
            console.log('Delete entity via url:' + url);
            return this.http.delete(url)
            .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
        }

    UpdateEntity(entityType: EntityTypes, id: number, property: string, value: any): Observable<number> {
        const patchObj = [{
            'value': value,
            'path': '/' + property,
            'op': 'replace'
        }];
        let url;

        console.log('Patch for Entity ' + EntityTypes[entityType] + ' patch is : ' + JSON.stringify(patchObj));

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
          };
        if (entityType === EntityTypes.Investment) {
            url =  this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentInfluenceFactor) {
            url =  this.FactorByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentRisk) {
            url =  this.RiskByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentGroup) {
            url =  this.GroupByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.Region) {
            url =  this.RegionByIdUrlEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.CustomEntity) {
            url = this.CustomEntitiesUrl.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.Note) {
            url = this.NotesUrlByIdEndpoint.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.CustomEntityType) {
            url = this.CustomEntityTypeUrl.replace('{id}', '' + id);
        } else if (entityType === EntityTypes.InvestmentTransaction) {
            url = this.TransactionByIdUrlEndpoint.replace('{id}', '' + id);
        }

        console.log('url is ' + url);

        return this.http.patch<number>(url, patchObj, httpOptions)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetCustomEntitiesByType(type: string, owningEntityId: string): Observable<CustomEntity[]> {
        return this.http.get<CustomEntity[]>(this.GetCustomEntitiesByTypeAndIdUrl
            .replace('{type}', '' + type)
            .replace('{id}', owningEntityId))
            .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetCustomEntityType(id: string): Observable<CustomEntityType> {
    return this.http.get<CustomEntityType>(this.CustomEntityTypeUrl
        .replace('{id}', id))
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetCustomEntityTypesByOwner(owningId: string): Observable<CustomEntityType[]> {
        return this.http.get<CustomEntityType[]>(this.CustomEntityTypesByOwningEntity
            .replace('{owningId}', owningId))
            .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
        }

    GetAllCustomEntitiesByType(type: string): Observable<CustomEntity[]> {
        return this.http.get<CustomEntity[]>(this.GetAllCustomEntitiesByTypeUrl
            .replace('{type}', type))
            .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    GetCustomEntityTypes(): Observable<CustomEntityType[]> {
        console.log('Getting custom entity types...');
        return this.http.get<CustomEntityType[]>(this.GetCustomEntityTypesUrl)
        .pipe(tap((data => console.log('All: ' + JSON.stringify(data))), error => this.handleError));
    }

    private handleError(response: HttpErrorResponse) {
        throw observableThrowError(response);
    }
}
