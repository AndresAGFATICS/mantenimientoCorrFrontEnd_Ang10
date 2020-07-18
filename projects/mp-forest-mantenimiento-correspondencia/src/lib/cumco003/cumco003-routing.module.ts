import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco003Component } from './cumco003.component';

const routes: Routes = [
  {path: '', component: Cumco003Component},
  {path: 'mantenimiento_correspondencia/configuracion_carta_modelo_003', component: Cumco003Component}
];

export const routersCUMCO003 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO003],
  exports: [RouterModule]
})
export class Cumco003RoutingModule { }
