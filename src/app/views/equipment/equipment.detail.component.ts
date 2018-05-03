/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {EquipmentService} from '../../common/service/equipmentService';
import {Equipment} from '../../common/entity/Equipment';
import {LocationService} from '../../common/service/locationService';
@Component({
    selector: 'app-equipment-detail',
    templateUrl: 'equipment.detail.component.html'
})
export class EquipmentDetailComponent {
    equipment: Equipment = new Equipment();
    locations: any[];
    cabinets: any[];
    showSelect: boolean;
    parent_id: number;
    constructor(protected router: Router, private messageService: MessageService,
                private equipmentService: EquipmentService, private route: ActivatedRoute,
                private locationService: LocationService) {
        if(this.route.snapshot.params['id']){
            this.equipment.location_id = this.route.snapshot.params['id'];
            this.showSelect = false;
        }else{
            this.showSelect = true;
        }
        if(this.route.snapshot.params['eid']){
            this.equipment.id = this.route.snapshot.params['eid'];
            this.showSelect = false;
            this.showDetail();
        }else{
            this.showSelect = true;
        }
        this.getCabinetList();
    }
    createEquipment() {
            if(!this.equipment.id){
                this.equipmentService.create(this.equipment).subscribe(
                    res => {
                        this.messageService.pushMessage({title: 'Success', content: '设备创建成功', type: 'success'});
                        this.router.navigate(['/equipment/children', this.equipment.location_id]);
                    })
            }else{
                this.update();
            }

    }
    setContent(content: any) {
        this.equipment.comments = content;
    }
    getCabinetList(){
        this.locationService.getSimpleLocationList().subscribe(res=> this.locations = res);
    }
    change(){
        this.locationService.getCabinetList(this.parent_id).subscribe(res=> this.cabinets =res);
    }
    update() {
        this.equipmentService.update(this.equipment.id, this.equipment).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)))
        this.router.navigate(['/message'],{queryParams:{'message':'设备修改成功!','url':'/equipment'}});
    }
    showDetail() {
        this.equipmentService.showDetail(this.equipment.id).subscribe(res=> {this.equipment = res.result})
    }
    getValue(value:any) {
        this.equipment.buy_date = new Date(value._bsValue);
    }
}
