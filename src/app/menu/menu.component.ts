import { Component, OnInit } from "@angular/core";
import { ShopService } from "../services/shop.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
    standalone: true,
    templateUrl: './menu.component.html',
    imports: [
        CommonModule,
        RouterModule
    ]
})

export class MenuComponent implements OnInit {
    categories$!: Observable<{
        name: string,
        id: string,
        image: null | { src: string },
        parent: null | string
    }[]>;
    
    constructor(private readonly shopService: ShopService, private readonly router: Router) { }

    ngOnInit(): void {
        this.categories$ = this.shopService.getCategories();
    }

    openCategory(id: string) {
        this.router.navigate(['menu', id]);
    }
    
}