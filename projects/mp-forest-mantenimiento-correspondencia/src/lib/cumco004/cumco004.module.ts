import { NgModule, ModuleWithProviders, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUMCO004RoutingModule } from './cumco004-routing.module';
import { CUMCO004Component } from './cumco004.component';
import { FormsModule } from '@angular/forms';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    CUMCO004Component
  ],
  imports: [
    CommonModule,
    CUMCO004RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    ToastModule
  ]
})
export class CUMCO004Module { }
