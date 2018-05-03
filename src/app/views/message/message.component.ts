/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit{
    message: string;
    returnUrl: string;
    constructor(protected router: Router,private activeRoute:ActivatedRoute) {

    }
    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            this.message = params['message'];
            this.returnUrl = params['url'];
        });
    }

    // initalParams() {
    //     this.message = "成功删除用户!";
    //     this.returnUrl = "/user";
    // }
}
