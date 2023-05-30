import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { CategoryInterface } from "src/app/interfaces/category.interface";
import { ShopService } from "src/app/services/shop.service";

@Component({
    standalone: true,
    templateUrl: './piatti.component.html',
    imports: [
        CommonModule
    ]
})

export class AdminPiattiComponent implements OnInit {
    categories$!: Observable<CategoryInterface[]>;
    subCategories$!: Observable<CategoryInterface[]>;

    refreshProducts$ = new BehaviorSubject(true);
    products$!: Observable<any[]>;

    categoryId!: string;

    constructor(private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.categories$ = this.shopService.getCategories();
    }

    openSubCategories(id: string) {
        this.subCategories$ = this.shopService.getCategories(id);
    }

    openProducts(category: string) {
        this.products$ = this.refreshProducts$.pipe(
            switchMap(_ => this.shopService.getProducts(category))
        );
        this.categoryId = category;
    }

    addProduct() {
        const name = prompt('nome piatto');
        if (!name) return;
        const price = Number(prompt('prezzo'));
        if (!price) return;
        const description = prompt('descrizione')
        const category = this.categoryId;

        this.shopService.createProduct({
            name, price, description, category
        }).subscribe(() => this.refreshProducts$.next(true));
    }

    productOption(id: string) {
        const select = prompt('digitare "elimina" per eliminare, altrimenti lasciare vuoto');
        if (select === 'elimina') this.shopService.deleteProductById(id).subscribe(res => {
            this.refreshProducts$.next(true);
            alert(`prodotto ${res.name} eliminato correttamente`);
        })
    }
}