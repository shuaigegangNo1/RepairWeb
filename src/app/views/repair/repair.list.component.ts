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
  page  = 0;
  repairCriteria: RepairCriteria = new RepairCriteria();
  f_Repair: Repair = new Repair();
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
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    this.repairCriteria.userName = this.loginUser.name;
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
    // this.userCriteria.skip = (event.page - 1) * this.userCriteria.pagesize;
    this.repairCriteria.skip = event.page - 1;
    this.searchStream.next(this.repairCriteria);
  }
  create() {
    this.router.navigate(['/repair/create']);
  }
  submitRepair() {
    this.repairService.update(this.f_Repair).subscribe(res => {
      this.messageService.pushMessage({title: 'Success', content: '报修修改成功', type: 'success'});
      this.searchStream.next(this.repairCriteria);
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
        this.messageService.pushMessage({title: 'Success', content: '评价成功', type: 'success'});
        this.evaluateModal.hide();
      })
    }else {
      this.messageService.pushMessage({title: 'Error', content: '请评价', type: 'error'});
    }
  }
  checkRepairRecord(repair: Repair) {
    this.router.navigate(['/repair/repairRecordList', repair.id]);
  }
  setColor(status: any): string {
    let color = '';
    if (status === 0) {
      color = 'red'
    }else if (status === 2) {
      color = 'green'
    }else if (status === 3) {
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
}
