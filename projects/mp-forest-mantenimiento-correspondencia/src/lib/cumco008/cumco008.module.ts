import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Cumco008Component } from './cumco008.component';
import { Cumco008RoutingModule } from './cumco008-routing.module';

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

import { MessagesModule } from 'primeng/messages';

import { translateModule } from '../cumco001/cumco001.module';



@NgModule({
  declarations: [
    Cumco008Component
  ],
  imports: [
    CommonModule,
    Cumco008RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    MessagesModule,
    translateModule
  ],
  providers: [],
  bootstrap: [Cumco008Component]
})
export class Cumco008Module { }
