import {Component} from '@angular/core';
import {User} from '../../common/entity/User';
import {Repair} from "../../common/entity/Repair";
import {AssertRepair} from "../../common/entity/AssertRepair";
import {RepairService} from "../../common/service/repairService";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../common/service/userService";
@Component({
    templateUrl: 'printer.component.html'
})
export class PrintModalComponent  {
    printCSS: string[];
    printStyle: string;
    printBtnBoolean = true;
    repair: Repair = new Repair();
    assertRepair: AssertRepair = new AssertRepair();
    repairmanList: Array<User>;
    constructor(private repairService: RepairService, private userService: UserService,
                private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.assertRepair.id = this.route.snapshot.params['id'];
        }
        this.getAssertDetail();
        this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
        this.printStyle =
            `
             th, td {
                 color: black !important;
             }
             `;
    }
    printComplete() {
        this.printBtnBoolean = true;
    }
    beforePrint() {
        this.printBtnBoolean = false;
    }
    getAssertDetail() {
        this.repairService.getAssertRepairDetail(this.assertRepair.id).subscribe(res => this.assertRepair = res.result)
    }
}
