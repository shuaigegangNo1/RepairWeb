import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './user.component';
import { DashboardRoutingModule } from './user-routing.module';
import {CommonModule} from '@angular/common';
import {ModalModule, PaginationModule, TabsModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDetailComponent} from './user.detail.component';
import {OrgChartComponent} from './orgChart.component';
import {SharedModules} from '../../common/shareModule';

@NgModule({
  imports: [
    DashboardRoutingModule,
    // BsDropdownModule,
    // CommonModule,
    // ModalModule.forRoot(),
    // FormsModule,
    // ReactiveFormsModule,
    // PaginationModule.forRoot(),
    // TabsModule.forRoot(),
    SharedModules
  ],
  declarations: [ DashboardComponent, UserDetailComponent, OrgChartComponent ]
})
export class UserModule { }
