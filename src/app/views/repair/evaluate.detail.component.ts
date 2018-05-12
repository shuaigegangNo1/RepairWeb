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
    repairId: number;
    loginUser: any;
    repair: Repair = new Repair();
    constructor(protected router: Router, private messageService: MessageService,
                private evaluateService: EvaluateService, private repairService: RepairService,
                private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.repair.id = this.route.snapshot.params['id'];
        }
    }
    createEvaluate() {
        // this.repair.repair_status = 0;
        // this.repairId = 1;
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
