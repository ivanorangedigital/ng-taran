import { CommonModule } from "@angular/common";
import { Component, Input, signal } from "@angular/core";
import { ProductsComponent } from "../products/products.component";
import { TranslateYAnimation, ngIfAnimation } from "src/app/animations/animation";
import { CategoryInterface } from "src/app/interfaces/category.interface";

@Component({
    standalone: true,
    templateUrl: './category.component.html',
    selector: 'app-category',
    imports: [
        CommonModule,
        ProductsComponent
    ],
    animations: [
        TranslateYAnimation,
        ngIfAnimation
    ]
})

export class CategoryComponent {
    @Input({ required: true }) category!: CategoryInterface;
    @Input({ required: true }) categories!: CategoryInterface[];

    // id of category
    id!: string;

    // if show products
    isOpen = signal(false);

    toggleCategory(id: string | undefined = undefined) {
        this.isOpen.update(
            isOpen => {
                if (id) this.id = id;
                return !isOpen;
            }
        );
    }
}