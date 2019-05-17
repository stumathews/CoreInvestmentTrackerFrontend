import { Component, Input, NgModule, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { ApiService } from './../../apiservice.service';
import { GraphData } from '../../Models/GraphData';
import { EntityTypes  } from '../../Utilities';
import * as d3 from 'd3';


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
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit, AfterViewInit, OnDestroy  {
  EntityTypes = EntityTypes;
  @Input() InvestmentId: number;
  @Input() EntityType: EntityTypes;
  name: string;
  svg;
  color;
  simulation;
  link;
  node;
  circles;
  labels;
  data: GraphData;
  constructor(protected apiService: ApiService) { }

  ngOnInit() {  }

  ngAfterViewInit() {
    this.apiService
    .GetInvestmentGraphData(this.EntityType, this.InvestmentId)
    .subscribe( (graphData) => this.render(graphData),
      error => console.log('Error occured getting graph data:' + error));
  }

  ticked() {
    this.link
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

        const radius = 15;

    const width = 700;
    const height = 700;

        this.node
         .attr('cx', function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
         .attr('cy', function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); })
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
  }

  render(graph) {
    const SvgTagName = '#' + EntityTypes[this.EntityType];
    this.svg = d3.select(SvgTagName);
    const width = +this.svg.attr('width');
    const height = +this.svg.attr('height');

    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.simulation = d3.forceSimulation()
    .force('link', d3.forceLink())
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));
        //.force('link', d3.forceLink())
        //.force('link', d3.forceLink().distance(10))
        //.force('charge', d3.forceManyBody());
        //.force('charge', d3.forceManyBody().distanceMax(1000).distanceMin(300));
        //.force('charge', d3.forceCenter(width / 2, height / 2));
    this.link = this.svg.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(graph.links)
                .enter().append('line')
                .attr('stroke-width', function(d) { return Math.sqrt(d.value); });

    this.node = this.svg.append('g')
                .attr('class', 'nodes')
                .selectAll('g')
                .data(graph.nodes)
                .enter()
                .append('g');

    this.circles = this.node
                .append('circle')
                  .attr('r', function(d) { return Math.sqrt(d.value) * 5; })
                  .attr('fill', (d) => this.color(d.value))
                  .call(d3.drag()
                    .on('start', (d) => this.dragstarted(d))
                    .on('drag', (d) => this.dragged(d))
                    .on('end', (d) => this.dragended(d)));

    this.labels = this.node.append('text')
                  .text(function (d) { return d.name; })
                  .attr('x', 6)
                  .attr('y', 3);

    this.node.append('title').text(function(d){ return d.value; });
    this.simulation
          .nodes(graph.nodes)
          .on('tick', () =>  this.ticked());

    this.simulation.force('link')
      .links(graph.links);

      this.simulation.alpha(0.8).restart();
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

  dragstarted(d) {
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  ngOnDestroy() { }
}
