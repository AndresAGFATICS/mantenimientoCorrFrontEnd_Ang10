import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO012Component } from './cumco012.component';

const routes: Routes = [
  {path: '', component: CUMCO012Component},
  {path: 'mant-corr/configurar-recorridos', component: CUMCO012Component}
];

export const routersCUMCO012 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO012],
  exports: [RouterModule]
})
export class CUMCO012RoutingModule { }

