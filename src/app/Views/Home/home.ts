import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NgModule, VERSION } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent {
  title = 'Home';
  isProdEnv = environment.production;
  baseUrl = environment.baseUrl;
  version: string;
  constructor()
  {
    this.version = VERSION.full
  }  
}
