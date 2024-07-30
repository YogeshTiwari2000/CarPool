import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./pages/home/home.page').then(p => p.HomePage),
    canActivate: [authGuard]
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
    path: 'search',
    title: 'Search Ride',
    loadComponent: () => import('./pages/search-screen/search-screen.page').then(p => p.SearchScreenPage)
  },
  {
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
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
  {
    path: 'about',
    loadComponent: () => import('./pages/profile/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/profile/account/account.page').then( m => m.AccountPage)
  },





];
