import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CUMCO009Component } from './cumco009.component';

const routes: Routes = [
  {path: '', component: CUMCO009Component},
  {path: 'mant-corr/configurar-tipos-persona', component: CUMCO009Component}
];

export const routersCUMCO009 = RouterModule.forChild(routes);

@NgModule({
  imports: [routersCUMCO009],
  exports: [RouterModule]
})
export class CUMCO009RoutingModule { }
