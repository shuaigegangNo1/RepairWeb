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
    constructor(protected router: Router, private messageService: MessageService,
                private repairService: RepairService, private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.repair.id = this.route.snapshot.params['id'];
        }
        this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
        this.showRepairDetail();
    }
    createRepair() {
        this.repairService.create(this.loginUser.name, this.repair).subscribe(
            res => {
                this.router.navigate(['/message'], {queryParams: {'message': '报修成功!', 'url': '/user'}});
            }
        )
            // if(!this.equipment.id){
            //     this.equipmentService.create(this.equipment).subscribe(
            //         res => {
            //             this.messageService.pushMessage({title: 'Success', content: '设备创建成功', type: 'success'});
            //             this.router.navigate(['/equipment/children', this.equipment.location_id]);
            //         })
            // }else{
            //     this.update();
            // }

    }
    setContent(content: any) {
        this.repair.comments = content;
    }
    // getCabinetList(){
    //     this.locationService.getSimpleLocationList().subscribe(res=> this.locations = res);
    // }
    // change(){
    //     this.locationService.getCabinetList(this.parent_id).subscribe(res=> this.cabinets =res);
    // }
    // update() {
    //     this.equipmentService.update(this.equipment.id, this.equipment).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)))
    //     this.router.navigate(['/message'],{queryParams:{'message':'设备修改成功!','url':'/equipment'}});
    // }
    showRepairDetail() {
        this.repairService.getRepairDetail(this.repair.id).subscribe(res => {this.repair = res.result})
    }
    // getValue(value:any) {
    //     this.equipment.buy_date = new Date(value._bsValue);
    // }
    hoveringOver(value: number): void {
        this.overStar = value;
        this.percent = (value / this.max) * 100;
    }

    resetStar(): void {
        this.overStar = void 0;
    }
    reject() {
        this.repair.repair_status = 1;
        this.repairService.update(this.repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)));
        this.router.navigate(['/message'], {queryParams: {'message': '审批完成!', 'url': '/repair/assertRepairList'}});
    }
    accept() {
        this.repair.repair_status = 2;
        this.repairService.update(this.repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)));
        this.router.navigate(['/message'], {queryParams: {'message': '审批完成!', 'url': '/repair/assertRepairList'}});
    }
}
