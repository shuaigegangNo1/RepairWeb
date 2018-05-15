import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(private router: Router) {
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }
}
