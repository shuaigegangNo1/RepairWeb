/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {Evaluate} from "../../common/entity/Evaluate";
import {EvaluateService} from "../../common/service/evaluateService";
import {Repair} from "../../common/entity/Repair";
import {RepairService} from "../../common/service/repairService";
@Component({
    selector: 'app-evaluate-detail',
    templateUrl: 'evaluate.detail.component.html'
})
export class EvaluateDetailComponent {
    evaluate: Evaluate = new Evaluate();
    loginUser: any;
    repair: Repair = new Repair();
    rate: number;
    constructor(protected router: Router, private messageService: MessageService,
                private evaluateService: EvaluateService, private repairService: RepairService,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.repair.id = params['id'];
            this.rate = params['rate'];
        });
    }
    createEvaluate() {
        if (!this.evaluate.rate) {
            this.messageService.pushMessage({title: 'Error', content: '请选择评价等级', type: 'error'});
            return;
        }
        if (!this.evaluate.workload) {
            this.messageService.pushMessage({title: 'Error', content: '请输入工作量', type: 'error'});
            return;
        }
        this.evaluateService.create(this.repair.id, this.evaluate).subscribe(
            res => {
                this.updateRepairStatus();
                this.router.navigate(['/message'], {queryParams: {'message': '评估成功!', 'url': '/user'}});
            }
        )
    }
    updateRepairStatus() {
        this.repair.repair_status = 4; // finished status
        this.repairService.update(this.repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)));
    }
}
