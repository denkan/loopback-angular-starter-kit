import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '~/shared';

import { routes } from '~/dashboard/dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { UserLoginModule } from '~/user/login';
import { UserCreateModule } from '~/user/create';
import { AppShellModule } from '~/core/components';
import { DashboardService } from '~/dashboard/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    UserLoginModule,
    UserCreateModule,
    AppShellModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    DashboardService,
  ]
})
export class DashboardModule { }
