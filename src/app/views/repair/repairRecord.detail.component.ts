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
        this.initParams();
    }
    initParams() {
        if (+this.status === 0) {
            this.repairRecord.repair_progress = '维修处理中！';
        }
        if (+this.status === 1) {
            this.repairRecord.repair_progress = '维修已完成！';
            this.repair.material = '无';
            // this.repair.result = '维修顺利完成！';
        }
    }
    createRepairRecord() {
        if (!this.repairRecord.repair_progress) {
            this.messageService.pushMessage({title: '字段为空', content: '请输入维修进展', type: 'error'});
        } else {
            if (+this.status === 1) {
                if (!this.repair.material) {
                    this.messageService.pushMessage({title: '字段为空', content: '请输入使用材料', type: 'error'});
                    return;
                }
                if (!this.repair.result) {
                    this.messageService.pushMessage({title: '字段为空', content: '请输入维修结果', type: 'error'});
                    return;
                }
                this.repair.repair_status = 3; // evaluate status
                this.repairService.update(this.repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)));
            }
            this.repairRecordService.create(this.repair.id, this.repairRecord).subscribe(
                res => {
                    this.router.navigate(['/message'], {queryParams: {'message': '维修记录创建成功!', 'url': '/repair/unHandledRepairList/2'}});
                }
            )
        }
    }
}
