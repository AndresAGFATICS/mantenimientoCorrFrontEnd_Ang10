import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cumco020Component } from './cumco020.component';
import { Cumco020RoutingModule } from './cumco020-routing.module';
import { FormsModule } from '@angular/forms';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { MessagesModule } from 'primeng/messages';

import { HttpClientModule } from '@angular/common/http';
import { translateModule } from '../cumco001/cumco001.module';

@NgModule({
  declarations: [
    Cumco020Component
  ],
  imports: [
    CommonModule,
    Cumco020RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    MessagesModule,
    CheckboxModule,
    translateModule
  ],
  providers: [],
  bootstrap: [Cumco020Component]
})
export class Cumco020Module { }
