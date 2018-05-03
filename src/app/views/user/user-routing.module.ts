import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './user.component';
import {UserDetailComponent} from './user.detail.component';
import {OrgChartComponent} from './orgChart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'User'
    }
  },
  {
    path: 'detail',
    component: UserDetailComponent,
    data: {
      title: 'UserDetail'
    }
  },
  {
    path: 'org',
    component: OrgChartComponent,
    data: {
      title: 'Org'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
