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
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]

  },
  {
    path: 'profile/rating',
    title: 'Rating',
    loadComponent: () => import('./pages/rating/rating.page').then(m => m.RatingPage),
    canActivate: [authGuard]
  },





  {
    path: 'create-ride',
    loadComponent: () => import('./pages/create-ride/create-ride.page').then(m => m.CreateRidePage)
  },
  {
    path: 'feedback',
    title: 'Feedback',
    loadComponent: () => import('./pages/feedback/feedback.page').then(m => m.FeedbackPage),
    canActivate: [authGuard]
  },
  {
    path: 'myWallet',
    loadComponent: () => import('./pages/my-wallet/my-wallet.page').then(m => m.MyWalletPage),
    // canActivate: [authGuard],
    title: "Wallet"
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
