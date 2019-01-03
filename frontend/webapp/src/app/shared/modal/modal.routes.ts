import { Routes, Route } from '@angular/router';
import { Type } from '@angular/core';

import { ModalComponent } from './modal.component';



export function modalRoute(path: string, component: Type<any>, dialogOptions?: any): Route {
  return <Route>{
    path,
    component: ModalComponent,
    outlet: 'o',
    data: {
      modalComponent: component,
      dialogOptions,
    }
  };
}

export const globalModalRoutes: Routes = [
  // modalRoute('login', LoginComponent, 'sm-full'),
  // modalRoute('logout', LogoutComponent, 'xs'),
  // modalRoute('item/:id', ItemDetailsComponent, 'md'),
  /*
  modalRoute('login', LoginComponent) = {
      path: 'login',
      component: ModalComponent,
      outlet: 'o',
      data: { modalComponent: LoginComponent }
  },
  */
];
