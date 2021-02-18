import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy.component';

const routes: Routes = [{ path: '', component: DummyComponent }, { path: 'dummys', component: DummyComponent }];

//const routes: Routes = [{ path: 'dummys', component: DummyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyRoutingModule { }
