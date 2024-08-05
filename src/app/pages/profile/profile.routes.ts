import { Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'rating',
        loadComponent: () => import('./rating/rating.page').then(m => m.RatingPage)
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ]
  }


]