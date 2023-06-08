import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminImagesComponent } from "./components/images/images.component";
import { AdminCategoriesComponent } from "./components/categories/categories.component";
import { AdminPiattiComponent } from "./components/piatti/piatti.component";
import { AuthGuard } from "../guards/auth.guard";
import { AuthService } from "../services/auth.service";

export const AdminRoutes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            {
                path: '', component: AdminCategoriesComponent
            },
            {
                path: 'images', component: AdminImagesComponent
            },
            {
                path: 'piatti', component: AdminPiattiComponent
            }
        ],
        canActivate: [AuthGuard],
        providers: [AuthService]
    }
]