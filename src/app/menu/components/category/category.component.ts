import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductsComponent } from "../products/products.component";
import { TranslateYAnimation } from "src/app/animations/animation";

@Component({
    standalone: true,
    templateUrl: './category.component.html',
    selector: 'app-category',
    imports: [
        CommonModule,
        ProductsComponent
    ],
    animations: [
        TranslateYAnimation
    ]
})

export class CategoryComponent {
    @Output() emitEvent = new EventEmitter();
    @Input() category!: {
        name: string,
        id: string,
        image: null | { src: string },
        parent: null | string
    };
    id!: string;
    // if show products
    isOpen = false;

    openCategory(id: string) {
        this.emitEvent.emit(id);
        this.id = id;        
        this.isOpen = true;
    }

    closeCategory() {
        this.emitEvent.emit(null);
        this.isOpen = false;
    }
}