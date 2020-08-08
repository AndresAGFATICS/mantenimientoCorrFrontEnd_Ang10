import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO014Component } from './cumco014.component';

const routes: Routes = [
  {path: '', component: CUMCO014Component},
  {path: 'mant-corr/configurar-tipos-radicados', component: CUMCO014Component}
];

export const routersCUMCO014 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO014],
  exports: [RouterModule]
})
export class CUMCO014RoutingModule { }
