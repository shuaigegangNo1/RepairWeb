/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {Repair} from '../../common/entity/Repair';
import {RepairService} from '../../common/service/repairService';
@Component({
    selector: 'app-assert-repair-detail',
    templateUrl: 'assertRepair.detail.component.html'
})
export class AssertRepairDetailComponent {
    repair: Repair = new Repair();
    loginUser: any;
    // x: number = 5;
    // y: number = 2;
    max = 10;
    rate = 7;
    isReadonly = false;

    overStar: number;
    percent: number;
    status: number;
    constructor(protected router: Router, private messageService: MessageService,
                private repairService: RepairService, private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.repair.id = this.route.snapshot.params['id'];
        }
        // this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
        // this.repair.repair_status = 2;
        this.status = 2;
        this.showRepairDetail();
    }
    setContent(content: any) {
        this.repair.comments = content;
    }
    showRepairDetail() {
        this.repairService.getRepairDetail(this.repair.id).subscribe(res => {this.repair = res.result})
    }
    hoveringOver(value: number): void {
        this.overStar = value;
        this.percent = (value / this.max) * 100;
    }

    resetStar(): void {
        this.overStar = void 0;
    }
    audit() {
        this.repair.repair_status = this.status;
        this.repairService.update(this.repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)));
        this.router.navigate(['/message'], {queryParams: {'message': '审批完成!', 'url': '/repair/assertRepairList'}});
    }
    // TODO: select repairman
}
