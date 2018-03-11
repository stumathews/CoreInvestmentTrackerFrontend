import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Investment } from './Models/investment';
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



@Injectable()
export class ApiService {

    private baseURL = 'http://localhost:5000/api';
    private InvestmentsUrlEndpoint = this.baseURL + '/Investment';
    private FactorsUrlEndpoint = this.baseURL + '/Factor';
    private GroupsUrlEndpoint = this.baseURL + '/Group';
    private RisksUrlEndpoint = this.baseURL + '/Risk';
    private RegionsUrlEndpoint = this.baseURL + '/Region';
    private NotesUrlEndpoint = this.baseURL + '/Notes';
    private InvestmentByIdUrlEndpoint = this.baseURL + '/Investment/{id}';
    private RiskByIdUrlEndpoint = this.baseURL + '/Risk/{id}';
    private FactorByIdUrlEndpoint = this.baseURL + '/Factor/{id}';
    private GroupByIdUrlEndpoint = this.baseURL + '/Group/{id}';
    private RegionByIdUrlEndpoint = this.baseURL + '/Region/{id}';
    private NotesByParamsUrlEndpoint = this.baseURL + '/Notes/{owningEntityId}/{owningEntityType}/{id}';

    private OwningEntityNotesUrlEndpoint = this.NotesUrlEndpoint + '/{owningEntityID}/{owningEntityType}';

    private DissassociateGroupFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateGroup/{groupID}/{investmentID}';
    private DissassociateRegionFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateRegion/{regionID}/{investmentID}';
    private DissassociateFactorFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateFactor/{factorID}/{investmentID}';
    private DissassociateRiskFromInvestmentUrl = this.InvestmentsUrlEndpoint + '/DissassociateRisk/{riskID}/{investmentID}';

    /* Body contains the list of entities */
    private AssociateGroupWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateGroups/{investmentID}';
    private AssociateRegionWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateRegions/{investmentID}';
    private AssociateFactorWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateFactors/{investmentID}';
    private AssociateRiskWithInvestmentUrl = this.InvestmentsUrlEndpoint + '/AssociateRisks/{investmentID}';

