/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../common/entity/User';
import {MessageService} from '../../common/service/messageService';
import {UserService} from '../../common/service/userService';
@Component({
    selector: 'app-user-detail',
    templateUrl: 'user.detail.component.html'
})
export class UserDetailComponent {
    constructor(protected router: Router, private messageService: MessageService, private userService: UserService) {
        // super(router, messageService);
        // this.getUpdateToDateUser();
    }

    user: User = new User();
    newPwd: string = null;
    repeatPwd: string = null;
    loginUser: User;
    passWdActive: boolean = false;

    checkAndUpdate() {
        if (this.passWdActive) {
            // update password
            if (this.newPwd && this.repeatPwd) {
                if (this.newPwd !== this.repeatPwd) {
                    this.messageService.pushMessage({
                        title: "密码不一致",
                        content: `两次输入的密码不一致！`,
                        type: "alert"
                    });
                } else {
                    this.updateUser();
                }
            } else {
                this.messageService.pushMessage({
                    title: "信息不能为空",
                    content: `请输入密码！`,
                    type: "alert"
                });
            }
        }else {
            // create new user
            this.createUser();
        }
    }

    updateUser() {

        let userToUpdate: any = {
            id: this.loginUser.id,
            username: this.loginUser.username,
            // role: this.user.role
            // description: this.loginUser.description
        };

        if (this.newPwd && this.repeatPwd && this.newPwd === this.repeatPwd) {
            userToUpdate.password = this.newPwd;
        }

        // this.userService.update(userToUpdate as User).subscribe(
        //     () => {
        //         this.messageService.pushMessage({
        //             title: "更新成功",
        //             content: `个人信息已更新`,
        //             type: "success"
        //         });
        //
        //         this.router.navigate(['/user']);
        //     },
        //     err => this.handleError(err)
        // );
    }

    // getUpdateToDateUser() {
    //     this.userService.get(this.loginUser.id).subscribe(
    //         (user) => {
    //             this.loginUser = user;
    //         }
    //     )
    // }
    createUser() {
        this.userService.create(this.user).subscribe(
            res => {
                this.messageService.pushMessage({title: 'Success', content: '用户创建成功', type: 'success'});
                this.router.navigate(['/user']);
            })
    }
}
