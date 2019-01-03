import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppShellModule } from '~/core/components';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '~/shared';
import { HasUserGuard } from '~/user/has-user.guard';
import { AccountComponent } from './account/account.component';
import { PasswordComponent } from './password/password.component';
import { SignOutComponent } from './sign-out/sign-out.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SettingsComponent,
        canActivate: [HasUserGuard],
      },
    ]),
    ReactiveFormsModule,
    AppShellModule,
    MaterialModule,
  ],
  declarations: [
    SettingsComponent,
    AccountComponent,
    PasswordComponent,
    SignOutComponent,
  ]
})
export class SettingsModule { }
