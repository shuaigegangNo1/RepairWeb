/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {Repair} from '../../common/entity/Repair';
import {RepairService} from '../../common/service/repairService';
import {UserService} from "../../common/service/userService";
import {User} from "../../common/entity/User";
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
    repairmanList: Array<User>;
    repairmanId: number;
    constructor(protected router: Router, private messageService: MessageService,
                private repairService: RepairService, private userService: UserService,
                private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.repair.id = this.route.snapshot.params['id'];
        }
        // this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
        // this.repair.repair_status = 2;
        // this.status = 2;
        this.showRepairDetail();
        this.getRepairManList();
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
        if (!this.status) {
            this.messageService.pushMessage({title: 'Error', content: '请选择审批意见', type: 'error'});
            return;
        }
        if(this.status ===2){
            if (!this.repairmanId) {
                this.messageService.pushMessage({title: 'Error', content: '请选择检修人', type: 'error'});
                return;
            }
        }
        this.updateRepairStatusAndRepairMan();
    }
    addRepairMan() {
        this.repairService.updateRepairman(this.repair.id, this.repairmanId).subscribe(res =>
            console.log('>>>>update repairman>>>>' + JSON.stringify(res)));
    }
    updateRepairStatusAndRepairMan() {
        this.repair.repair_status = this.status;
        this.repairService.update(this.repair).subscribe(res => {
            console.log('>>>>update repair_status>>>>' + JSON.stringify(res));
            this.addRepairMan();
            this.router.navigate(['/message'], {queryParams: {'message': '审批完成!', 'url': '/repair/assertRepairList/0'}});
        })
    }
    getRepairManList() {
        const role = 2;
        this.userService.getUserListbyRole(+role).subscribe(res => this.repairmanList = res.result)

    }
}
