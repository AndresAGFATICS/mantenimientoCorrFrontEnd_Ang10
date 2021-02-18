import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO019Component } from './cumco019.component';

const routes: Routes = [
  {path: '', component: CUMCO019Component},
  {path: 'mant-corr/configurar-firmantes', component: CUMCO019Component}
];

export const routersCUMCO019 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO019],
  exports: [RouterModule]
})
export class CUMCO019RoutingModule { }
