import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
    standalone: true,
    selector: '[categoriesDirective]'
})

export class CategoriesDirective implements AfterViewInit {
    constructor(private readonly el: ElementRef<HTMLDivElement>) { }

    ngAfterViewInit(): void {
        const height = this.el.nativeElement.getBoundingClientRect().height;        
        this.el.nativeElement.style.setProperty('height', `${height}px`);
    }
}