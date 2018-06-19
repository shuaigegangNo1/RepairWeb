import {Component} from '@angular/core';
import {Repair} from "../../common/entity/Repair";
import {AssertRepair} from "../../common/entity/AssertRepair";
import {RepairService} from "../../common/service/repairService";
import {ActivatedRoute} from "@angular/router";
import {Material} from "../../common/entity/Material";
import {MaterialService} from "../../common/service/materialService";
@Component({
    templateUrl: 'printer.component.html'
})
export class PrintModalComponent  {
    printCSS: string[];
    printStyle: string;
    printBtnBoolean = true;
    repair: Repair = new Repair();
    assertRepair: AssertRepair = new AssertRepair();
    material: Material = new Material();
    materialName: string;
    showCode = false;
    constructor(private repairService: RepairService, private mateialService: MaterialService,
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
        this.showCode = true;
        this.printBtnBoolean = false;
    }
    getAssertDetail() {
        this.repairService.getAssertRepairDetail(this.assertRepair.id).subscribe(res => this.assertRepair = res.result)
    }
    getMaterialDetail() {
        this.mateialService.getMaterialDetail(this.material.code).subscribe(res => this.materialName = res.result.name)
    }
}
