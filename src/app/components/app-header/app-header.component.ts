import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RepairService} from "../../common/service/repairService";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  repairCount: number;
  sno: any;
  constructor(private router: Router, private repairService: RepairService) {
    this.sno = JSON.parse(localStorage.getItem('sno'));
    this.getRepairCount();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('sno');
    this.router.navigate(['']);
  }
  getRepairCount() {
    const repairStatus = 0;
    this.repairService.getRepairCount(repairStatus).subscribe(res => this.repairCount = res.result)
  }
}
