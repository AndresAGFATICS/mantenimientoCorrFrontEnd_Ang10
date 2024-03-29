import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUMCO010Component } from './cumco010.component';
import { CUMCO010RoutingModule } from './cumco010-routing.module';
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
import {ToastModule} from 'primeng/toast';
import { translateModule } from '../cumco001/cumco001.module';

import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    CUMCO010Component
  ],
  imports: [
    CommonModule,
    CUMCO010RoutingModule,
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
  bootstrap: [CUMCO010Component]
})

export class CUMCO010Module { }
