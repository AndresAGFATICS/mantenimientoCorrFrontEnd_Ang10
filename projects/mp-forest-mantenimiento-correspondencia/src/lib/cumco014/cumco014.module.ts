import { NgModule, ViewEncapsulation, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUMCO014Component } from './cumco014.component';
import { CUMCO014RoutingModule } from './cumco014-routing.module';
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
import {DropdownModule} from 'primeng/dropdown';
import { translateModule } from '../cumco001/cumco001.module';

@NgModule({
  declarations: [
    CUMCO014Component
  ],
  imports: [
    CommonModule,
    CUMCO014RoutingModule,
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
    DropdownModule,
    translateModule
  ],
  providers: [],
  bootstrap: [CUMCO014Component]
})

export class CUMCO014Module { }
