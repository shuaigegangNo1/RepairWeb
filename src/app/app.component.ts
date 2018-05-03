import { Component } from '@angular/core';
import {BaseAuthenticateComponent} from './common/component/BaseAuthenticateComponent';
import {Router} from '@angular/router';
import {MessageService} from './common/service/messageService';
import {NotificationsService} from 'angular2-notifications/dist';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
})
export class AppComponent extends BaseAuthenticateComponent {
  options: any = {timeOut: 3000};
  constructor(protected router: Router, protected a_notificationService: NotificationsService,
              private messageService: MessageService) {
    super(router, messageService);

    // display info
    this.messageService.messages$.subscribe(
        appMessage => {
          switch (appMessage.type) {
            case 'error': {
              console.log('enter error subscribe>>>', appMessage.content);
              this.a_notificationService.error(appMessage.title, appMessage.content);
              break;
            }
            case 'info': {
              this.a_notificationService.info(appMessage.title, appMessage.content);
              break;
            }
            case 'success': {
              this.a_notificationService.success(appMessage.title, appMessage.content);
              break;
            }
            case 'warn': {
              this.a_notificationService.warn(appMessage.title, appMessage.content);
              break;
            }
            case 'alert': {
              this.a_notificationService.alert(appMessage.title, appMessage.content);
              break;
            }
          }
        }
    );
  }
}
