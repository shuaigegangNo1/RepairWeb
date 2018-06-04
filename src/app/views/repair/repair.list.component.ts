import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {Subject} from 'rxjs/Subject';
import {FileService} from '../../common/service/fileService';
import {Repair, RepairCriteria} from "../../common/entity/Repair";
import {RepairService} from "../../common/service/repairService";

@Component({
  templateUrl: 'repair.list.component.html'
})
export class RepairListComponent extends CustomPaginationComponent implements OnInit, OnChanges {
  repairList: Array<Repair>;
  // tmpRepairList: Array<Repair>;
  page  = 0;
  repairCriteria: RepairCriteria = new RepairCriteria();
  f_Repair: Repair = new Repair();
  f_Repair1: Repair = new Repair();
  searchStream = new Subject<RepairCriteria>();
  disable: boolean;
  loginUser: any;
  showCreate: boolean;
  @ViewChild('updateModal') public updateModal: ModalDirective;
  @ViewChild('evaluateModal') public evaluateModal: ModalDirective;
  constructor(protected router: Router, protected messageService: MessageService,
              private repairService: RepairService, private route: ActivatedRoute) {
    super(router, messageService);
    if (this.route.snapshot.params['id']) {
      // this.repairCriteria.repair_status = this.route.snapshot.params['id'];
      this.repairCriteria.isEvaluate = 'y';
      this.showCreate = false;
    } else {
      this.repairCriteria.isEvaluate = 'n';
      this.showCreate = true;
    }
    // this.loginUser = JSON.parse(localStorage.getItem('sno'));
     if (JSON.parse(localStorage.getItem('sno'))) {
       this.repairCriteria.sno = JSON.parse(localStorage.getItem('sno'));
     }
    this.getRepairList()
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.searchStream
        .debounceTime(300)
        .switchMap(() => this.repairService.getRepairList(this.repairCriteria)).subscribe(
        (res) => {
          this.repairList = res.result.content;
          this.totalItems[0] = res.result.totalElements;
          this.resetMaxSize(this.currentTab, this.repairCriteria);
        }
    );
  }
  ngOnChanges(changes) {

    console.log('ngOnChanges');

  }
  getRepairList() {

    this.repairService.getRepairList(this.repairCriteria).subscribe(res => {
      this.repairList = res.result.content;
      this.totalItems[0] = res.result.totalElements;
      this.resetMaxSize(this.currentTab, this.repairCriteria);
    })
  }
  update(repair: Repair) {
    this.disable = false;
    this.f_Repair = repair;
    this.updateModal.show();
  }

  pageChanged(event: any) {
    this.repairCriteria.skip = event.page - 1;
    this.searchStream.next(this.repairCriteria);
  }
  create() {
    this.router.navigate(['/repair/create']);
  }
  submitRepair() {
    this.f_Repair1.id = this.f_Repair.id;
    this.repairService.update(this.f_Repair1).subscribe(res => {
      this.messageService.pushMessage({title: '修改', content: '报修修改成功', type: 'success'});
      this.searchStream.next(this.repairCriteria);
      this.f_Repair = this.f_Repair1
      this.updateModal.hide();
    })
  }
  searchEquipmentName() {
    this.searchStream.next(this.repairCriteria);
  }
  showDetail(repair: Repair) {
    this.disable = true;
    this.f_Repair = repair;
    this.updateModal.show();
  }
  evaluate(repair: Repair) {
    this.f_Repair = repair;
    this.evaluateModal.show();
  }
  evaluateRepair() {
    if (this.f_Repair.rate) {
      this.f_Repair.isEvaluate = 'y';
      this.repairService.update(this.f_Repair).subscribe(res => {
        console.log(">>>res>>", res.result);
        // this.repairList.map(repair => {
        //   if ( repair.id !== this.f_Repair.id) {
        //     this.tmpRepairList.concat(repair)
        //   }
        // });
        // this.repairList = this.tmpRepairList;
        this.messageService.pushMessage({title: '评价', content: '评价成功', type: 'success'});
        this.evaluateModal.hide();
      })
    }else {
      this.messageService.pushMessage({title: '评价', content: '请评价', type: 'error'});
    }
  }
  checkRepairRecord(repair: Repair) {
    this.router.navigate(['/repair/repairRecordList', repair.id]);
  }
  setColor(repair: Repair): string {
    let color = '';
    if (repair.repair_status === 0) {
      color = 'red'
    }else if (repair.repair_status === 2) {
      color = 'green'
    }else if (repair.repair_status === 3 && repair.isEvaluate === 'n') {
      color = 'blue'
    }else if (repair.repair_status === 4 && repair.isEvaluate === 'n') {
      color = 'blue'
    }else {
      color = 'black'
    }
    return color;
  }
  // getValue(value: any) {
  //   this.f_equipment.buy_date = value;
  // }
  // showPics(equipment: Equipment) {
  //   this.attachmentCriteria.equipment_id = equipment.id;
  //   this.fileService.getAttachmentList(this.attachmentCriteria).subscribe(
  //       res=>{
  //         this.images = res.attachmentList.content;
  //         this.showPictureModal.show();
  //       }
  //   )
  //
  // }
  // upload(equipment: Equipment) {
  //   this.router.navigate(['/equipment/upload', equipment.id]);
  // }
  close() {
    this.updateModal.hide();
  }
  getValue(value: any, flag: number) {
    if (flag === 1) {
      this.f_Repair1.content = value.target.value;
    }
    if (flag === 2) {
      this.f_Repair1.area = value.target.value;
    }
    if (flag === 3) {
      this.f_Repair1.address = value.target.value;
    }
    if (flag === 4) {
      this.f_Repair1.telephone = value.target.value;
    }
  }
}
