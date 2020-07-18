import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CUMCO018Component } from './cumco018.component';

const routes: Routes = [
  {path: '', component: CUMCO018Component},
  {path: 'mantenimiento_correspondencia/configurar_mensajeria_018', component: CUMCO018Component}
];

export const routersCUMCO018 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO018],
  exports: [RouterModule]
})
export class CUMCO018RoutingModule { }
