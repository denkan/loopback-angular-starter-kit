import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '~/shared';

import { BaseShellComponent } from '~/core/components/base-shell/base-shell.component';
import { AppShellModule, AppShellComponent } from '~/core/components/app-shell';

export const coreComponents = [
  BaseShellComponent,
  AppShellComponent,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AppShellModule,
  ],
  declarations: [
      BaseShellComponent,
  ],
  exports: [
      BaseShellComponent,
      AppShellComponent,
  ],
})
export class CoreComponentsModule { }
