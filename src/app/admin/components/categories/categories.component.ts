import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom, switchMap } from "rxjs";
import { CategoryInterface } from "src/app/interfaces/category.interface";
import { ShopService } from "src/app/services/shop.service";

@Component({
    standalone: true,
    templateUrl: './categories.component.html',
    imports: [
        CommonModule
    ]
})
export class AdminCategoriesComponent implements OnInit {
    categories$!: Observable<CategoryInterface[]>;

    refreshSubCategories$ = new BehaviorSubject(true);
    subCategories$!: Observable<CategoryInterface[]>;

    constructor(private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.shopService.getCategories().subscribe(
            res => {
                res.forEach(async (category, i) => {
                    const sub = await lastValueFrom(this.shopService.getCategories(category.id));
                    if (sub.length > 0) category['sub'] = sub;
                });
                console.log(res);
                
            }
        )
    }

    openSubCategories(id: string) {
        const selection = prompt('digitare "add" per aggiungere le sotto sottocategorie, altrimenti non digitare niente per visualizzare le sottocategorie');
        if (selection === 'add') {
            let name = prompt('inserire nome: ')
            const parent = id;

            if (name) this.shopService.createCategory({ name, parent }).subscribe(res => alert(`categoria ${name} creata correttamente`));
            else this.refreshSubCategories$.next(true);
        } else {
            this.subCategories$ = this.refreshSubCategories$.pipe(
                switchMap(_ => this.shopService.getCategories(id))
            );
        }
    }

    deleteCategory(id: string) {
        const selection = prompt('digitare "elimina" per eliminare, altrimenti non digitare niente');
        if (selection === 'elimina') this.shopService.deleteCategoryById(id).subscribe(() => {
            this.refreshSubCategories$.next(true);
        });
    }

    addMainCategory() {
        const name = prompt('inserire nome categoria principale');
        this.shopService.createCategory({ name }).subscribe(() => {
            this.categories$ = this.shopService.getCategories();
        });
    }

}