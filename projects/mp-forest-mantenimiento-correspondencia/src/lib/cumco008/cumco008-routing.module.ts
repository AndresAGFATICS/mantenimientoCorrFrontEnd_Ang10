import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco008Component } from './cumco008.component';

const routes: Routes = [
  {path: '', component: Cumco008Component},
  {path: 'mant-corr/configurar-canales', component: Cumco008Component}
];

export const routersCUMCO008 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO008],
  exports: [RouterModule]
})
export class Cumco008RoutingModule { }
