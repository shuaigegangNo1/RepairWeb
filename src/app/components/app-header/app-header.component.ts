import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RepairService} from "../../common/service/repairService";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  repairCount: number;
  loginUser: any;
  name: number;
  constructor(private router: Router, private repairService: RepairService) {
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if (this.loginUser.name) {
      this.name = this.loginUser.name;
    }
    this.getRepairCount();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }
  getRepairCount() {
    this.repairService.getRepairCount(0).subscribe(res => this.repairCount = res.result)
  }
}
