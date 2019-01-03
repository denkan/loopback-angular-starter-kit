import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Angulartics2Module, } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// locale: swedish - DISABLED FOR NOW
// import { registerLocaleData } from '@angular/common';
// import localeSv from '@angular/common/locales/sv';
// registerLocaleData(localeSv);
// --

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      pageTracking: {
        clearQueryParams: true,
      }
    }),
    CoreModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'sv-SE' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
