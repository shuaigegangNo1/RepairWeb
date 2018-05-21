import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[appPositiveNumber]'
})
export class PositiveNumberDirective {

    @HostBinding('attr.min') min = "0";

    constructor(private el: ElementRef) {
    }


    @HostListener('change')
    onChange() {
        if (this.el.nativeElement.value < 0) {
            this.el.nativeElement.value = 0;
        }
    }
}
