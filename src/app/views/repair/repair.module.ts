import { NgModule } from '@angular/core';

import {RepairRoutingModule} from './repair-routing.module';
import {AccordionModule, BsDatepickerModule, CarouselModule} from 'ngx-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SharedModules} from '../../common/shareModule';
import {TinymceComponent} from '../../common/component/tinymce/tinymce.component';
import {RepairDetailComponent} from "./repair.detail.component";
import {RepairListComponent} from "./repair.list.component";
import {AssertRepairListComponent} from "./assertRepair.list.component";
import {AssertRepairDetailComponent} from "./assertRepair.detail.component";
import { RatingModule } from 'ngx-bootstrap/rating';
import {RepairRecordListComponent} from "./repairRecord.list.component";
import {RepairRecordDetailComponent} from "./repairRecord.detail.component";
import {EvaluateDetailComponent} from "./evaluate.detail.component";
@NgModule({
  imports: [
    RepairRoutingModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    NgxChartsModule,
    SharedModules,
    RatingModule.forRoot(),
    AccordionModule.forRoot()
  ],
  declarations: [
      RepairDetailComponent, RepairListComponent,
      AssertRepairListComponent, AssertRepairDetailComponent,
      RepairRecordListComponent, RepairRecordDetailComponent,
      EvaluateDetailComponent]
})
export class RepairModule { }
