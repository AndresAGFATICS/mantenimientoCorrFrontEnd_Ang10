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

import { HttpLoaderFactory } from '../cumco001/cumco001.module';
import { translateModule } from '../cumco001/cumco001.module';



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
    ToastModule,
    translateModule
  ],
  providers: [],
  bootstrap: [CUMCO004Component]
})
export class CUMCO004Module { }
