import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO004Component } from './cumco004.component';

const routes: Routes = [
  {path: '', component: CUMCO004Component},
  {path: 'mantenimiento_correspondencia/definir_acciones_para_tipos_documentales_004', component: CUMCO004Component}
];

export const routersCUMCO004 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO004],
  exports: [RouterModule]
})
export class CUMCO004RoutingModule { }
