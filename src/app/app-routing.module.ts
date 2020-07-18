import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// GUARD
import { PublicGuard } from './publico/shared/guard/public.guard';

// COMPONENTES
import { LoginComponent } from './publico/login/login.component';

// MODULOS
import { HomeModule } from './privado/home/home.module';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ PublicGuard ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
