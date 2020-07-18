import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/publico/shared/guard/auth.guard';
import { GeneralComponent } from '../core/general/general/general.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AyudaComponent } from '../shared/componente/ayuda/ayuda.component';
import { DummyComponent } from '../shared/componente/dummy/dummy.component';
// COMPONENTES
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { MisActividadesComponent } from '../shared/componente/actividades/mis-actividades/mis-actividades.component';
import { ErrorActComponent } from '../shared/componente/actividades/error-act/error-act.component';
import { ReportesComponent } from '../reportes/reportes.component';


const routes: Routes = [
  {
    path: 'home', component: HomeLayoutComponent, canActivate: [AuthGuard], data: { addDynamicChild: true },
    children: [

      /*Path para mis actividades*/
      {
        path: 'mis-actividades', component: MisActividadesComponent, canActivate: [AuthGuard], children: [


          //#actividadesAgregar

          {
            path: 'not-found-form', data: { name: 'error form' },
            component: ErrorActComponent,
            canActivate: [AuthGuard]
          },
          {
            path: '**', redirectTo: 'not-found-form',
            canActivate: [AuthGuard]
          }

        ]
      },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'general/:code', component: GeneralComponent, canActivate: [AuthGuard] },
      { path: 'ayuda', component: AyudaComponent, canActivate: [AuthGuard] },
      { path: 'dummy', component: DummyComponent, canActivate: [AuthGuard] },
      { path: 'chartBoard', component: ReportesComponent, canActivate: [AuthGuard] }

      //#routeAgregar
    ]
  },
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
