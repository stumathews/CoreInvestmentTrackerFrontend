import { Component, Input, NgModule, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { ApiService } from './../../apiservice.service';
import { GraphData } from '../../Models/GraphData';
import { EntityTypes  } from '../../Utilities';
import * as d3 from 'd3';
import { SharedGraphComponent } from '../graph/shared.graph.component';
import { InvestmentGroup } from '../../Models/InvestmentGroup';


interface Datum {
  name: string;
  value: number;
}

  const TestData:  GraphData = {
    'nodes':  [
      {
        'name': 'Test investment name',
        'value': 1
      },
      {
        'name': 'Director dismissal',
        'value': 3
      },
      {
        'name': 'Bad Earnings report',
        'value': 3
      }
    ],
      'links': [
        {
          'source': 0,
          'target': 1,
          'value': 3
        },
        {
          'source': 0,
          'target': 2,
          'value': 3
        }
    ]
};


@Component({
  selector: 'app-piegraph',
  templateUrl: './piegraph.component.html',
  styleUrls: ['./piegraph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PieGraphComponent implements OnInit, AfterViewInit, OnDestroy  {
  EntityTypes = EntityTypes;
  @Input() InvestmentId: number;
  @Input() EntityType: EntityTypes;
  @Input() Entities: InvestmentGroup[];

  data: GraphData;
  constructor(protected apiService: ApiService) { }

  ngOnInit() {  }

  ngAfterViewInit() {   
      const graphData = this.Entities.map(e => {
        return { 'name': e.name, 'value' : e.investments.length};
      });
      this.render(graphData);
  }

  render(graph) {

    const canvas = document.querySelector('canvas'),
          context = canvas.getContext('2d');

const width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'];

const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)
    .context(context);

const labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)
    .context(context);

const pie = d3.pie()
    .sort(null)
    .value(function(d: any) { return d.value; });

context.translate(width / 2, height / 2);

  const arcs = pie(graph);

  arcs.forEach(function(d, i) {
    context.beginPath();
    arc(<any>d);
    context.fillStyle = colors[i];
    context.fill();
  });

  context.beginPath();
  arcs.forEach(<any>arc);
  context.strokeStyle = '#fff';
  context.stroke();

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#000';
  arcs.forEach(function(d) {
    const c = labelArc.centroid(<any>d);
    context.fillText(d.data['name'], c[0], c[1]);
  });

  }

  ngOnDestroy() { }
}
