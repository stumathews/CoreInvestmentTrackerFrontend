import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../AuthService';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { ApiService } from '../../apiservice.service';

@Component({
  selector: 'app-root',
  template:
   `
  <app-navbar></app-navbar>
  <div class="col-md-2">
   <app-side-nav></app-side-nav>
  </div>
<div class="col-md-10">
  <div *ngIf="notification && showNotification" (click)="showNotification = !showNotification" class="notification">
    <p>{{ notification }}</p>
  </div>
  <router-outlet></router-outlet>
  <hr />
  <div class="col-md-12">
   <footer><p>&copy; {{dateNow | date: yearFmt}} - Investment Tracker</p></footer>
  </div>
</div>`,
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  notification: string;
  showNotification: boolean;
  constructor(private notificationService: NotificationService,
              private apiService: ApiService) {}

  title: String = 'Investment Tracker';
  dateNow: Date = new Date();
  yearFmt = 'yyyy';

  ngOnInit() {
    this.notificationService
            .notification$
            .subscribe(message => {
              this.notification = message;
              this.showNotification = true;
            });
  }
}
