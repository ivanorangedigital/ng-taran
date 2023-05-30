import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ShopService } from "src/app/services/shop.service";

@Component({
    standalone: true,
    templateUrl: './products.component.html',
    selector: 'app-products',
    imports: [
        CommonModule
    ]
})

export class ProductsComponent implements OnInit {
    @Input() id!: string;
    @Output() emitEvent = new EventEmitter();

    products$!: Observable<any[]>;

    constructor(private readonly shopService: ShopService) { }

    ngOnInit(): void {
        this.products$ = this.shopService.getProducts(this.id);
    }

    close() {
        this.emitEvent.emit();
    }
}