import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

import { HostListener } from '@angular/core';

import { Cumco020Service } from './servicio/cumco020.service';

// Importacion Modulo de Para el Traslate
import { TranslateService } from '@ngx-translate/core';

import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-cumco020',
  templateUrl: './cumco020.component.html',
  styleUrls: ['./cumco020.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco020Component implements OnInit {
  responseGuardarPlantilla: any;


  constructor(private cumco020Service: Cumco020Service,
              private messageService: MessageService,
              private translate: TranslateService) {
  }


  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];


  //autocomplete 1



  //TABLAS 1
  cols: any[];
  dataTable1: any[];
  initialDataTable1: any[];
  initialStateDataTable1 = true;
  selectedRowTable1: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 10;

  cols2: any[];
  dataTable2: any[];
  initialDataTable2: any[];
  initialStateDataTable2 = true;
  selectedRowTable2: any;
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 10;




  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumnsTraslations();


  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  // SUSCRIBIRSE para Obtener los valores de los headers de la tabla
  subcribeSetColumnsTraslations() {

    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'ID', header: this.translate.instant('CUMCO003.TABLA1.headerTabla0') },
        { field: 'plantilla.codigo', header: this.translate.instant('CUMCO003.TABLA1.headerTabla1') },
        { field: 'tipoRadicado.codigoDescripcion', header: this.translate.instant('CUMCO003.TABLA1.headerTabla2') },
        { field: 'tramiteTipoRadicado.descripcion', header: this.translate.instant('CUMCO003.TABLA1.headerTabla3') },
        { field: 'tipoDocumental.codigoDescripcion', header: this.translate.instant('CUMCO003.TABLA1.headerTabla4') },
        { field: 'claseDocumental.codigoDescripcion', header: this.translate.instant('CUMCO003.TABLA1.headerTabla5') },
        { field: 'terminoRequerimiento', header: this.translate.instant('CUMCO003.TABLA1.headerTabla6') },
        { field: 'diasRequerimiento', header: this.translate.instant('CUMCO003.TABLA1.headerTabla7') },
        { field: 'prorrogaEntidad', header: this.translate.instant('CUMCO003.TABLA1.headerTabla8') },
        { field: 'prorrogaPeticionario', header: this.translate.instant('CUMCO003.TABLA1.headerTabla9') },
        { field: 'diasProrroga', header: this.translate.instant('CUMCO003.TABLA1.headerTabla10') },
        { field: 'tipoComunicacion.codigoDescripcion', header: this.translate.instant('CUMCO003.TABLA1.headerTabla11') },
      ];

      this.cols2 = [
        { field: 'RowIndex', header: '' },
        { field: 'codigo', header: this.translate.instant('CUMCO003.TABLA2.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO003.TABLA2.headerTabla2') },
        { field: 'claseDocumental.descripcion', header: this.translate.instant('CUMCO003.TABLA2.headerTabla3') }
      ];
    });

  }


  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchPlantilla(event) {
  }


  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectPlantillaTabla(event, row) {
  }

  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroPlantilla() {
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClickElminiarSelected() {
  }

  onClicAgregar() {
  }

  onClicEliminar() {
  }

  onClicGuardar() {
  }

  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX
  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX}

  onchangeTerminoRequerimiento(row) {
  }


  // Eventos KEYDOWN en INPUT -- Eventos KEYDOWN en INPUT
  // Eventos KEYDOWN en INPUT -- Eventos KEYDOWN en INPUT

  keyDownDiasRequerimiento(row: any) {
  }



  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarRepetidos(): any {
  }



  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  edited(rowIndex) {
    this.compareInitialData(this.dataTable1, this.initialDataTable1);
  }



  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL
  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL

  compareInitialData(currentData: any[], initialData: any[]) {

    for (var _i = 0; _i < currentData.length; _i++) {

      if (currentData[_i].state === "edit" || currentData[_i].state === "noedit") {
        var keys = Object.keys(currentData[_i]);
        var initialDataValue = initialData.filter(obj => obj.id === currentData[_i].id);
        var areEqual = true;
        for (const key of keys) {
          if (typeof currentData[_i][key] === "object") {

            if (currentData[_i][key].id !== initialDataValue[0][key].id) {
              areEqual = false;
            }

          }
          else {
            if (currentData[_i][key] !== initialDataValue[0][key] && key !== "state") {
              areEqual = false;
            }
          }

        }
        if (areEqual) {
          currentData[_i].state = "noedit";
        }
        else {
          currentData[_i].state = "edit";
        }

      }
    }
  }

  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado
  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado

  gteRowColorState(rowData: any) {

    switch (rowData.state) {
      case 'new': {
        return { 'background-color': '#77DD77' };
        break;
      }
      case 'delete': {
        return { 'background-color': '#D36E70' };
        break;
      }
      case 'edit': {
        return { 'background-color': '#E3B778' };
        break;
      }
      default: {
        return {};
        break;
      }
    }

  }


  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES

  // Metodos para Mostrar MENSAJES
  showMessage(sev: string, sum: string, det: string) {
    this.msgs = [];
    this.msgs.push({ severity: sev, summary: sum, detail: det });

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  // Metodos para Ocultar MENSAJES
  hideMessage() {
    this.msgs = [];
    this.msgs2 = [];
  }

  // Metodos para Ocultar MENSAJES despues de un tiempo
  messageTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Metodos para Ocultar MENSAJES al hacer click (mousedouwn) en cualquier lado
  @HostListener('document:mousedown') clickDOM() {
    this.hideMessage();
  };

  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar
  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar



}

