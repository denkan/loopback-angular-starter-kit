import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '~/shared';
import { AppShellComponent } from '~/core/components/app-shell/app-shell.component';
import { AppToolbarComponent } from '~/core/components/app-shell/app-toolbar/app-toolbar.component';
import { UserMenuComponent } from '~/core/components/app-shell/app-toolbar/user-menu/user-menu.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    AppShellComponent,
    AppToolbarComponent,
    UserMenuComponent,
  ],
  exports: [
    AppShellComponent,
  ],
})
export class AppShellModule { }
