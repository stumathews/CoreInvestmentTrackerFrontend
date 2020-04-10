import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './errors.html',
})
export class ErrorComponent implements OnInit {
  routeParams;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
  }
}
