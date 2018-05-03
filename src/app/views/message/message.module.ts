import { NgModule } from '@angular/core';

import {SharedModules} from '../../common/shareModule';
import {MessageComponent} from './message.component';
import {AppMessageComponent} from '../../common/component/message/message.component';
import {MessageRoutingModule} from './message-routing.module';

@NgModule({
  imports: [
    MessageRoutingModule,
    SharedModules
  ],
  declarations: [MessageComponent, AppMessageComponent ]
})
export class MessageModule { }
