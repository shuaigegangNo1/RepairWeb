/**
 * Created by huangxuewen on 2017/11/4.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {BaseAuthenticateComponent} from "../common/component/BaseAuthenticateComponent";
import {User} from '../common/entity/User'
import {MessageService} from '../common/service/messageService';
@Component({
    selector: "login",
    templateUrl: "login.component.html"
})
export class AppLoginComponent extends BaseAuthenticateComponent {
    successURL = '/user';

    user: User = new User();

    constructor(protected a_router: Router, private messageService: MessageService) {
        super(a_router, messageService, false);
    }

    ngOnInit() {

    }

}