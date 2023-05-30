import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CategoryComponent } from "../category/category.component";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ShopService } from "src/app/services/shop.service";
import { Opacity } from "src/app/animations/animation";
import { CategoriesDirective } from "./categories.directive";

@Component({
    standalone: true,
    templateUrl: './categories.component.html',
    imports: [
        CommonModule,
        CategoryComponent,
        CategoriesDirective
    ],
    animations: [
        Opacity
    ]
})
export class CategoriesComponent {
    categories$!: Observable<{
        name: string,
        id: string,
        image: null | { src: string },
        parent: null | string
    }[]>;

    // id per lasciare categoria selezionata
    id!: string | null;

    constructor(private readonly route: ActivatedRoute, private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(param => this.categories$ = this.shopService.getCategories(param.get('id')));
    }

    toggleCategories(evt: any) {
        if (evt === null) setTimeout(() => {
            this.id = evt;
        }, 200);
        else this.id = evt;
    }
}