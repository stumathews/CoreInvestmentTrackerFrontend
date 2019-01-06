import { Component, Input, NgModule, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import * as d3 from 'd3';
import { EntityTypes } from '../../../Utilities';
import { ApiService } from '../../../apiservice.service';
import { Activity } from '../../../Models/Activity';
import { timer } from 'd3';


@Component({
  selector: 'app-generic-bar-graph',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class GenericBarGraphComponent implements OnInit, AfterViewInit, OnDestroy {
    EntityTypes = EntityTypes;
    @Input() Data: Activity[]; // Main items to plot
    @Input() XItem: string; // property of entity to plot on X
    @Input() YItem: string; // property of entity to plot on Y
    @Input() Width: string;
    @Input() Height: string;
    @Input() Id: string; // Unique Id
    private prefix = 'genbar : ';
    constructor(protected apiService: ApiService) {}
svg;
    ngOnInit(): void {}
    ngOnDestroy(): void {}

    ngAfterViewInit(): void {
        // const graphData = function(d) { return this.Data; };
        this.apiService
        .GetActivities(EntityTypes.Investment, +this.Id )
        .subscribe((data) => {
            console.log(this.prefix + JSON.stringify(data));
            this.render(this.Data);
        });
    }

    render(data: Activity[]) {
        const xitem = this.XItem;
        const yitem = this.YItem;
        /* D3 drawing code goes here */
        d3.select('#hi').selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cy', 10 )
            .attr('cx', function(d, i) { return i * 10; } )
            .attr('r', 5)
            .on('click', function() { data.push( <Activity>{ atTime: '', name: 'yo' }); })
            .text(function(d){ return d.atTime; });

    }
}
