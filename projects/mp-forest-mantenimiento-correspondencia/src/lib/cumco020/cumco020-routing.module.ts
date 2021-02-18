import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cumco020Component } from './cumco020.component';

const routes: Routes = [
  {path: '', component: Cumco020Component},
  {path: 'mant-corr/configurar-procesos', component: Cumco020Component}
];

export const routersCumco020 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCumco020],
  exports: [RouterModule]
})
export class Cumco020RoutingModule { }
