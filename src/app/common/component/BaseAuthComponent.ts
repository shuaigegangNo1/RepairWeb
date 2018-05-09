/**
 * Created by huangxuewen on 2018/5/5.
 */
import {AfterViewInit, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MessageService} from "../service/messageService";
import {User} from "../entity/User";


export abstract class BaseAuthComponent implements AfterViewInit, OnInit {
    loginUser: User;
    token: string;
    options: any = {timeOut: 3000};

    constructor(protected a_router: Router, private a_messageService: MessageService, authentication: boolean = true) {
        this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
        this.token = localStorage.getItem("token");
        if (authentication) {
            this.jumpToLoginIfNotAuthenticate();
        }
    }

    ngOnInit() {
        // do nothing now
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
        if (!this.loginUser || !this.token) {
            this.a_router.navigate(["/login"]);
        }
    }

    handleError(message) {
        this.a_messageService.pushMessage({title: "Error", content: message, type: "error"});
    }
}
