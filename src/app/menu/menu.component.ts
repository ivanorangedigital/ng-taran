import { Component, OnInit } from "@angular/core";
import { ShopService } from "../services/shop.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SwiperModule } from "../components/swiper/swiper.module";
import { SwiperOptions } from "swiper";
import { CategoryInterface } from "../interfaces/category.interface";

@Component({
    standalone: true,
    templateUrl: './menu.component.html',
    imports: [
        CommonModule,
        RouterModule,
        SwiperModule
    ]
})

export class MenuComponent implements OnInit {
    config: SwiperOptions = {
        breakpoints: {
            0: {
                slidesPerView: 2
            }, 768: {
                slidesPerView: 3
            }, 1024: {
                slidesPerView: 4
            }
        },
        spaceBetween: 24,
        navigation: true
    }

    categories$!: Observable<CategoryInterface[]>;
    
    constructor(private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.categories$ = this.shopService.getCategories();
    }
}