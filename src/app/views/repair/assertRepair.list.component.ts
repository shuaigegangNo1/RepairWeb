import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {Subject} from 'rxjs/Subject';
import {Repair, RepairCriteria} from '../../common/entity/Repair';
import {RepairService} from '../../common/service/repairService';
import {Evaluate} from '../../common/entity/Evaluate';
import {EvaluateService} from '../../common/service/evaluateService';
import { utils, write, WorkBook, readFile } from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  templateUrl: 'assertRepair.list.component.html'
})
export class AssertRepairListComponent extends CustomPaginationComponent implements OnInit, OnChanges {
  repairList: Array<Repair>;
  page  = 0;
  repairCriteria: RepairCriteria = new RepairCriteria();
  f_Repair: Repair = new Repair();
  f_Evaluate: Evaluate = new Evaluate();
  searchStream = new Subject<RepairCriteria>();
  disable: boolean;
  showDisable: boolean;
  loginUser: any;
  showFinishTime: boolean;
  table = [
    {
      姓名: '许士国',
      性别: '男',
      年龄: '18',
      年级: '大一',
      爱好: '打球'
    },
    {
      姓名: '苏昕',
      性别: '女',
      年龄: '16',
      年级: '六年级',
      爱好: '弹钢琴'
    },
  ];
  sno: any;
  @ViewChild('updateModal') public updateModal: ModalDirective;
  @ViewChild('showModal') public showModal: ModalDirective;
  constructor(protected router: Router, protected messageService: MessageService,
              private repairService: RepairService, private evaluateService: EvaluateService,
              private route: ActivatedRoute) {
    super(router, messageService);
    if (this.route.snapshot.params['id']) {
      this.repairCriteria.repair_status = this.route.snapshot.params['id'];
      if (+this.repairCriteria.repair_status === 4) {
        this.showFinishTime = true;
      }else {
        this.showFinishTime = false;
      }
    }
    this.sno = JSON.parse(localStorage.getItem('sno'));
    // this.loginUser = JSON.parse(localStorage.getItem('loginUser'));
    // this.repairCriteria.userName = this.loginUser.name;
    if (this.sno === 'padmin') {
      this.repairCriteria.area = '10';
    } else if (this.sno === 'iadmin') {
      this.repairCriteria.area = '11'
      this.repairCriteria.userName = 'iadmin'
    } else if (this.sno === 'oadmin') {
      this.repairCriteria.area = '20'
    } else if (this.sno === 'eadmin') {
      this.repairCriteria.area = '30'
    } else if (this.sno === 'cadmin') {
      this.repairCriteria.area = '40'
    } else if (this.sno === 'sadmin') {
      this.repairCriteria.area = '10'
      this.repairCriteria.userName = 'sadmin'
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
  showRepair(repair: Repair) {
    this.disable = true;
    this.f_Repair = repair;
    this.updateModal.show();
  }
  addRepairItem(repair: Repair) {
    this.router.navigate(['/repair/createRepairRecord', repair.id]);
  }
  checkRepairRecord(repair: Repair) {
    this.router.navigate(['/repair/repairRecordList', repair.id]);
  }
  evaluateRepair(repair: Repair) {
    this.router.navigate(['/repair/createEvaluate'], {queryParams: {'id': repair.id, 'rate': repair.rate}});
  }
  showEvaluate(repair: Repair) {
    this.evaluateService.getEvaluateDetail(repair.id).subscribe(res => {
      this.f_Evaluate = res.result;
      this.showDisable = true;
      this.showModal.show();
    })
  }
  JumpToPrint(repair: Repair) {
    this.router.navigate(['/repair/print', repair.id]);
  }

  export() {
    const ws_name = '用户信息';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.table);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'data.xlsx');
  }
  // readXlsFile() {
  //   // let wb1: WorkBook = { SheetNames: [], Sheets: {} };
  //  const  wb1 = readFile('../../../assets/file/data.xlsx')
  //   const worksheet = wb1.Sheets['用户信息'];
  //   console.log(utils.sheet_to_json(worksheet,{raw: true}));
  // }
}
