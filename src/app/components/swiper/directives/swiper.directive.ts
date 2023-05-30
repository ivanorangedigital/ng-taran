import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import Swiper, { SwiperOptions } from "swiper";

@Directive({
    selector: '[swiper]'
})

export class SwiperDirective implements OnInit {
    @Input('config') config?: SwiperOptions;

    swiper!: Swiper;

    constructor(private swiperElement: ElementRef) { }

    ngOnInit(): void {
        // assign params to swiper element
        Object.assign(this.swiperElement.nativeElement, {
            ...this.config, injectStyles: [`.swiper-button-next, .swiper-button-prev { color: yellow }`]
        });
        // initialize swiper
        this.swiperElement.nativeElement.initialize();
        // reference to swiper
        this.swiper = this.swiperElement.nativeElement.swiper;
    }

    slideNext(speed = 300) {
        this.swiperElement.nativeElement.swiper.slideNext(speed);
    }

    slidePrev(speed = 300) {
        this.swiperElement.nativeElement.swiper.slidePrev(speed);
    }

    slideTo(index: number, speed = 300) {
        this.swiperElement.nativeElement.swiper.slideTo(index, speed);
    }

}