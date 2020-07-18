import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

// MODULOS
import { HomeRoutingModule } from './home-routing.module';

// COMPONENTES
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { MenuComponent } from '../shared/componente/menu/menu.component';
import { AppMenuitemComponent } from '../shared/componente/menu/app.menuitem.component';
import { TopbarComponent } from '../shared/componente/topbar/topbar.component';
import { FooterComponent } from '../shared/componente/footer/footer.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FavoritosComponent } from '../shared/componente/favoritos/favoritos.component';
import { GeneralComponent } from '../../shared/servicio/general.component';
import { MessageService } from 'primeng/api';
import { DummyComponent } from '../shared/componente/dummy/dummy.component';
import { TranslationComponent } from '../shared/componente/translation/translation.component';

// SERVICIOS
import { MenuService } from '../shared/componente/menu/app.menu.service';

// PrimeNg Modules
import {
  ScrollPanelModule, ButtonModule, InputTextModule, InputTextareaModule, PasswordModule,
  FieldsetModule, BreadcrumbModule, AutoCompleteModule,
  CheckboxModule, DropdownModule, CaptchaModule, DialogModule, FileUploadModule,
  MenubarModule, PanelModule, ConfirmDialogModule, MessageModule, CardModule, DialogService,
  TooltipModule,
  CalendarModule,
  AccordionModule, TabViewModule,
  ProgressSpinnerModule,MultiSelectModule,
  ConfirmationService
} from 'primeng';


import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AcercaComponent } from '../shared/componente/acerca/acerca.component';
import { AyudaComponent } from '../shared/componente/ayuda/ayuda.component';

import { MisActividadesComponent } from '../../privado/shared/componente/actividades/mis-actividades/mis-actividades.component';
import { TareaInfoComponent } from '../../privado/shared/componente/actividades/tarea-info/tarea-info.component';

import { MenuModule } from 'primeng/menu';
import { ErrorActComponent } from '../shared/componente/actividades/error-act/error-act.component';
import { AlertaComponent } from '../../shared/servicio/alerta.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { CombinacionTeclasComponent } from './home-layout/combinacion-teclas-info.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
      {prefix: "./assets/i18n/", suffix: ".json"}
  ]);
}

@NgModule({
  declarations: [
    HomeLayoutComponent,
    MenuComponent, AppMenuitemComponent,
    TopbarComponent,
    TranslationComponent,
    AyudaComponent,
    AcercaComponent,
    FooterComponent, DashboardComponent,
    FavoritosComponent,
    GeneralComponent,
    AlertaComponent,
    DummyComponent,
    MisActividadesComponent,
    ErrorActComponent,
    TareaInfoComponent,
    ReportesComponent,
    CombinacionTeclasComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HomeRoutingModule,
    NgHttpLoaderModule,
    MomentModule,
    CardModule,
    FileUploadModule,
    ToastModule,
    DynamicDialogModule,
    TabMenuModule,
    FieldsetModule,
    CheckboxModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule,
    AccordionModule,
    TabViewModule,
    InputTextModule,
    ProgressSpinnerModule,
    MenuModule,
    DialogModule,
    MultiSelectModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgIdleKeepaliveModule.forRoot(),
    ScrollPanelModule, BreadcrumbModule, AutoCompleteModule, DropdownModule,
  ],
  providers: [GeneralComponent, MessageService, DialogService, TooltipModule, ConfirmationService,
    MenuService],
  entryComponents: [
    AcercaComponent,
    AlertaComponent,
    CombinacionTeclasComponent,
  ]
})
export class HomeModule { }
