import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco016Component } from './cumco016.component';

const routes: Routes = [
  {path: '', component: Cumco016Component},
  {path: 'mant-corr/configurar-ejes-tematicos', component: Cumco016Component}
];

export const routersCUMCO016 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO016],
  exports: [RouterModule]
})
export class Cumco016RoutingModule { }
