import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Cumco005Component } from './cumco005.component';
import { Cumco005RoutingModule } from './cumco005-routing.module';

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
import { ToastModule } from 'primeng/toast';

import { translateModule } from '../cumco001/cumco001.module';
import { MessagesModule } from 'primeng/messages';




@NgModule({
  declarations: [
    Cumco005Component
  ],
  imports: [
    CommonModule,
    Cumco005RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    ToastModule,
    MessagesModule,
    translateModule
  ],
  providers: [],
  bootstrap: [Cumco005Component]
})
export class Cumco005Module { }
