/**
 * Created by huangxuewen on 2018/4/24.
 */
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {SimpleNotificationsModule} from "angular2-notifications";
import {BsDropdownModule, ModalModule, TabsModule, SortableModule, PaginationModule} from 'ngx-bootstrap';
import {RolePipe} from "./pipe/role.pipe";
import {RepairStatusPipe} from "./pipe/repairStatus.pipe";
import {AreaPipe} from "./pipe/area.pipe";
import {TinymceComponent} from "./component/tinymce/tinymce.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        // HttpModule,
        FormsModule,
        ReactiveFormsModule,
        SimpleNotificationsModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        SortableModule.forRoot(),
        PaginationModule.forRoot(),
    ],
    declarations: [RolePipe, AreaPipe, RepairStatusPipe, TinymceComponent],
    exports: [CommonModule,
        FormsModule,
        RouterModule,
        // HttpModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,
        ModalModule,
        BsDropdownModule,
        TabsModule,
        SortableModule,
        PaginationModule,
        RolePipe,
        AreaPipe,
        RepairStatusPipe,
        TinymceComponent
        ]
})
export class SharedModules {
}
