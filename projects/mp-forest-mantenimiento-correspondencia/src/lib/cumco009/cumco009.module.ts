import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUMCO009Component } from './cumco009.component';
import { FormsModule } from '@angular/forms';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CUMCO009RoutingModule } from './cumco009-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    CUMCO009Component
  ],
  imports: [
    CommonModule,
    CUMCO009RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    ToastModule
  ]
})

  export class CUMCO009Module { }
