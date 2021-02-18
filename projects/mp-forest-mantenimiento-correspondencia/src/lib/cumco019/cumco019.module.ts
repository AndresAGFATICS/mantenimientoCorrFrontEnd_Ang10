import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUMCO019Component } from './cumco019.component';
import { CUMCO019RoutingModule } from './cumco019-routing.module';
import { FormsModule } from '@angular/forms';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { MessagesModule } from 'primeng/messages';

import { HttpClientModule } from '@angular/common/http';
import { translateModule } from '../cumco001/cumco001.module';

@NgModule({
  declarations: [
    CUMCO019Component
  ],
  imports: [
    CommonModule,
    CUMCO019RoutingModule,
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
    translateModule
  ],
  providers: [],
  bootstrap: [CUMCO019Component]
})
export class CUMCO019Module { }
