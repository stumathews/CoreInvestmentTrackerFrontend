import { Component, Input, NgModule, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { ApiService } from './../../apiservice.service';
import { GraphData } from '../../Models/GraphData';
import { EntityTypes  } from '../../Utilities';
import * as d3 from 'd3';
import { SharedGraphComponent } from '../graph/shared.graph.component';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { HasInvestmentsEntity } from '../../Models/HasInvestmentsEntity';


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
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarGraphComponent implements OnInit, AfterViewInit, OnDestroy  {
  EntityTypes = EntityTypes;
  @Input() InvestmentId: number;
  @Input() EntityType: EntityTypes;
  @Input() Entities: HasInvestmentsEntity[];

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

    // const svg = d3.select('svg'),
    const SvgTagName = '#' + EntityTypes[this.EntityType] + '_bargraph';
    const svg = d3.select(SvgTagName),
    margin = {top: 30, right: 40, bottom: 200, left: 50},
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(graph.map(function(d) { return d['name']; }));
  const max = d3.max(graph, function(d) { return d['value']; });
  y.domain([0, parseInt(<any>max, 10)]);

  g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-65)' );

  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(max, ''))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Gello');

  g.selectAll('.bar')
    .data(graph)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(d['name']); })
      .attr('y', function(d) { return y(d['value']); })
      .attr('width', x.bandwidth())
      .attr('height', function(d) { return height - y(d['value']); });
  }


  ngOnDestroy() { }
}
