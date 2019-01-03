import { Routes } from "@angular/router";


export const routes: Routes = [
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  { path: '', pathMatch: 'full', redirectTo: 'settings' }
];
