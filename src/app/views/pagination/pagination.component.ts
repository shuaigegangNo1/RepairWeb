/**
 * Created by huangxuewen on 2018/3/30.
 */

import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {BaseCriteria} from '../../common/entity/BaseCriteria';

export abstract class CustomPaginationComponent  implements OnInit {

    currentTab = 0;

    currentPage: number[] = [];
    numPages: number[] = [];
    totalItems: number[] = [];

    maxSize: number;
    firstText: string;
    lastText: string;
    previousText: string;
    nextText: string;

    constructor(protected router: Router, protected messageService: MessageService) {
    }

    ngOnInit() {
        // super.ngOnInit();
        this.initPaginationParams();
        this.customInitParams(); // 子类有多个tab页时可再定制另外的initPaginationParams(){}
    }

    initPaginationParams() {
        this.currentPage[0] = 1;
        this.numPages[0] = 1;
        this.totalItems[0] = 0;
        this.maxSize = 5;
        this.firstText = "首页";
        this.lastText = "尾页";
        this.previousText = "上一页";
        this.nextText = "下一页";
    }

    customInitParams() {

    }

    abstract pageChanged(event);

    resetSkip(tab: number, criteria: BaseCriteria) {
        this.currentPage[tab] = 1; // 从第一页开始显示
        criteria.skip = 0; // 从数组第一个元素开始拿数据
    }

    resetMaxSize(tab: number, criteria: BaseCriteria) {
        if (this.totalItems[tab] > 0) {
            this.numPages[tab] = Math.ceil(this.totalItems[tab] / criteria.pagesize);
        }
        this.maxSize = this.numPages[tab] < 5 ? this.numPages[tab] : 5;
    }

}
