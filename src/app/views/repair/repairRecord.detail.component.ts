/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {RepairRecord} from "../../common/entity/RepairRecord";
import {RepairRecordService} from "../../common/service/repairRecordService";
import {RepairService} from "../../common/service/repairService";
import {Repair} from "../../common/entity/Repair";
@Component({
    selector: 'app-repair-record-detail',
    templateUrl: 'repairRecord.detail.component.html'
})
export class RepairRecordDetailComponent {
    repairRecord: RepairRecord = new RepairRecord();
    loginUser: any;
    repairId: number;
    status: number;
    repair: Repair = new Repair();
    constructor(protected router: Router, private messageService: MessageService,
                private repairRecordService: RepairRecordService, private repairService: RepairService,
                private route: ActivatedRoute) {
        this.status = 0;
        if (this.route.snapshot.params['id']) {
            this.repair.id = this.route.snapshot.params['id'];
        }
    }
    createRepairRecord() {

        if (!this.repairRecord.repair_progress) {
            this.messageService.pushMessage({title: '字段为空', content: '维修进展不能为空', type: 'error'});
        } else {
            if (+this.status === 1) {
                this.repair.repair_status = 3; // evaluate status
                this.repairService.update(this.repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)));
            }
            this.repairRecordService.create(this.repair.id, this.repairRecord).subscribe(
                res => {
                    this.router.navigate(['/message'], {queryParams: {'message': '创建成功!', 'url': '/user'}});
                }
            )
        }
    }
}
