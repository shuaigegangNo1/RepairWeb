import {Component} from '@angular/core';
import {User} from '../../common/entity/User';
import {Repair} from "../../common/entity/Repair";
@Component({
    templateUrl: 'printer.component.html'
})
export class PrintModalComponent  {
    printCSS: string[];
    printStyle: string;
    printBtnBoolean = true;
    newUser: User = new User();
    repair : Repair = new Repair();
    constructor(
    ) {

        this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
        this.printStyle =
            `
             th, td {
                 color: black !important;
             }
             `;
        this.newUser.email = "sgggg@com";
        this.newUser.name = "366666";
        this .newUser.password ="121323";
    }
    printComplete() {
        this.printBtnBoolean = true;
    }
    beforePrint() {
        this.printBtnBoolean = false;
    }
}
