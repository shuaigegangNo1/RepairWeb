import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepairDetailComponent} from "./repair.detail.component";
import {RepairListComponent} from "./repair.list.component";


const routes: Routes = [
  {
    path: '',
    component: RepairListComponent,
    data: {
      title: 'RepairList'
    }
  },
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
