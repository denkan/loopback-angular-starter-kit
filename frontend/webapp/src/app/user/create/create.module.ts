import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '~/shared';
import { UserCreateComponent } from './create.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    UserCreateComponent,
  ],
  exports: [
    UserCreateComponent,
  ],
})
export class UserCreateModule { }
