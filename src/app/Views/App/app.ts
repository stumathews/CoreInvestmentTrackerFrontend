import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <div class="col-md-2">
  <app-side-nav></app-side-nav>
</div>
<div class="col-md-10">
  <div class="body-content">
  <router-outlet></router-outlet>
  <hr />
  <footer><p>&copy; {{dateNow | date: yearFmt}} - Investment Tracker</p></footer>
  </div>
</div>`,
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor() {}
  title: String = 'Investment Tracker';
  dateNow: Date = new Date();
  yearFmt = 'yyyy';
}
