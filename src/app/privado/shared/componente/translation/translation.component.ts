import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {
  public activeLang = 'es';
  // Idioma
  idiomaSeleccionado: string;
  idiomas: SelectItem[];

  constructor (private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit() {
    this.idiomaSeleccionado = 'es';

    this.idiomas = [
      {label: 'Español', value: 'es'},
      {label: 'Ingles', value: 'en'}
    ];
  }

  public cambiarLenguaje(lang: string) {
    this.activeLang = lang;
    this.translate.use(lang);
  }

  seleccionarIdioma() {
    this.cambiarLenguaje(this.idiomaSeleccionado)
  }
}