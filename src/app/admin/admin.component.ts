import { Component, OnInit } from "@angular/core";
import { ShopService } from "../services/shop.service";
import { CategoryInterface } from "../interfaces/category.interface";
import { Observable } from "rxjs";
import { RouterModule } from "@angular/router";

@Component({
    standalone: true,
    templateUrl: './admin.component.html',
    imports: [
        RouterModule
    ]
})

export class AdminComponent implements OnInit {
    categories$!: Observable<CategoryInterface[]>;

    constructor(private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.categories$ = this.shopService.getCategories();
    }
}