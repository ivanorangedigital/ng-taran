import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'gallery', loadComponent: () => import('./gallery/gallery.component').then(c => c.GalleryComponent)
    },
    {
        path: 'menu', loadChildren: () => import('./menu/menu.routes').then(r => r.MenuRoutes)
    },
    {
        path: 'admin', loadChildren: () => import('./admin/admin.routes').then(r => r.AdminRoutes)
    }
]