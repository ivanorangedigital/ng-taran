import { CommonModule } from "@angular/common";
import { ElementRef, QueryList, ViewChildren, signal } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, forkJoin, lastValueFrom } from "rxjs";
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
    categories = signal<CategoryInterface[]>([]);

    refreshSubCategories$ = new BehaviorSubject(true);
    subCategories$!: Observable<CategoryInterface[]>;

    @ViewChildren('dap') elements!: QueryList<ElementRef<HTMLLIElement>>;

    constructor(private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.shopService.getCategories().subscribe(
            res => {
                res.forEach(async (category) => {
                    const sub = await lastValueFrom(this.shopService.getCategories(category.id));
                    if (sub.length > 0) category.sub = sub;
                });
                this.categories.set(res);
                console.log(this.categories());
                
                setTimeout(() => this.addEventListener(), 100);
            }
        );
    }

    addEventListener(): void {
        const items = this.elements.toArray();        

        let sourceEl: null | string = null;
        let targetEl: null | string = null;

        items.forEach(item => {
            item.nativeElement.addEventListener('dragstart', (evt: any) => {
                // set source el
                sourceEl = evt.target.id;

                // add opacity
                item.nativeElement.style.opacity = '0.4';
            });
            item.nativeElement.addEventListener('dragover', (evt: any) => {
                evt.preventDefault();
            });
            item.nativeElement.addEventListener('drop', (evt: any) => {
                evt.preventDefault();

                let target = evt.target;

                while (!target.classList.contains('dropzone')) {
                    target = target.parentElement;
                };

                targetEl = target.id;

            });
            item.nativeElement.addEventListener('dragend', () => {
                // remove opacity
                item.nativeElement.style.opacity = '1';

                // call function to update

                if (sourceEl && targetEl) {
                    const source = sourceEl.split('-');
                    const target = targetEl.split('-');

                    // index della categoria principale
                    const sourceMainIndex = Number(source[0]);
                    const targetMainIndex = Number(target[0]);

                    if (sourceMainIndex !== targetMainIndex) {
                        sourceEl = null;
                        targetEl = null;
                        return;
                    };

                    // index della sottocategoria
                    const sourceSubIndex = Number(source[1]);
                    const targetSubIndex = Number(target[1]);                    

                    // id della sottocategoria
                    const sourceId = source[2];
                    const targetId = target[2];

                    // position delle sottocategorie
                    const sourcePosition = this.categories()[sourceMainIndex].sub![sourceSubIndex].position;
                    const targetPosition = this.categories()[targetMainIndex].sub![targetSubIndex].position;                    

                    forkJoin([
                        this.shopService.updateCategory(sourceId, { position: targetPosition }),
                        this.shopService.updateCategory(targetId, { position: sourcePosition })
                    ]).subscribe(() => {                                                
                        this.categories.mutate(categories => {
                            categories[sourceMainIndex].sub![sourceSubIndex].position = targetPosition;
                            categories[targetMainIndex].sub![targetSubIndex].position = sourcePosition;

                            categories[sourceMainIndex].sub!.sort((a, b) => {
                                return a.position! - b.position!
                            })
                        });
                    });
                }

                // reset variables
                sourceEl = null;
                targetEl = null;
            });
        });

    }

    deleteCategory(id: string, parent: string) {
        this.shopService.deleteCategoryById(id).subscribe(() => {
            this.categories.mutate(categories => {
                const mainIndex = categories.findIndex(c => c.id === parent);
                const subIndex = categories[mainIndex].sub!.findIndex(c => c.id === id);
                categories[mainIndex].sub!.splice(subIndex, 1);
            });
        });
    }

    addCategory(parent: string) {
        const name = prompt('inserire nome categoria');
        this.shopService.createCategory({ name, parent }).subscribe(res => {
            this.categories.mutate(categories => {
                const mainIndex = categories.findIndex(c => c.id === parent);

                try {
                    categories[mainIndex].sub!.push(res);
                } catch {
                    categories[mainIndex].sub = [res];
                }

                window.location.reload();
                
            });
        });
    }

}