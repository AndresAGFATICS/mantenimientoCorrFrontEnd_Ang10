import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cumco020Component } from './cumco020.component';
import { Cumco020RoutingModule } from './cumco020-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import { MessagesModule } from 'primeng/messages';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../cumco001/cumco001.module';
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
    CheckboxModule,
    ToastModule,
    DropdownModule,
    MessagesModule,
    HttpClientModule,
    translateModule
  ],
  providers: [],
  bootstrap: [Cumco020Component]
})
export class Cumco020Module { }
