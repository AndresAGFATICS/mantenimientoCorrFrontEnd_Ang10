import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO013Component } from './cumco013.component';

const routes: Routes = [
  {path: '', component: CUMCO013Component},
  {path: 'mantenimiento_correspondencia/configurar_caracteristicas_terceros_013', component: CUMCO013Component}
];

export const routersCUMCO013 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO013],
  exports: [RouterModule]
})
export class CUMCO013RoutingModule { }
