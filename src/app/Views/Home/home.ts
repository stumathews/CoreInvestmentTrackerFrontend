import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent {
  title = 'Home';
  isProdEnv = environment.production;
  baseUrl = environment.baseUrl;
}
