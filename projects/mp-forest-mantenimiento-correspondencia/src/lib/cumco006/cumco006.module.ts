import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Cumco006Component } from './cumco006.component';
import { Cumco006RoutingModule } from './cumco006-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { translateModule } from '../cumco001/cumco001.module';

import { MessagesModule } from 'primeng/messages';




@NgModule({
  declarations: [
    Cumco006Component
  ],
  imports: [
    CommonModule,
    Cumco006RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    CalendarModule,
    ToastModule,
    DropdownModule,
    MessagesModule,
    translateModule
  ],
  providers: [],
  bootstrap: [Cumco006Component]
})
export class Cumco006Module { }
