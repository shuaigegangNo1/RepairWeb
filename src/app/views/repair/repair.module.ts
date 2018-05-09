import { NgModule } from '@angular/core';

import {RepairRoutingModule} from './repair-routing.module';
import {BsDatepickerModule, CarouselModule} from 'ngx-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SharedModules} from '../../common/shareModule';
import {TinymceComponent} from '../../common/component/tinymce/tinymce.component';
import {RepairDetailComponent} from "./repair.detail.component";
import {RepairListComponent} from "./repair.list.component";
import {AssertRepairListComponent} from "./assertRepair.list.component";
import {AssertRepairDetailComponent} from "./assertRepair.detail.component";
import { RatingModule } from 'ngx-bootstrap/rating';
@NgModule({
  imports: [
    RepairRoutingModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    NgxChartsModule,
    SharedModules,
    RatingModule.forRoot()
  ],
  declarations: [ RepairDetailComponent, RepairListComponent,
    AssertRepairListComponent, AssertRepairDetailComponent ]
})
export class RepairModule { }
