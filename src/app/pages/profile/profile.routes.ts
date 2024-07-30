import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about',
        loadComponent: () => import('./about/about.page').then(m => m.AboutPage)
    },
    {
        path: 'account',
        loadComponent: () => import('./account/account.page').then(m => m.AccountPage)
    },
]