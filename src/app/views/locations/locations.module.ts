import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {LocationComponent} from './locations.component';
import {LocationRoutingModule} from './locations-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule, PaginationModule, TabsModule} from 'ngx-bootstrap';
import {LocationDetailComponent} from './location.detail.component';
import {CabinetComponent} from './cabinet.component';
import {SharedModules} from '../../common/shareModule';

@NgModule({
  imports: [
    LocationRoutingModule,
    // BsDropdownModule,
    // CommonModule,
    // ModalModule.forRoot(),
    // FormsModule,
    // ReactiveFormsModule,
    // PaginationModule.forRoot(),
    SharedModules
  ],
  declarations: [ LocationComponent, LocationDetailComponent, CabinetComponent ]
})
export class LocationModule { }
