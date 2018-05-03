import {AfterViewInit, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MessageService} from '../service/messageService';

export abstract class BaseAuthenticateComponent implements AfterViewInit, OnInit {

    loginUser: any;
    token: string;
    options: any = {timeOut: 3000};

    public maxSize = 5;
    public bigTotalItems = 100;
    public bigCurrentPage = 1;
    public numPages = 0;
    public firstText = '首页';
    public lastText = '尾页';
    public previousText = '上一页';
    public nextText = '下一页';

    constructor(protected a_router: Router, protected a_messageService: MessageService,
                authentication: boolean = true) {
        this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
        this.token = localStorage.getItem("token");
        if (authentication) {
            this.jumpToLoginIfNotAuthenticate();
        }
    }

    ngOnInit() {
       // this.asideService.pushMessage({type: 'hide'});
    }

    ngAfterViewInit() {
        // do nothing now
    }

    updateLocalUser() {
        localStorage.setItem("loginUser", JSON.stringify(this.loginUser));
    }

    refreshLocalUser() {
        this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
    }

    jumpToLoginIfNotAuthenticate() {
        if (!this.loginUser/* || !this.token*/) {
            this.a_router.navigate(["/login"]);
        } else {
           // this.a_messageService.pushMessage({type: "login"});
        }
    }

    handleError(message) {
        this.a_messageService.pushMessage({title: "Error", content: message, type: "error"});
    }
}
