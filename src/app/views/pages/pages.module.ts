/**
 * Created by huangxuewen on 2018/4/18.
 */
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [ PagesRoutingModule ],
    declarations: [
        // LoginComponent
    ]
})
export class PagesModule { }