    private InvestmentRisksGraphUrl = this.InvestmentsUrlEndpoint + '/RisksGraph/{id}';
    private InvestmentGroupsGraphUrl = this.InvestmentsUrlEndpoint + '/GroupsGraph/{id}';
    private InvestmentFactorsGraphUrl = this.InvestmentsUrlEndpoint + '/FactorsGraph/{id}';
    private InvestmentRegionsGraphUrl = this.InvestmentsUrlEndpoint + '/RegionsGraph/{id}';
    constructor(private http: Http) { }

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
        }

        url = url.replace('{id}', investmentID);
        console.log('Getting graph data for...' + EntityTypes[type]);
        return this.http.get(url)
                        .map((response: Response) => <GraphData[]>response.json())
                        .do((data => console.log('All: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetInvestments(): Observable<Investment[]> {
        console.log('Getting investments...');
        return this.http.get(this.InvestmentsUrlEndpoint)
                        .map((response: Response) => <Investment[]>response.json())
                        .do((data => console.log('All: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetFactors(): Observable<InvestmentInfluenceFactor[]> {
        console.log('Getting factors...');
        return this.http.get(this.FactorsUrlEndpoint)
                        .map((response: Response) => <InvestmentInfluenceFactor[]>response.json())
                        .do((data => console.log('All: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetGroups(): Observable<InvestmentGroup[]> {
        console.log('Getting groups...');
        return this.http.get(this.GroupsUrlEndpoint)
                        .map((response: Response) => <InvestmentGroup[]>response.json())
                        .do((data => console.log('All: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetRisks(): Observable<InvestmentRisk[]> {
        console.log('Getting risks...');
        return this.http.get(this.RisksUrlEndpoint)
                        .map((response: Response) => <InvestmentRisk[]>response.json())
                        .do((data => console.log('All: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetRegions(): Observable<Region[]> {
        console.log('Getting regions...');
        return this.http.get(this.RegionsUrlEndpoint)
                        .map((response: Response) => <Region[]>response.json())
                        .do((data => console.log('All: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetInvestment(id: number): Observable<Investment> {
        console.log('Getting investment id=' + id);
        return this.http.get(this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id))
                        .map((response: Response) => <Investment>response.json())
                        .do((data => console.log('GetInvestment: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetRisk(id: number): Observable<InvestmentRisk> {
        console.log('Getting Risk id=' + id);
        return this.http.get(this.RiskByIdUrlEndpoint.replace('{id}', '' + id))
                        .map((response: Response) => <InvestmentRisk>response.json())
                        .do((data => console.log('GetRisk: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetFactor(id: number): Observable<InvestmentInfluenceFactor> {
        console.log('Getting Risk id=' + id);
        return this.http.get(this.FactorByIdUrlEndpoint.replace('{id}', '' + id))
                        .map((response: Response) => <InvestmentInfluenceFactor>response.json())
                        .do((data => console.log('GetRisk: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetGroup(id: number): Observable<InvestmentGroup> {
        console.log('Getting Group id=' + id);
        return this.http.get(this.GroupByIdUrlEndpoint.replace('{id}', '' + id))
                        .map((response: Response) => <InvestmentGroup>response.json())
                        .do((data => console.log('GetGroup: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    GetNotes(OwningEntityType: EntityTypes, OwningEntityId: number): Observable<InvestmentNote[]> {
        console.log('Getting ' + OwningEntityType + 'notes...');
        return this.http.get(this.OwningEntityNotesUrlEndpoint.replace('{owningEntityID}', '' + OwningEntityId)
                                                               .replace('{owningEntityType}', EntityTypes[OwningEntityType]))
        .map((response: Response) => <InvestmentNote[]>response.json())
        .do((data => console.log('Got Note:' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    GetRegion(id: number): Observable<Region> {
        console.log('Getting Region id=' + id);
        return this.http.get(this.RegionByIdUrlEndpoint.replace('{id}', '' + id))
                        .map((response: Response) => <Region>response.json())
                        .do((data => console.log('GetRisk: ' + JSON.stringify(data))))
                        .catch(this.handleError);
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
        }

        console.log('url is ' + url);
        url = url.replace('{investmentID}', '' + investmentId);
        return this.http.post(url, entityIDs)
        .map((response: Response) => <any|null>response.json())
        .do((data => console.log('AssociateEntityFromInvestment: ' + JSON.stringify(data))))
        .catch(this.handleError);
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
        }
        url = url.replace('{investmentID}', '' + investmentId);
        console.log('url is ' + url);
        return this.http.post(url, {})
                        .map((response: Response) => <any|null>response.json())
                        .do((data => console.log('DissassociateEntityFromInvestment: ' + JSON.stringify(data))))
                        .catch(this.handleError);
    }

    CreateInvestment(investment: Investment): Observable<Investment> {
        console.log('CreateInvestment...' + JSON.stringify(investment));
        return this.http.post(this.InvestmentsUrlEndpoint, investment)
            .map((response: Response) => <Investment>response.json())
            .do( (data => console.log('do CreateInvestment: ' + JSON.stringify(data))))
            .catch(this.handleError);
    }

    CreateInvestmentInfluenceFactor(factor: InvestmentInfluenceFactor): Observable<InvestmentInfluenceFactor> {
        console.log('CreateInvestmentInfluenceFactor...' + JSON.stringify(factor));
        return this.http.post(this.FactorsUrlEndpoint, factor)
        .map((response: Response) => <InvestmentInfluenceFactor>response.json())
        .do( (data => console.log('do CreateInvestmentInfluenceFactor: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    CreateInvestmentGroup(group: InvestmentGroup): Observable<InvestmentGroup> {
        console.log('CreateInvestmentGroup...' + JSON.stringify(group));
        return this.http.post(this.GroupsUrlEndpoint, group)
        .map((response: Response) => <InvestmentGroup>response.json())
        .do( (data => console.log('do CreateInvestmentGroup: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    CreateInvestmentRisk(risk: InvestmentRisk): Observable<InvestmentRisk> {
        console.log('CreateRisk...' + JSON.stringify(risk));
        return this.http.post(this.RisksUrlEndpoint, risk)
        .map((response: Response) => <InvestmentRisk>response.json())
        .do( (data => console.log('do CreateRisk: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    CreateInvestmentNote(investmentNote: InvestmentNote): Observable<InvestmentNote> {
        console.log('Create Note...' + JSON.stringify(investmentNote));
        return this.http.post(this.NotesUrlEndpoint, investmentNote)
        .map((response: Response) => <InvestmentNote>response.json())
        .do( (data => console.log('do Create note: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    CreateRegion(region: Region): Observable<Region> {
        console.log('Create Region...' + JSON.stringify(region));
        return this.http.post(this.RegionsUrlEndpoint, region)
        .map((response: Response) => <Region>response.json())
        .do( (data => console.log('do Region note: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    DeleteEntity(entityType: EntityTypes, id: number): Observable<any>  {
        let mapFunction;
        let url;

        if (entityType === EntityTypes.Investment) {
            url =  this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <Region>response.json();
        } else if (entityType === EntityTypes.InvestmentInfluenceFactor) {
            url =  this.FactorByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <InvestmentInfluenceFactor>response.json();
        } else if (entityType === EntityTypes.InvestmentRisk) {
            url =  this.RiskByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <InvestmentRisk>response.json();
        } else if (entityType === EntityTypes.InvestmentGroup) {
            url =  this.GroupByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <InvestmentGroup>response.json();
        } else if (entityType === EntityTypes.Region) {
            url =  this.RegionByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <Region>response.json();
        }

        console.log('Delete entity via url:' + url);
        return this.http.delete(url).map(mapFunction)
        .do((data => console.log('do DeleteEntity: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }


    DeleteInvestmentNote(OwningEntityId: number, OwningEntityType: EntityTypes, id: number): Observable<any> {
        console.log(`OwningEntityId=${OwningEntityId}, OwningEntityType=${OwningEntityType}, id=${id}`);
            let mapFunction;
            const url = this.NotesByParamsUrlEndpoint.replace('{owningEntityId}', '' + OwningEntityId)
                                                    .replace('{owningEntityType}', '' + EntityTypes[OwningEntityType])
                                                    .replace('{id}', '' + id);
            mapFunction = (response: Response) => <InvestmentNote>response.json();
            console.log('Delete entity via url:' + url);
            return this.http.delete(url).map(mapFunction)
            .do((data => console.log('do DeleteEntity: ' + JSON.stringify(data))))
            .catch(this.handleError);
        }

    UpdateEntity(entityType: EntityTypes, id: number, property: string, value: any): Observable<number> {
        const patchObj = [{
            'value': value,
            'path': '/' + property,
            'op': 'replace'
        }];
        let url;

        console.log('Patch for Entity' + EntityTypes[entityType] + ' patch is : ' + JSON.stringify(patchObj));

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers }); // Create a request option

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
        }

        return this.http.patch(url, patchObj, options)
        .map((response: Response) => <number>response.json(), (error: any) => {})
        .do((data => console.log('do patch risk: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }
}
