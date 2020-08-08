import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco005Component } from './cumco005.component';

const routes: Routes = [
  {path: '', component: Cumco005Component},
  {path: 'mant-corr/configurar-anexos', component: Cumco005Component}
];

export const routersCUMCO005 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO005],
  exports: [RouterModule]
})
export class Cumco005RoutingModule { }
