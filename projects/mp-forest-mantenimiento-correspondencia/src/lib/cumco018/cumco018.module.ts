import { NgModule } from '@angular/core';
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
import { CheckboxModule } from 'primeng/checkbox';
import { CUMCO018Component } from './cumco018.component';
import { CUMCO018RoutingModule } from './cumco018-routing.module';

import { translateModule } from '../cumco001/cumco001.module';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    CUMCO018Component
  ],
  imports: [
    CommonModule,
    CUMCO018RoutingModule,
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
  bootstrap: [CUMCO018Component]
})
export class CUMCO018Module { }
