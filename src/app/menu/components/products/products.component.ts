import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { Opacity, ngIfAnimation, openMenu } from "src/app/animations/animation";
import { CategoryInterface } from "src/app/interfaces/category.interface";
import { ShopService } from "src/app/services/shop.service";

@Component({
    standalone: true,
    templateUrl: './products.component.html',
    selector: 'app-products',
    imports: [
        CommonModule
    ],
    animations: [
        Opacity,
        openMenu,
        ngIfAnimation
    ]
})

export class ProductsComponent implements OnInit {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) categories!: CategoryInterface[];

    @Output() emitEvent = new EventEmitter();

    products$!: Observable<any[]>;
    refreshProducts$ = new BehaviorSubject(true);

    constructor(private readonly shopService: ShopService, private readonly route: ActivatedRoute, private readonly router: Router) { }

    ngOnInit(): void {
        this.products$ = this.refreshProducts$.pipe(
            switchMap(_=> this.shopService.getProducts(this.id))
        );
    }

    close() {
        const isHybrid = this.route.snapshot.queryParamMap.get('hybrid') === 'true';

        if (isHybrid) {
            this.router.navigateByUrl('/menu');
        } else {
            this.emitEvent.emit();
        }
    }

    changeCategory(id: string) {
        this.id = id;
        this.refreshProducts$.next(true);
    }
}