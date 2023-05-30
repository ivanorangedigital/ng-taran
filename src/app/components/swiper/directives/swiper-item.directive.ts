import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[swiperItem]'
})

export class SwiperItemDirective {
    constructor(public tpl: TemplateRef<any>) { }
}