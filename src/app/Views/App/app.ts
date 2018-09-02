import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template:
//    `
//   <app-navbar></app-navbar>
//   <div class="col-md-2">
//   <app-side-nav></app-side-nav>
// </div>
// <div class="col-md-10">
//   <div class="body-content">
//   <router-outlet></router-outlet>
//   <hr />
//   <footer><p>&copy; {{dateNow | date: yearFmt}} - Investment Tracker</p></footer>
//   </div>
// </div>`

`<app-navbar></app-navbar>
<div id="wrapper">
<div id="sidebar-wrapper" class="col-md-1">
          <div id="sidebar">
          <app-side-nav></app-side-nav>
          </div>
      </div>
      <div id="main-wrapper" class="col-md-11 pull-right">
          <div id="main">
            <router-outlet></router-outlet>
          </div>
          <!--<div class="col-md-12 footer">
             <ul class="nav navbar-nav"><li><a href="">&copy; {{dateNow | date: yearFmt}} - Investment Tracker</a></li><li><a href="">Link</a></li><li><a href="">Link</a></li></ul>
            
          </div>-->
          &copy; {{dateNow | date: yearFmt}} - Investment Tracker
      </div>
</div>`
,
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor() {}
  title: String = 'Investment Tracker';
  dateNow: Date = new Date();
  yearFmt = 'yyyy';
}
