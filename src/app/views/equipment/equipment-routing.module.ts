import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EquipmentComponent} from './equipments.component';
import {EquipmentDetailComponent} from './equipment.detail.component';
import {UploadComponent} from './upload.component';
import {BarChartComponent} from './chart.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    data: {
      title: 'Equipment'
    }
  },
  {
    path: 'create/:id',
    component: EquipmentDetailComponent,
    data: {
      title: 'Create'
    }
  },
  {
    path: 'children/:id',
    component: EquipmentComponent,
    data: {
      title: 'Equipment'
    }
  },
  {
    path: 'upload/:id',
    component: UploadComponent,
    data: {
      title: 'Upload'
    }
  },
  {
    path: 'chart',
    component: BarChartComponent,
    data: {
      title: 'Chart'
    }
  },
  {
    path: 'update/:eid',
    component: EquipmentDetailComponent,
    data: {
      title: 'Update'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule {}
