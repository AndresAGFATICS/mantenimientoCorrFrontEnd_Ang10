import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco008Component } from './cumco008.component';

const routes: Routes = [
  {path: '', component: Cumco008Component},
  {path: 'mantenimiento_correspondencia/configurar_canales_medios_envio_008', component: Cumco008Component}
];

export const routersCUMCO008 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO008],
  exports: [RouterModule]
})
export class Cumco008RoutingModule { }
