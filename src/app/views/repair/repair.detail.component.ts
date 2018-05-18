/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {Repair} from '../../common/entity/Repair';
import {RepairService} from '../../common/service/repairService';
@Component({
    selector: 'app-repair-detail',
    templateUrl: 'repair.detail.component.html'
})
export class RepairDetailComponent {
    repair: Repair = new Repair();
    loginUser: any;
    constructor(protected router: Router, private messageService: MessageService,
                private repairService: RepairService, private route: ActivatedRoute) {
        this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    }
    createRepair() {
        this.repair.repair_status = 0;
        this.repairService.create(this.loginUser.name, this.repair).subscribe(
            res => {
                this.router.navigate(['/message'], {queryParams: {'message': '报修成功!', 'url': '/repair'}});
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
    // showDetail() {
    //     this.equipmentService.showDetail(this.equipment.id).subscribe(res=> {this.equipment = res.result})
    // }
    // getValue(value:any) {
    //     this.equipment.buy_date = new Date(value._bsValue);
    // }
}
