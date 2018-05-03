import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {MessageComponent} from './message.component';

const routes: Routes = [
  {
    path: '',
    component: MessageComponent,
    data: {
      title: 'Message'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule {}
