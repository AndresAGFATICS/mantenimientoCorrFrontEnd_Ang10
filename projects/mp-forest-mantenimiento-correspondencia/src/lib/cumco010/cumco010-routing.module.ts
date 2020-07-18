import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO010Component } from './cumco010.component';

const routes: Routes = [
  {path: '', component: CUMCO010Component},
  {path: 'mantenimiento_correspondencia/configurar_motivos_devolucion_010', component: CUMCO010Component}
];

export const routersCUMCO010 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO010],
  exports: [RouterModule]
})
export class CUMCO010RoutingModule { }
