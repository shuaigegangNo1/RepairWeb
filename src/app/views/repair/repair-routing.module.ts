import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepairDetailComponent} from "./repair.detail.component";
import {RepairListComponent} from "./repair.list.component";
import {AssertRepairListComponent} from "./assertRepair.list.component";
import {AssertRepairDetailComponent} from "./assertRepair.detail.component";
import {RepairRecordListComponent} from "./repairRecord.list.component";
import {RepairRecordDetailComponent} from "./repairRecord.detail.component";
import {EvaluateDetailComponent} from "./evaluate.detail.component";
import {PrintModalComponent} from "./printer.component";
import {UploadFileComponent} from "./uploadfile.component";


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
    path: 'evaluate/:id',
    component: RepairListComponent,
    data: {
      title: 'EvaluateRepairList'
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
    path: 'evaluateRepairList/:id',
    component: AssertRepairListComponent,
    data: {
      title: 'EvaluateRepairList'
    }
  },
  {
    path: 'historyRepairList/:id',
    component: AssertRepairListComponent,
    data: {
      title: 'HistoryRepairList'
    }
  },
  {
    path: 'repairRecordList/:id',
    component: RepairRecordListComponent,
    data: {
      title: 'RepairRecordList'
    }
  },
  {
    path: 'createRepairRecord/:id',
    component: RepairRecordDetailComponent,
    data: {
      title: 'CreateRepairRecord'
    }
  },
  {
    path: 'createEvaluate',
    component: EvaluateDetailComponent,
    data: {
      title: 'CreateEvaluate'
    }
  },
  {
    path: 'print/:id',
    component: PrintModalComponent,
    data: {
      title: 'Print'
    }
  },
  {
    path: 'upload/:id',
    component: UploadFileComponent,
    data: {
      title: 'Upload'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule {}
