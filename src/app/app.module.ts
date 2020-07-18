import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxsModule } from '@ngxs/store';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
// Servicios


import { AuthInterceptor } from './shared/servicio/interceptor/AuthInterceptor.interceptor';

// PrimeNg Modules
import {
  ButtonModule, InputTextModule, InputTextareaModule, PasswordModule, FieldsetModule,
  CheckboxModule, DropdownModule, CaptchaModule, DialogModule, FileUploadModule,
  MenubarModule, PanelModule, ConfirmDialogModule, MessageModule, CardModule, BreadcrumbModule, MessagesModule,TabViewModule
} from 'primeng';

import { ConfirmationService, MessageService } from 'primeng/api';



// Routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './publico/login/login.component';
import { GeneralComponent } from './privado/core/general/general/general.component';

/*
export function HttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
*/
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
      {prefix: "./assets/i18n/", suffix: ".json"},
      {prefix: "./assets_modules/i18n/", suffix: ".json"},
      //{prefix: "./assets/i18n/modules/ubica_archivo/", suffix: ".json"},
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneralComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    TabViewModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([
      //ZooState
    ]),
    AppRoutingModule,
    ButtonModule, InputTextModule, InputTextareaModule, PasswordModule, CheckboxModule,
    FieldsetModule, DropdownModule, CaptchaModule, DialogModule, FileUploadModule,
    PanelModule, MenubarModule, ConfirmDialogModule, MessageModule, CardModule, BreadcrumbModule, MessagesModule
  ],
  providers: [
    ConfirmationService, MessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
