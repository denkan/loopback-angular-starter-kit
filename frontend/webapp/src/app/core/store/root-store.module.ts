import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { rootReducers, metaReducers } from './root-store.reducers';
import { rootEffects } from './root-store.effects';
import { rootServices } from './root-store.services';
import * as fromRouter from './router';


@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        RouterModule,
        StoreModule.forRoot(rootReducers, {metaReducers}),
        StoreRouterConnectingModule.forRoot({ stateKey: fromRouter.featureName }),
        EffectsModule.forRoot(rootEffects),
        StoreDevtoolsModule.instrument({
          maxAge: 50,
        }),
    ],
    exports: [

    ],
    providers: [
        ...rootServices,
    ],
})
export class RootStoreModule {}
