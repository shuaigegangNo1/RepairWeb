import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {LocationComponent} from './locations.component';
import {LocationDetailComponent} from './location.detail.component';
import {CabinetComponent} from './cabinet.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    data: {
      title: 'Location'
    }
  },
  {
    path: 'create',
    component: LocationDetailComponent,
    data: {
      title: 'Create'
    }
  },
  {
    path: 'create/:id',
    component: LocationDetailComponent,
    data: {
      title: 'Create'
    }
  },
  {
    path: 'children/:id',
    component: CabinetComponent,
    data: {
      title: 'Children'
    }
  },
  // {
  //   path: 'tree',
  //   component: DemoComponent,
  //   data: {
  //     title: 'Tree'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {}
