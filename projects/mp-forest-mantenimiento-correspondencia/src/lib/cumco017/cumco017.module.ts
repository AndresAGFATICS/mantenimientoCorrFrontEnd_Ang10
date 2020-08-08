import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Cumco017Component } from './cumco017.component';
import { Cumco017RoutingModule } from './cumco017-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';

import { MessagesModule } from 'primeng/messages';

import { translateModule } from '../cumco001/cumco001.module';




@NgModule({
  declarations: [
    Cumco017Component
  ],
  imports: [
    CommonModule,
    Cumco017RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    MenuModule,
    CheckboxModule,
    MessagesModule,
    translateModule
  ],
  providers: [],
  bootstrap: [Cumco017Component]
})
export class Cumco017Module { }
