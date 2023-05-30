import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { map, Observable } from "rxjs";
import { SwiperOptions } from "swiper";
import { SectionComponent } from "../components/section/section.component";
import { SwiperModule } from "../components/swiper/swiper.module";
import { MediaService } from "../services/media.service";

@Component({
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        CommonModule,
        RouterModule,
        SectionComponent,
        SwiperModule
    ]
})

export class HomeComponent implements OnInit {
    config: SwiperOptions = {
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 24
            }, 768: {
                slidesPerView: 2,
                spaceBetween: 24
            }, 1024: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        },
        navigation: true,
        autoplay: {
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            delay: 3000
        }
    }

    headerHeight!: number;
    images!: Observable<any[]>;

    constructor(private readonly mediaService: MediaService) { }

    ngOnInit(): void {
        this.images = this.mediaService.getMedia(1, 12).pipe(map(res => res.images));
        this.headerHeight = Number(localStorage.getItem('HEADER_HEIGHT'));
    }
}