import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepairDetailComponent} from "./repair.detail.component";


const routes: Routes = [
  {
    path: 'create',
    component: RepairDetailComponent,
    data: {
      title: 'Create'
    }
  },
  // {
  //   path: 'children/:id',
  //   component: EquipmentComponent,
  //   data: {
  //     title: 'Equipment'
  //   }
  // },
  // {
  //   path: 'upload/:id',
  //   component: UploadComponent,
  //   data: {
  //     title: 'Upload'
  //   }
  // },
  // {
  //   path: 'chart',
  //   component: BarChartComponent,
  //   data: {
  //     title: 'Chart'
  //   }
  // },
  // {
  //   path: 'update/:eid',
  //   component: EquipmentDetailComponent,
  //   data: {
  //     title: 'Update'
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule {}
