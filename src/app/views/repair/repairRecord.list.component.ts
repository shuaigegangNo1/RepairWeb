/**
 * Created by huangxuewen on 2018/5/9.
 */
import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../common/service/messageService";
import {RepairRecordService} from "../../common/service/repairRecordService";
import {RepairRecordCriteria} from "../../common/entity/RepairRecord";

@Component({
    selector: 'app-repair-record-list',
    templateUrl: 'repairRecord.list.component.html',
    styleUrls: ['./repairRecord.list.component.css']
})
export class RepairRecordListComponent {
    customClass: string = 'accordionClass';
    isFirstOpen: boolean = true;
    repairRecordList: any[];
    repairRecordCriteria: RepairRecordCriteria = new RepairRecordCriteria();
    constructor(protected router: Router, protected messageService: MessageService,
                private repairRecordService: RepairRecordService, private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.repairRecordCriteria.id = this.route.snapshot.params['id'];
        }
    this.getRepairRecordList();
    }

    getRepairRecordList() {
        this.repairRecordService.getRepairRecordList(this.repairRecordCriteria)
            .subscribe(res => {
                this.repairRecordList = res.result.content;
                console.log("res>>>"+JSON.stringify(this.repairRecordList))
            } )
    }
}
