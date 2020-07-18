import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO019Component } from './cumco019.component';

const routes: Routes = [
  {path: '', component: CUMCO019Component},
  {path: 'mantenimiento_correspondencia/configurar_firmantes_tipo_comunicacion_019', component: CUMCO019Component}
];

export const routersCUMCO019 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO019],
  exports: [RouterModule]
})
export class CUMCO019RoutingModule { }
