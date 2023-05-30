import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryInterface } from "../interfaces/category.interface";

@Injectable({
    providedIn: 'root'
})

export class ShopService {
    constructor(private readonly http: HttpClient) { }

    getCategories(parent: string | null = null): Observable<CategoryInterface[]> {
        return this.http.get<CategoryInterface[]>(`${environment.urlServer}/categories${parent ? `?parent=${parent}`: ''}`);
    }

    getCategoryById(id: string) {
        return this.http.get(`${environment.urlServer}/categories${id}`);
    }

    getProducts(category: string): Observable<any[]> {
        return this.http.get<any[]>(`${environment.urlServer}/products?category=${category}`);
    }

    createProduct(data: any): Observable<any> {
        return this.http.post<any>(`${environment.urlServer}/products/create`, data);
    }

    deleteProductById(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.urlServer}/products/delete/${id}`);
    }

    deleteCategoryById(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.urlServer}/categories/delete/${id}`);
    }

    createCategory(data: any): Observable<any> {
        return this.http.post<CategoryInterface>(`${environment.urlServer}/categories/create`, data);
    }
}