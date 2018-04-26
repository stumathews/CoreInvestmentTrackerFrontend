import { GraphComponent } from './graph.component';
import { AfterViewInit, OnDestroy, OnInit, Component, ViewEncapsulation, Input } from '@angular/core';
import { EntityTypes } from '../../Utilities';
import { ApiService } from '../../apiservice.service';

@Component({
    selector: 'app-shared-graph',
    templateUrl: './shared.graph.component.html',
    styleUrls: ['./graph.component.css'],
    encapsulation: ViewEncapsulation.None
  })
  export class SharedGraphComponent extends GraphComponent implements OnInit, AfterViewInit, OnDestroy  {
   @Input() InvestmentId: number;
   @Input() EntityType: EntityTypes;
   constructor(apiService: ApiService) {
       super(apiService);
 }
    ngAfterViewInit() {
        console.log('Hello!!');
        this.apiService
        .GetSharedInvestmentGraphData(this.EntityType)
        .subscribe( (graphData) => this.render(graphData),
            error => console.log('Error occured getting graph data:' + error));
        }
}
