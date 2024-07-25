import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./pages/home/home.page').then(p => p.HomePage)
  },
  {
    path: 'register',
    title: 'Register User',
    loadComponent: () => import('./pages/register-user/register.page').then(p => p.RegisterPage)
  },
  {
    path: 'welcome',
    title: 'Welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then(p => p.WelcomePage)
  },
  {
    path: 'search-screen',
    title: 'Search Ride',
    loadComponent: () => import('./pages/search-screen/search-screen.page').then(p => p.SearchScreenPage)
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
