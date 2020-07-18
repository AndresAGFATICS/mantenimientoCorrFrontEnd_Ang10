import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Cumco016Component } from './cumco016.component';
import { Cumco016RoutingModule } from './cumco016-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { PickListModule } from 'primeng/picklist';
import { CheckboxModule } from 'primeng/checkbox';




@NgModule({
  declarations: [
    Cumco016Component
  ],
  imports: [
    CommonModule,
    Cumco016RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    TreeModule,
    PickListModule,
    CheckboxModule
  ]
})
export class Cumco016Module { }
