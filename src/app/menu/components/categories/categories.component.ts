import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CategoryComponent } from "../category/category.component";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ShopService } from "src/app/services/shop.service";
import { Opacity } from "src/app/animations/animation";
import { CategoryInterface } from "src/app/interfaces/category.interface";
import { ProductsComponent } from "../products/products.component";

@Component({
    standalone: true,
    templateUrl: './categories.component.html',
    imports: [
        CommonModule,
        ProductsComponent,
        CategoryComponent
    ],
    animations: [
        Opacity
    ]
})
export class CategoriesComponent {
    categories$ = new BehaviorSubject<CategoryInterface[]>([]);
    id$ = new BehaviorSubject<string | null>(null);

    constructor(private readonly route: ActivatedRoute, private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            param => {
                const hybrid = this.route.snapshot.queryParamMap.get('hybrid') === 'true';
                const id = param.get('id') as string;

                this.shopService.getCategories(id).subscribe(
                    res => {
                        this.categories$.next(res);

                        if (hybrid) {
                            this.id$.next(id);
                        } else {
                            this.id$.next(null);
                        }
                    }
                );

            }
        );
    }
}