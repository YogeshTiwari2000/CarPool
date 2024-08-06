import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search',
    title: 'Search Ride',
    loadComponent: () => import('./pages/my-wallet/history-wallet.page').then(m => m.HistoryWalletComponent),
  },

];
