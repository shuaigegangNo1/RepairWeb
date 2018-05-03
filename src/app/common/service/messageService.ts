import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class MessageService {
  private messageSource = new Subject<AppMessage>();

  messages$ = this.messageSource.asObservable();

  pushMessage(appMessage: AppMessage) {
    if (!appMessage.type) {
      appMessage.type = "info";
    }
    this.messageSource.next(appMessage);
  }
}

export class AppMessage {
  title?: string;
  content?: string;
  type?: "info" | "error" | "success" | "alert" | "warn" | "task" | "login" | "logout";
}
