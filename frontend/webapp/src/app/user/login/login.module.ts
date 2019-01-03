import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '~/shared';
import { UserLoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    UserLoginComponent,
  ],
  exports: [
    UserLoginComponent,
  ],
})
export class UserLoginModule { }
