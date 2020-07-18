import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco017Component } from './cumco017.component';

const routes: Routes = [
  {path: '', component: Cumco017Component},
  {path: 'mantenimiento_correspondencia/administrar_grupos_seguridad_017', component: Cumco017Component}
];

export const routersCUMCO017 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO017],
  exports: [RouterModule]
})
export class Cumco017RoutingModule { }
