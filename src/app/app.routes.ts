import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./pages/home/home.page').then(p => p.HomePage)
  },
  {
    path: 'welcome',
    title: 'Welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then(p => p.WelcomePage)
  },
  {
    path: 'search-screen',
    loadComponent: () => import('./pages/search-screen/search-screen.page').then( m => m.SearchScreenPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    title: 'Page not found',
    loadComponent: () => import('./pages/not-found/not-found.page').then(p => p.NotFoundPage)
  },


];
