import { AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild } from "@angular/core";
import Swiper, { SwiperOptions } from "swiper";
import { SwiperItemDirective } from "./directives/swiper-item.directive";
import { SwiperDirective } from "./directives/swiper.directive";

@Component({
    selector: 'app-swiper',
    templateUrl: './swiper.component.html'
})

export class SwiperComponent implements AfterViewInit {
    @ViewChild(SwiperDirective) swiperDirective!: SwiperDirective;
    @ContentChildren(SwiperItemDirective) swiperItems!: QueryList<SwiperItemDirective>

    @Input() config?: SwiperOptions;
    swiper!: Swiper;

    ngAfterViewInit(): void {
        this.swiper = this.swiperDirective.swiper;
    }

    slideNext(speed?: number) {
        this.swiperDirective.slideNext(speed);
    }

    slidePrev(speed?: number) {
        this.swiperDirective.slidePrev(speed);
    }

    slideTo(index: number, speed?: number) {
        this.swiperDirective.slideTo(index, speed);
    }
}