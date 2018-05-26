import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    protected readonly router: Router) { }
  isCollapsed = true;
  ngOnInit() {
  }

  login() {
    this.router.navigate(['/Login']);
  }
  logout() {
    this.authService.setToken('');
  }
}
