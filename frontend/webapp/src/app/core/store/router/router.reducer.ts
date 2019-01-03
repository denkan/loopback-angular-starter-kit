import { Type } from '@angular/core';
import { Params, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';



export const featureName = 'router';

export class State {
  url: string;
  params: Params;
  queryParams: Params;
  outlet: string;
  component: string | Type<any>;
  componentName: string;

  // track each outlet with state info
  // (sub-outlets wont get tracked otherwise)
  outlets: { [name: string]: State }
};

export const initialState: State = {
  url: null,
  params: {},
  queryParams: {},
  outlet: null,
  component: null,
  componentName: null,
  outlets: {},
};

export class CustomSerializer implements RouterStateSerializer<State> {
  serialize(routerState: RouterStateSnapshot): State {
    const outlets: { [name: string]: State } = {};

    const trackRoute = (route: ActivatedRouteSnapshot) => {
      const { url, queryParams, params, outlet, component } = route;
      const componentName = (<any>component || {}).name;
      outlets[outlet] = {
        ...initialState,
        queryParams,
        params,
        outlet,
        component,
        componentName
      };
    }

    const traverseRoute = (route: ActivatedRouteSnapshot) => {
      trackRoute(route);
      route.children.forEach(r => traverseRoute(r));
    }

    traverseRoute(routerState.root);

    const mainOutletName = Object.keys(outlets)[0];
    const mainRoute = outlets[mainOutletName];
    const { url, root: { queryParams } } = routerState;

    return { ...mainRoute, url, queryParams, outlets };
  }
}

export const reducer = routerReducer;

export const selectRouterState        = createFeatureSelector<RouterReducerState<State>>(featureName);
export const selectState              = createSelector(selectRouterState, s => (s && !!s.state) ? s.state : initialState);

export const selectUrl                = createSelector(selectState, s => s.url);
export const selectParams             = createSelector(selectState, s => s.params);
export const selectQueryParams        = createSelector(selectState, s => s.queryParams);
export const selectOutlet             = createSelector(selectState, s => s.outlet);
export const selectComponent          = createSelector(selectState, s => s.component);
export const selectComponentName      = createSelector(selectState, s => s.componentName);

export const selectOutlets            = createSelector(selectState, s => s.outlets);
export const selectOutletFn           = (name: string) =>
  createSelector(selectOutlets, outlets => outlets[name])
