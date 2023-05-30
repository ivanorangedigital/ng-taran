import { Routes } from "@angular/router";
import { MenuComponent } from "./menu.component";
import { EmptyComponent } from "./components/empty/empty.component";
import { CategoriesComponent } from "./components/categories/categories.component";

export const MenuRoutes: Routes = [
    {
        path: '', component: MenuComponent, children: [
            {
                path: '', component: EmptyComponent
            },
            {
                path: ':id', component: CategoriesComponent
            }
        ]
    }
]