import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco006Component } from './cumco006.component';

const routes: Routes = [
  {path: '', component: Cumco006Component},
  {path: 'mantenimiento_correspondencia/configurar_horario_radicacion_006', component: Cumco006Component}
];

export const routersCUMCO006 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO006],
  exports: [RouterModule]
})
export class Cumco006RoutingModule { }
