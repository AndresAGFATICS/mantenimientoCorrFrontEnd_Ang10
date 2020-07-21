import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CUMCO001RoutingModule } from './cumco001-routing.module';
import { CUMCO001Component } from './cumco001.component';

import { FormsModule } from '@angular/forms';

//prime Faces
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

//import * from './../projects/mp-forest-mantenimiento-correspondencia/src/assets/i18n/'

export function HttpLoaderFactory(http: HttpClient) {

  return new MultiTranslateHttpLoader(http, [
    {prefix: "./assets/i18n/", suffix: ".json"},
      //lang
    {prefix: "./assets/mp-forest-mantenimiento-correspondencia/i18n/", suffix: ".json"}
  ]);
  //return new TranslateHttpLoader(http);
  //return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  // /assets_modules/i18n/es.json
  //return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
  //return new TranslateHttpLoader(http, './../projects/mp-forest-mantenimiento-correspondencia/src/assets/i18n/', '.json');
}

export  const translateModule  = TranslateModule.forChild({
                                            loader: {
                                            provide: TranslateLoader,
                                            useFactory: (HttpLoaderFactory),
                                            deps: [HttpClient]
                                            },
                                            isolate: true
                                          });


@NgModule({
  declarations: [
    CUMCO001Component
  ],
  imports: [
    CommonModule,
    CUMCO001RoutingModule,
    FormsModule,
    AutoCompleteModule,
    FieldsetModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
    HttpClientModule,
    translateModule
  ],
  providers: [],
  bootstrap: [CUMCO001Component]
})
export class CUMCO001Module { }
