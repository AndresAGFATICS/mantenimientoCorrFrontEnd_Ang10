import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO009Component } from './cumco009.component';

const routes: Routes = [
  {path: '', component: CUMCO009Component},
  {path: 'mantenimiento_correspondencia/configurar_tipos_persona_tipos_identificacion_009', component: CUMCO009Component}
];

export const routersCUMCO009 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO009],
  exports: [RouterModule]
})
export class CUMCO009RoutingModule { }
