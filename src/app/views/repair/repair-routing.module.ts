import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepairDetailComponent} from "./repair.detail.component";
import {RepairListComponent} from "./repair.list.component";
import {AssertRepairListComponent} from "./assertRepair.list.component";
import {AssertRepairDetailComponent} from "./assertRepair.detail.component";


const routes: Routes = [
  {
    path: '',
    component: RepairListComponent,
    data: {
      title: 'RepairList'
    }
  },
  {
    path: 'history/:id',
    component: RepairListComponent,
    data: {
      title: 'HistoryRepairList'
    }
  },
  {
    path: 'create',
    component: RepairDetailComponent,
    data: {
      title: 'Create'
    }
  },
  {
    path: 'assertRepairList/:id',
    component: AssertRepairListComponent,
    data: {
      title: 'AssertRepairList'
    }
  },
  {
    path: 'approve/:id',
    component: AssertRepairDetailComponent,
    data: {
      title: 'Approve'
    }
  },
  {
    path: 'unHandledRepairList/:id',
    component: AssertRepairListComponent,
    data: {
      title: 'UnHandledRepairList'
    }
  },
  {
    path: 'historyRepairList/:id',
    component: AssertRepairListComponent,
    data: {
      title: 'HistoryRepairList'
    }
  },
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
