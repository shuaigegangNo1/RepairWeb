import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {EquipmentComponent} from './equipments.component';
import {EquipmentRoutingModule} from './equipment-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, CarouselModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import {EquipmentDetailComponent} from './equipment.detail.component';
import {UploadComponent} from './upload.component';
import {BarChartComponent} from './chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModules} from '../../common/shareModule';
import {TinymceComponent} from '../../common/component/tinymce/tinymce.component';
@NgModule({
  imports: [
    EquipmentRoutingModule,
    // BsDropdownModule,
    // CommonModule,
    // ModalModule.forRoot(),
    // FormsModule,
    // ReactiveFormsModule,
    // PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    NgxChartsModule,
    SharedModules
    // BrowserModule,
    // BrowserAnimationsModule
  ],
  declarations: [ EquipmentComponent, EquipmentDetailComponent, UploadComponent,
    BarChartComponent, TinymceComponent ]
})
export class EquipmentModule { }
