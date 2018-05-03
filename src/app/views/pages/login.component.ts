/**
 * Created by huangxuewen on 2018/4/18.
 */
import {Component, Input} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from '../../common/entity/User';
import {BaseReactiveFormComponent} from '../../common/component/BaseReactiveFormComponent';
import {MessageService} from '../../common/service/messageService';
import {LoginService} from '../../common/service/loginService';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent extends BaseReactiveFormComponent<User> {

    options: any = {timeOut: 3000};
    @Input() successURL: string;
    constructor(protected a_router: Router,
                protected _fb: FormBuilder,
                protected _messageService: MessageService,
                protected loginService: LoginService) {
        super(a_router,  _fb, _messageService, false);
        this.domainObject = new User();
        super.buildForm();
    }
    getFormErrors() {
        return {"username": "", "password": ""};
    }

    getValidationMessages() {
        return {
            "username": {
                "required": "用户名不能为空.",
                // "minlength": "Username must be at least 4 characters long.",
                "maxlength": "用户名不能超过24个字符.",
                // "forbiddenName": "Someone named \"jack\" cannot be a username."
            },
            "password": {
                "required": "密码不能为空."
            }
        };
    }

    _buildForm() {
        this.aForm = this.fb.group({
            "username": [this.domainObject.username, [
                Validators.required,
                // Validators.minLength(4),
                Validators.maxLength(24),
                // forbiddenNameValidator(/jack/i)
            ]
            ],
            "password": [this.domainObject.password, Validators.required],
        });
    }

    onSubmit() {
        super.onSubmit();
        this.login();
    }

    login() {
        if (this.domainObject.username === null || this.domainObject.password === null) {
            this.handleError("登录失败,请检查用户名及密码.");
        }
        else {
            this.successURL = '/user';
            //this._messageService.pushMessage({type: "login"});
            const user1 = {'name': this.domainObject.username, 'password' : this.domainObject.password}
            this.loginService.login(user1).subscribe(
                res => {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('loginUser', JSON.stringify(user1));
                    this.a_router.navigate([this.successURL]);
                },
                err => {
                    this.handleError('登录失败,请检查用户名及密码.');
                }
            )
        }
        // this._userService.login(this.domainObject.username, this.domainObject.password).subscribe(
        //     (result) => {
        //         localStorage.setItem("loginUser", JSON.stringify(result.detail));
        //         localStorage.setItem("token", result.token);
        //         this.a_router.navigate([this.successURL]);
        //     },
        //     err => {
        //         this.handleError("登录失败,请检查用户名及密码.");
        //     }
        // );
    }
}
