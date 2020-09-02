import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CUMCO013Component } from './cumco013.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CUMCO013RoutingModule } from './cumco013-routing.module';
import { MessagesModule } from 'primeng/messages';

import { translateModule } from '../cumco001/cumco001.module';
 
@NgModule({
  declarations: [
    CUMCO013Component
  ],
  imports: [
    CommonModule,
    CUMCO013RoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    MessagesModule,
    CheckboxModule,
    translateModule
  ],
  providers: [],
  bootstrap: [CUMCO013Component]
})
export class CUMCO013Module { }
