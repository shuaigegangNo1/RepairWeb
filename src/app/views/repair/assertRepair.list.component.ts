import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {Subject} from 'rxjs/Subject';
import {Repair, RepairCriteria} from "../../common/entity/Repair";
import {RepairService} from "../../common/service/repairService";

@Component({
  templateUrl: 'assertRepair.list.component.html'
})
export class AssertRepairListComponent extends CustomPaginationComponent implements OnInit, OnChanges {
  repairList: Array<Repair>;
  page  = 0;
  repairCriteria: RepairCriteria = new RepairCriteria();
  f_Repair: Repair = new Repair();
  searchStream = new Subject<RepairCriteria>();
  disable: boolean;
  loginUser: any;
  // color: string;
  @ViewChild('updateModal') public updateModal: ModalDirective;
  constructor(protected router: Router, protected messageService: MessageService,
              private repairService: RepairService, private route: ActivatedRoute) {
    super(router, messageService);
    if (this.route.snapshot.params['id']) {
      this.repairCriteria.repair_status = this.route.snapshot.params['id'];
    }
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    // this.repairCriteria.userName = this.loginUser.name;
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
    // this.repairCriteria.repair_status = 0;
    this.repairService.getRepairList(this.repairCriteria).subscribe(res => {
      this.repairList = res.result.content;
      this.totalItems[0] = res.result.totalElements;
      this.resetMaxSize(this.currentTab, this.repairCriteria);
    })
  }
  approve(repair: Repair) {
    // this.disable = false;
    // this.f_Repair = repair;
    // this.updateModal.show();
    this.router.navigate(['/repair/approve', repair.id]);
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
    this.repairService.update(this.f_Repair).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)))
    this.updateModal.hide();
    this.messageService.pushMessage({title: 'Success', content: '报修修改成功', type: 'success'});
  }
  searchEquipmentName() {
    this.searchStream.next(this.repairCriteria);
  }
  showDetail(repair: Repair) {
    this.disable = true;
    this.f_Repair = repair;
    this.updateModal.show();
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
