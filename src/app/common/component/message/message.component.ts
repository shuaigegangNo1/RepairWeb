/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-message',
    templateUrl: 'message.component.html'
})
export class AppMessageComponent {
    @Input() message: String;
    @Input() returnUrl: String;
    constructor(protected router: Router) { }
    jump(url:string) {
        this.router.navigate([url]);
    }
}
