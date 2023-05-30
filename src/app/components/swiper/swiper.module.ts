import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SwiperItemDirective } from "./directives/swiper-item.directive";
import { SwiperDirective } from "./directives/swiper.directive";
import { SwiperComponent } from "./swiper.component";

@NgModule({
    declarations: [
        SwiperComponent,
        SwiperDirective,
        SwiperItemDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SwiperItemDirective,
        SwiperComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class SwiperModule { }