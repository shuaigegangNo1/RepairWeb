import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {ModalDirective} from 'ngx-bootstrap';
import {RMUserCriteria, User} from '../../common/entity/User';
import {UserService} from '../../common/service/userService';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {Subject} from 'rxjs/Subject';

@Component({
  templateUrl: 'user.component.html'
})
export class DashboardComponent extends CustomPaginationComponent implements OnInit {
  usersList: Array<any>;
  isUpdate: boolean;
  f_user: User;
  newUser: User = new User();
  userCriteria: RMUserCriteria = new RMUserCriteria();
  searchStream = new Subject<RMUserCriteria>();
  @ViewChild('updateModal') public updateModal: ModalDirective;
  @ViewChild('createModal') public createModal: ModalDirective;
  constructor(protected router: Router, protected messageService: MessageService,
              private userService: UserService) {
    super(router, messageService);
    this.getUserList();
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.searchStream
        .debounceTime(300)
        .switchMap(() => this.userService.getUserList(this.userCriteria)).subscribe(
        (res) => {
          this.usersList = res.result.content;
          this.totalItems[0] = res.result.totalElements;
          this.resetMaxSize(this.currentTab, this.userCriteria);
        }
    );
  }

  getUserList() {
    // Inital
    this.userCriteria.email = '';
    this.userService.getUserList(this.userCriteria).subscribe(res => {
      this.usersList = res.result.content;
      this.totalItems[0] = res.result.totalElements;
      this.resetMaxSize(this.currentTab, this.userCriteria);
    })
  }
  update(user: any) {
    this.f_user = user;
    this.isUpdate = true;
    this.updateModal.show();
  }
  submitUser() {
    if (this.isUpdate) {
      this.userService.update(this.f_user).subscribe(res => {
        this.updateModal.hide();
        this.messageService.pushMessage({title: 'Success', content: '用户修改成功', type: 'success'});
      })
    } else {
      this.userService.create(this.newUser).subscribe(
        res => {
          this.updateModal.hide();
          // this.messageService.pushMessage({title: 'Success', content: '用户创建成功', type: 'success'});
          window.location.reload();
        })

    }
  }
  create() {
    this.router.navigate(['/user/detail']);
    // this.router.navigate(['/user/org']);
  }
  delete(id: number) {
    this.userService.delete(id).subscribe(res => {
      // window.location.reload();
      this.messageService.pushMessage({title: 'Success', content: '用户删除成功', type: 'success'});
      this.router.navigate(['/message'],{queryParams:{'message':'成功删除用户!','url':'/user'}});
      // this.router.navigate(['/message']);
    })
  }
  pageChanged(event: any) {
    // this.userCriteria.skip = (event.page - 1) * this.userCriteria.pagesize;
    this.userCriteria.skip = event.page - 1;
    this.searchStream.next(this.userCriteria);
  }
  searchUserName() {
    this.searchStream.next(this.userCriteria);
  }
}
