import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RootStoreModule } from '~/core/store';
import { MaterialModule, ModalModule } from '~/shared';
import { CoreComponentsModule, coreComponents } from './components';
import { WindowRefService, UserService } from '~/core/services';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RootStoreModule,
    ModalModule,
    CoreComponentsModule,
  ],
  providers: [
    CurrencyPipe,
    WindowRefService,
    UserService,
  ],
  exports: [
    ...coreComponents,
  ]
})
export class CoreModule { }
