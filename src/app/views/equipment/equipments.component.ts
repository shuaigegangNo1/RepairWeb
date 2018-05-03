import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {EquipmentService} from '../../common/service/equipmentService';
import {Equipment, EquipmentCriteria} from '../../common/entity/Equipment';
import {Subject} from 'rxjs/Subject';
import {FileService} from '../../common/service/fileService';
import {AttachmentCriteria} from '../../common/entity/Attachment';

@Component({
  templateUrl: 'equipments.component.html'
})
export class EquipmentComponent extends CustomPaginationComponent implements OnInit, OnChanges {
  equipmentList: Array<Equipment>;
  page  = 0;
  equipmentCriteria: EquipmentCriteria = new EquipmentCriteria();
  attachmentCriteria: AttachmentCriteria = new AttachmentCriteria();
  f_equipment: Equipment = new Equipment();
  searchStream = new Subject<EquipmentCriteria>();
  disable: boolean;
  images: any[];
  // color: string;
  @ViewChild('updateModal') public updateModal: ModalDirective;
  @ViewChild('showPictureModal') public showPictureModal: ModalDirective;
  constructor(protected router: Router, protected messageService: MessageService,
              private equipmentService: EquipmentService, private route: ActivatedRoute,
              private fileService: FileService) {
    super(router, messageService);
    if (this.route.snapshot.params['id']) {
      this.equipmentCriteria.location_id = this.route.snapshot.params['id'];
    }
    this.getEquipmentList()
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.searchStream
        .debounceTime(300)
        .switchMap(() => this.equipmentService.getEquipmentList(this.equipmentCriteria)).subscribe(
        (res) => {
          this.equipmentList = res.equipmentList.content;
          this.totalItems[0] = res.equipmentList.totalElements;
          this.resetMaxSize(this.currentTab, this.equipmentCriteria);
        }
    );
  }
  ngOnChanges(changes) {

    console.log('ngOnChanges');

  }
  getEquipmentList() {
    this.equipmentService.getEquipmentList(this.equipmentCriteria).subscribe(res => {
      this.equipmentList = res.equipmentList.content;
      this.totalItems[0] = res.equipmentList.totalElements;
      this.resetMaxSize(this.currentTab, this.equipmentCriteria);
    })
  }
  update(equipment: Equipment) {
    // this.disable = false;
    this.f_equipment = equipment;
    // this.updateModal.show();
    this.router.navigate(['/equipment/update', this.f_equipment.id]);
  }

  pageChanged(event: any) {
    // this.userCriteria.skip = (event.page - 1) * this.userCriteria.pagesize;
    this.equipmentCriteria.skip = event.page - 1;
    this.searchStream.next(this.equipmentCriteria);
  }
  create() {
    this.router.navigate(['/equipment/create', this.equipmentCriteria.location_id]);
  }
  submitEquipment() {
    this.equipmentService.update(this.f_equipment.id, this.f_equipment).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)))
    this.updateModal.hide();
    this.messageService.pushMessage({title: 'Success', content: '设备修改成功', type: 'success'});
  }
  searchEquipmentName() {
    this.searchStream.next(this.equipmentCriteria);
  }
  showDetail(equipment: Equipment) {
    this.disable = true;
    this.f_equipment = equipment;
    this.updateModal.show();
  }
  getValue(value: any) {
    this.f_equipment.buy_date = value;
  }
  showPics(equipment: Equipment) {
    this.attachmentCriteria.equipment_id = equipment.id;
    this.fileService.getAttachmentList(this.attachmentCriteria).subscribe(
        res=>{
          this.images = res.attachmentList.content;
          this.showPictureModal.show();
        }
    )

  }
  upload(equipment: Equipment) {
    this.router.navigate(['/equipment/upload', equipment.id]);
  }
  setColor(date: any) : string{
    let  newDate = new Date('2018-04-16');
    let  curDate = new Date(date);
    let color ='';
    if (curDate.getTime()>newDate.getTime()) {
      color ='red'
    }else{
       color = 'green'
    }
    return color;
  }
}
