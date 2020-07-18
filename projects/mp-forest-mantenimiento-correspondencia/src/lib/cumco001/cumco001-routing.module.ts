import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO001Component } from './cumco001.component';

const routes: Routes = [
  {path: '', component: CUMCO001Component},
  {path: 'mantenimiento_correspondencia/asignar_responsable_atencion_tipo_radicado_001', component: CUMCO001Component}
];

export const routersCUMCO001 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO001],
  exports: [RouterModule]
})
export class CUMCO001RoutingModule { }

