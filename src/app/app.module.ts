import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
} from './components';

const APP_COMPONENTS = [
  AppSidebarComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV

]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import {MessageService} from './common/service/messageService';
import {NotificationsService} from 'angular2-notifications/dist';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppLoginComponent} from './login/login.component';
import {LoginComponent} from './views/pages/login.component';
import {LoginService} from './common/service/loginService';
import {HttpModule} from '@angular/http';
import {UserService} from './common/service/userService';
import {FileService} from './common/service/fileService';
import {SharedModules} from './common/shareModule';
import {RepairService} from "./common/service/repairService";
import {RepairRecordService} from "./common/service/repairRecordService";
import {EvaluateService} from "./common/service/evaluateService";
import {MaterialService} from "./common/service/materialService";
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModules
  ],
  declarations: [
    AppComponent,
    AppLoginComponent,
      LoginComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    MessageService,
    NotificationsService,
    LoginService,
    UserService,
    FileService,
    RepairService,
    RepairRecordService,
    EvaluateService,
    MaterialService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
