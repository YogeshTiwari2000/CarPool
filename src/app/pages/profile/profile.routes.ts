import { Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'about',
        loadComponent: () => import('./about/about.page').then(m => m.AboutPage)
      },
      {
        path: 'account',
        loadComponent: () => import('./account/account.page').then(m => m.AccountPage)
      },
      {
        path: 'rating',
        loadComponent: () => import('./rating/rating.page').then(m => m.RatingPage)
      },
      {
        path: '',
        redirectTo: 'profile/about',
        pathMatch: 'full',
      },
    ]
  }


]