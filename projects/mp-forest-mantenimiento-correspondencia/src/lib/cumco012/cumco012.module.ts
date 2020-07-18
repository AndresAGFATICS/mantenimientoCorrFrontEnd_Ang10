import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CUMCO012Component } from './cumco012.component';
import { CUMCO012RoutingModule } from './cumco012-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng';
import { CalendarModule } from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [
    CUMCO012Component
  ],
  imports: [
    CommonModule,
    CUMCO012RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    ToastModule

  ]
})
export class CUMCO012Module { }