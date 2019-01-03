import { Routes } from '@angular/router';
import { globalModalRoutes } from '~/shared/modal';


export const routes: Routes = [
  // { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'profile', loadChildren: './user/profile/profile.module#ProfileModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutModule' },
  { path: '', pathMatch: 'full', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  ...globalModalRoutes,
];
