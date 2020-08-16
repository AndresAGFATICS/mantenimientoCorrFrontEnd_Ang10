import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

import { HostListener } from '@angular/core';

import { Cumco003Service } from './servicio/cumco003.service';

// Importacion Modulo de Para el Traslate
import { TranslateService } from '@ngx-translate/core';

import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-cumco003',
  templateUrl: './cumco003.component.html',
  styleUrls: ['./cumco003.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco003Component implements OnInit {
  responseGuardarPlantilla: any;


  constructor(private cumco003Service: Cumco003Service,
    private messageService: MessageService,
    private translate: TranslateService) {
    this.rows = [];


    this.tablaDocumentos = [];
    this.idRow = 0;
  }



  //autocompletePlantilla
  seleccionPlantilla: any;
  listaPlantilla: any[];

  suggestionsTipoComunicacionTabla: any[];
  event: any;

  seleccionRadicado: any;
  listaRadicado: any[];

  listadoDocumento: any[];

  listaSubTipoRadicado: any[];

  seleccionClaseDocumental: any;
  listaClaseDocumental: any[];

  //ValorRepetido

  repetido: any;
  repetidoPlantilla: Row;


  //TABLAS
  rows: any[];
  initialData1: any[];
  initialStateRows = true;
  tablaDocumentos: any[];
  initialStatetablaDocumentos = true;
  initialData2: any[];
  selectedRowDocument: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 10;

  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 10;

  habilitarPlantilla: boolean;

  idRow: number;
  rowIndex = 0;
  rowIndexValidation: number;

  responseGuardarComunicacion: any;


  cols: any[];

  selectedRows: any;

  cols2: any[];

  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];




  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumnsTraslations();
    this.subscribePlantilla('');
    this.subscribeRadicado('');
    this.subscribeDocumento('');
    this.subscribeClaseDocumental('');
    this.subscribeTablaDocumento();
    this.subscribeTablaPlantilla();

    this.subscribeGetForestPropiedades('?nombre=corr.HabilitarTipDocPlantillas');
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
        { field: 'RowIndex', header: ''},
        { field: 'codigo', header: this.translate.instant('CUMCO003.TABLA2.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO003.TABLA2.headerTabla2') },
        { field: 'claseDocumental.descripcion', header: this.translate.instant('CUMCO003.TABLA2.headerTabla3') }
      ];
    });

  }

  subscribePlantilla(codigo: any) {
    this.cumco003Service.getPlantilla(codigo).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        this.listaPlantilla = [];
        getRes.forEach(res => {
          this.listaPlantilla.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeRadicado(codigo: any) {
    this.cumco003Service.getTipoRadicado(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaRadicado = [];
        getRes.forEach(res => {

          this.listaRadicado.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeSubTipoRadicado(descripcion: any, idTipo: any) {
    this.cumco003Service.getSubTipoRadicado(descripcion, idTipo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaSubTipoRadicado = [];
        getRes.forEach(res => {

          this.listaSubTipoRadicado.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeDocumento(codigo: any) {
    this.cumco003Service.getDocumento(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listadoDocumento = [];
        getRes.forEach(res => {
          this.listadoDocumento.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeTablaDocumento() {
    this.cumco003Service.getTablaDocumento().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaDocumentos = [];
        getRes.forEach(res => {
          this.tablaDocumentos.push(res);
        })
        this.tablaDocumentos.forEach(documento => {
          documento.state = 'noedit'
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe


        if (this.initialStatetablaDocumentos) {
          this.initialData2 = [];
          for (const data of this.tablaDocumentos) {
            this.initialData2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStatetablaDocumentos = false;
        }
      });
  }

  subscribeTablaPlantilla() {
    this.cumco003Service.getTablaPlantilla().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.rows = [];
        getRes.forEach(res => {
          res.tipoComunicacion = res.tipoComunicacion ? res.tipoComunicacion : { "id": '', "codigoDescripcion": '' };
          res.plantilla = res.plantilla ? res.plantilla : { "id": '', "codigo": '' };
          res.tipoRadicado = res.tipoRadicado ? res.tipoRadicado : { "id": '', "codigoDescripcion": '' };
          res.tramiteTipoRadicado = res.tramiteTipoRadicado ? res.tramiteTipoRadicado : { "id": '', "descripcion": '' };
          res.tipoDocumental = res.tipoDocumental ? res.tipoDocumental : { "id": '', "codigoDescripcion": '' };
          res.claseDocumental = res.claseDocumental ? res.claseDocumental : { "id": '', "codigoDescripcion": '' }; 
          this.rows.push(res);
        })
        this.rows.forEach(documento => {
          documento.state = 'noedit'

        })
        let index = this.rows.indexOf(this.selectedRows);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if (this.initialStateRows) {
          this.initialData1 = [];
          for (const data of this.rows) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateRows = false;
        }
      });
  }

  subscribeClaseDocumental(codigo: any) {
    this.cumco003Service.getClaseDocumental(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaClaseDocumental = [];
        getRes.forEach(res => {
          this.listaClaseDocumental.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subcribeRecorridoRepartoFisico(body: any) {
    this.cumco003Service.postComuniacion(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardarComunicacion = getRes;
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO003.MENSAJES.guardarError');
        this.showMessage('error', error, '');
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        this.initialStatetablaDocumentos = true;
        this.subscribeTablaDocumento();
        this.showMessage('success', this.responseGuardarComunicacion.message, '');
      });
  }

  subcribeGuardarPlantilla(body: any) {
    this.cumco003Service.postPlantilla(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardarPlantilla = getRes;
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO003.MENSAJES.guardarError');
        this.showMessage('error', 'Guardar ', error);
      },
      () => {                 // Fin del suscribe
        this.seleccionPlantilla = undefined;
        this.seleccionRadicado = undefined;
        this.seleccionClaseDocumental = undefined;

        this.initialStateRows = true;
        this.subscribeTablaPlantilla();
        this.showMessage('success', this.responseGuardarPlantilla.message, '');
        this.subscribeGetForestPropiedades('?nombre=corr.HabilitarTipDocPlantillas');

      });
  }

  subscribeTipoComunicacion(parameters: string) {
    this.cumco003Service.getTipoComunicacion(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.suggestionsTipoComunicacionTabla = [];
        getRes.forEach(res => {
          this.suggestionsTipoComunicacionTabla.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeGetForestPropiedades(parameters: any) {
    let response: any[];
    this.cumco003Service.getForestPropiedades(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = [];
        getRes.forEach(res => {
          response.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if(response.length !== 0){
          if (response[0].valor.toLowerCase() == 'false' ){
            this.habilitarPlantilla = false;
          }
          else{
            this.habilitarPlantilla = true;
          }
        }
        else{
          this.habilitarPlantilla = true;
        }
        console.log(this.habilitarPlantilla);
      });
  }



  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchPlantilla(event) {
    this.selectedRows = undefined;
    this.subscribePlantilla(event.query ? event.query : '');
  }

  searchRadicado(event) {
    this.selectedRows = undefined;
    this.subscribeRadicado(event.query ? event.query : '')
  }

  searchSubTipoRadicado(event, rowIndex) {
    this.selectedRows = undefined;
    if (this.rows[rowIndex].tipoRadicado.id || this.rows[rowIndex].tipoRadicado.id) {
      this.subscribeSubTipoRadicado(event.query ? event.query : '', this.rows[rowIndex].tipoRadicado.id)
    } else {
      const error = this.translate.instant('CUMCO003.MENSAJES.seleccioneTipoRadicado');
      this.showMessage('error', error, '');
    }

  }

  searchClaseDocumento(event) {
    this.selectedRowDocument = undefined;
    this.selectedRows = undefined;
    this.subscribeClaseDocumental(event.query ? event.query : '')
  }

  searchDocumento(event) {
    this.selectedRows = undefined;
    this.subscribeDocumento(event.query ? event.query : '')
  }

  searchClaseDocumental(event) {
    this.selectedRows = undefined;
    this.subscribeTablaDocumento();
  }

  searchTipoComunicacionTabla(event, row) {
    this.selectedRows = undefined;
    this.subscribeTipoComunicacion('?idClaseDocumental=' + String(row.claseDocumental.id)  + '&codigoDescripcion=' + event.query); // ?idClaseDocumental=2&codigoDescripcion=dec
  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectPlantillaTabla(event, row) {
    //row.plantilla = event;
    this.edited(0);
  }

  selectTipoRadicadoTabla(event, row) {
    //row.tipoRadicado = event;
    row.tramiteTipoRadicado = { id: '', descripcion: '' };
    this.edited(0);
  }

  selectSubtipoRadicadoTabla(event, row) {
    //row.tramiteTipoRadicado = event;
    this.edited(0);
  }

  selectTipoDocumentalTabla(event, row) {
    //row.tipoDocumental = event;
    this.edited(0);
  }

  selectTipoComunicacionTabla(event, row) {
    //row.tipoComunicacion = event;
    this.edited(0);
  }

  selectClaseDocumentalTabla2(event, row) {
    //row.claseDocumental = event;
    this.editedDocument(0);
  }

  selectFilter(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialData1) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if(this.seleccionPlantilla){
      if (this.seleccionPlantilla.id !== undefined && this.seleccionPlantilla.id !== '') {
        filtered = copyInitialData.filter(data => data.plantilla.id === this.seleccionPlantilla.id);
      }
      else{
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else{
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    let filtered2: any[] = [];
    if(this.seleccionRadicado){
      if (this.seleccionRadicado.id !== undefined && this.seleccionRadicado.id !== '') {
        filtered2 = filtered.filter(data => data.tipoRadicado.id === this.seleccionRadicado.id);
      }
      else{
        filtered2 = filtered;
      }
    }
    else{
      filtered2 = filtered;
    }

    let filtered3: any[] = [];
    if(this.seleccionClaseDocumental){
      if (this.seleccionClaseDocumental.id !== undefined && this.seleccionClaseDocumental.id !== '') {
        filtered3 = filtered2.filter(data => data.claseDocumental.id === this.seleccionClaseDocumental.id);
      }
      else{
        filtered3 = filtered2;
      }
    }
    else{
      filtered3 = filtered2;
    }
    

    this.rows = filtered3;

  }

  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroPlantilla(){
    if(this.seleccionPlantilla){
      if (this.seleccionPlantilla.id === undefined || this.seleccionPlantilla.id === ''){
        this.seleccionPlantilla = undefined;
        this.selectFilter('');
      }
    }
    else if (this.seleccionPlantilla === ''){
      this.seleccionPlantilla = undefined;
      this.selectFilter('');
    }
  }

  focusOutFiltroRadicado(){
    if(this.seleccionRadicado){
      if (this.seleccionRadicado.id === undefined || this.seleccionRadicado.id === ''){
        this.seleccionRadicado = undefined;
        this.selectFilter('');
      }
    }
    else if (this.seleccionRadicado === ''){
      this.seleccionRadicado = undefined;
      this.selectFilter('');
    }
  }

  focusOutClaseDocumental(){
    if(this.seleccionClaseDocumental){
      if (this.seleccionClaseDocumental.id === undefined || this.seleccionClaseDocumental.id === ''){
        this.seleccionClaseDocumental = undefined;
        this.selectFilter('');
      }
    }
    else if (this.seleccionClaseDocumental === ''){
      this.seleccionClaseDocumental = undefined;
      this.selectFilter('');
    }
  }


  focusOutTablaPlantilla(rowIndex: number){
    if(this.rows[rowIndex].plantilla){
      if (this.rows[rowIndex].plantilla.id === undefined || this.rows[rowIndex].plantilla.id === ''){
        this.rows[rowIndex].plantilla = {id: '', codigo: ''};
      }
    }
    else if (this.rows[rowIndex].plantilla === ''){
      this.rows[rowIndex].plantilla = {id: '', codigo: ''};
    }
    this.edited(0);
  }

  focusOutTablaTipoRadicado(rowIndex: number){
    if(this.rows[rowIndex].tipoRadicado){
      if (this.rows[rowIndex].tipoRadicado.id === undefined || this.rows[rowIndex].tipoRadicado.id === ''){
        this.rows[rowIndex].tipoRadicado = {id: '', codigoDescripcion: ''};
        this.rows[rowIndex].tramiteTipoRadicado = {id: '', codigoDescripcion: ''};
      }
    }
    else if (this.rows[rowIndex].tipoRadicado === ''){
      this.rows[rowIndex].tipoRadicado = {id: '', codigoDescripcion: ''};
      this.rows[rowIndex].tramiteTipoRadicado = {id: '', codigoDescripcion: ''};
    }
    this.edited(0);
  }

  focusOutTablaSubTipoRadicado(rowIndex: number){
    if(this.rows[rowIndex].tramiteTipoRadicado){
      if (this.rows[rowIndex].tramiteTipoRadicado.id === undefined || this.rows[rowIndex].tramiteTipoRadicado.id === ''){
        this.rows[rowIndex].tramiteTipoRadicado = {id: '', codigoDescripcion: ''};
      }
    }
    else if (this.rows[rowIndex].tramiteTipoRadicado === ''){
      this.rows[rowIndex].tramiteTipoRadicado = {id: '', codigoDescripcion: ''};
    }
    this.edited(0);
  }


  focusOutTablaTipoDocumental(rowIndex: number){
    if(this.rows[rowIndex].tipoDocumental){
      if (this.rows[rowIndex].tipoDocumental.id === undefined || this.rows[rowIndex].tipoDocumental.id === ''){
        this.rows[rowIndex].tipoDocumental = {id: '', codigoDescripcion: ''};
      }
    }
    else if (this.rows[rowIndex].tipoDocumental === ''){
      this.rows[rowIndex].tipoDocumental = {id: '', codigoDescripcion: ''};
    }
    this.edited(0);
  }

  focusOutTablaClaseDocumental(rowIndex: number){
    if(this.rows[rowIndex].claseDocumental){
      if (this.rows[rowIndex].claseDocumental.id === undefined || this.rows[rowIndex].claseDocumental.id === ''){
        this.rows[rowIndex].claseDocumental = {id: '', codigoDescripcion: ''};
        this.rows[rowIndex].tipoComunicacion = {id: '', codigoDescripcion: ''};
      }
    }
    else if (this.rows[rowIndex].claseDocumental === ''){
      this.rows[rowIndex].claseDocumental = {id: '', codigoDescripcion: ''};
      this.rows[rowIndex].tipoComunicacion = {id: '', codigoDescripcion: ''};
    }
    this.edited(0);
  }

  focusOutTablaTipoComunicacion(rowIndex: number){
    if(this.rows[rowIndex].tipoComunicacion){
      if (this.rows[rowIndex].tipoComunicacion.id === undefined || this.rows[rowIndex].tipoComunicacion.id === ''){
        this.rows[rowIndex].tipoComunicacion = {id: '', codigoDescripcion: ''};
      }
    }
    else if (this.rows[rowIndex].tipoComunicacion === ''){
      this.rows[rowIndex].tipoComunicacion = {id: '', codigoDescripcion: ''};
    }
    this.edited(0);
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClickElminiarSelected() {
    this.selectedRows = undefined;
  }

  onClickElminiarSelected2() {
    this.selectedRowDocument = undefined;
  }

  onConfirm() {
    this.messageService.clear('c');
    this.rows[this.rowIndexValidation].plantilla.codigo = '';
    this.rows[this.rowIndexValidation].plantilla.id = '';


    this.rows[this.rowIndexValidation].claseDocumental = this.event;
    this.rows[this.rowIndexValidation].tipoComunicacion = { id: '', codigoDescripcion: '' };
    this.edited(this.rowIndexValidation);
  }

  onReject() {
    this.messageService.clear('c');
    this.rows[this.rowIndexValidation].claseDocumental.codigo = '';
    this.rows[this.rowIndexValidation].claseDocumental.codigoDescripcion = '';
    this.rows[this.rowIndexValidation].claseDocumental.descripcion = '';
    this.rows[this.rowIndexValidation].claseDocumental.id = '';
    this.rows[this.rowIndexValidation].tipoComunicacion = { id: '', codigoDescripcion: '' };
    this.edited(this.rowIndexValidation);
    this.subscribeClaseDocumental('');
  }

  onClicBorrarAutoCompletePlantilla() {
    this.seleccionPlantilla = undefined;
    this.selectFilter('');
  }

  onClicBorrarAutoCompleteRadicado() {
    this.seleccionRadicado = undefined;
    this.selectFilter('');
  }

  onClicBorrarAutoCompleteDocumento() {
    this.seleccionClaseDocumental = undefined;
    this.selectFilter('');
  }

  onClicAgregar() {
    let element = {
      idRow: this.idRow,
      id: '',
      plantilla: {
        id: '',
        codigo: '',
      },
      tipoRadicado: {
        id: '',
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        activo: 1,
      },
      tramiteTipoRadicado: {
        id: '',
        descripcion: '',
        tipoRadicado: {
          id: '',
          codigo: '',
          descripcion: '',
          codigoDescripcion: '',
          activo: 1
        },
        modificarDiaTermino: 0,
        activo: 1,
        entrada: 0,
        cof: 0,
        webfile: 0,
        verbal: 0,
        anonimo: 0
      },
      tipoDocumental: {
        id: '',
        activo: 1,
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        codigoDescripcionGuion: ''
      },
      claseDocumental: {
        id: '',
        descripcion: '',
        codigo: '',
        codigoDescripcion: ''
      },
      tipoComunicacion: {
        id: '',
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        codigoDescripcionGuion: '',
        editable: 1,
        activo: 0
      },
      terminoRequerimiento: 0,
      prorrogaEntidad: 0,
      prorrogaPeticionario: 0,
      diasRequerimiento: undefined,
      diasProrroga: undefined,
      cantidad: 0,
      state: 'new'
    }
    this.rows = [...this.rows, element];
    this.idRow += 1;
  }

  onClicAgregarComunicacion() {
    let element = {
      idRow: this.idRow,
      id: '',
      codigo: String.fromCharCode(127),
      descripcion: '',
      codigoDescripcion: '',
      codigoDescripcionGuion: '',
      claseDocumental: {
        id: '',
        descripcion: String.fromCharCode(127),
        codigo: ''
      },
      editable: 1,
      activo: 1,
      state: 'new'
    }
    this.tablaDocumentos = [...this.tablaDocumentos, element];
    this.idRow += 1;

  }

  onClicEliminarComunicacion() {
    if (this.selectedRowDocument && !this.selectedRowDocument.editable) {
      const error = this.translate.instant('CUMCO003.MENSAJES.eliminarRegistroError',
        { codigo: this.selectedRowDocument.codigo, descripcion: this.selectedRowDocument.descripcion });
      this.showMessage('error', error, '');
      return
    }
    else if (this.selectedRowDocument && this.selectedRowDocument.state !== 'new') {
      this.tablaDocumentos.find(row => row === this.selectedRowDocument).state = this.selectedRowDocument.state === 'delete' ? 'edit' : 'delete';
    } else if (this.selectedRowDocument && this.selectedRowDocument.state === 'new') {
      let index = this.tablaDocumentos.indexOf(this.selectedRowDocument);
      this.tablaDocumentos = this.tablaDocumentos.filter((val, i) => i !== index);
      this.selectedRowDocument = '';
    }
  }

  onClicGuardarComuniacion() {
    if (!this.camposValidos()) {
      return
    }
    else if (!this.validarRepetidos()) {
      return;
    } else {
      this.subcribeRecorridoRepartoFisico(this.buildJsonComunicacion());
    }
  }

  onClicEliminar() {
    if (this.rows && this.selectedRows.state !== 'new') {
      this.rows.find(row => row === this.selectedRows).state = this.selectedRows.state === 'delete' ? 'edit' : 'delete';
    } else if (this.selectedRows && this.selectedRows.state === 'new') {
      let index = this.rows.indexOf(this.selectedRows);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.selectedRows = undefined;
    }
  }

  onClicGuardar() {
    if (!this.validarCamposPlantilla()) {
      return
    } else if (!this.validarRepetidosPlantillaSubtipoTipo()) {
      return
    }
    else if (!this.validarClaseDiferentePlantillaSubtipo()) {
      return
    }
    else if (!this.validarSalidaReactivarTerminos()) {
      return
    }
    else if (!this.validarEntradaSubRadicadoTipoDocumental()) {
      return
    }
    else {
      this.subcribeGuardarPlantilla(this.buildJsonPlantilla());
    }
  }

  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX
  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX}


  // Eventos KEYDOWN en INPUT -- Eventos KEYDOWN en INPUT
  // Eventos KEYDOWN en INPUT -- Eventos KEYDOWN en INPUT

  keyDownDiasRequerimiento(row: any) {
    if (row.diasRequerimiento < 1) {
      row.diasRequerimiento = undefined;
      const error = this.translate.instant('CUMCO003.MENSAJES.diasRequerimientoError');
      this.showMessage('error', error, '');
    }
    this.edited(0);
  }

  keyDownDiasProrroga(row: any) {
    if (row.diasProrroga < 1) {
      row.diasProrroga = undefined;
      const error = this.translate.instant('CUMCO003.MENSAJES.diasProrrogaError');
      this.showMessage('error', error, '');
    }
    this.edited(0);
  }


  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarRepetidos(): any {
    for (var _i = 0; _i < this.tablaDocumentos.length; _i++) {
      for (var _k = _i + 1; _k < this.tablaDocumentos.length; _k++) {
        if (this.tablaDocumentos[_k].codigo == this.tablaDocumentos[_i].codigo &&
          this.tablaDocumentos[_k].claseDocumental.id == this.tablaDocumentos[_i].claseDocumental.id) {
          const error = this.translate.instant('CUMCO003.MENSAJES.repetidos',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              codigo: this.tablaDocumentos[_k].codigo,
              claseDocumental: this.tablaDocumentos[_k].claseDocumental.descripcion
            });
          this.showMessage("error", error, '');
          return false;
        }
        else if (this.tablaDocumentos[_k].descripcion.trim() == this.tablaDocumentos[_i].descripcion.trim()) {
          const error = this.translate.instant('CUMCO003.MENSAJES.repetidoComunicacion',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              NombreComunicacionOficial: this.tablaDocumentos[_i].descripcion.trim()
            });
          this.showMessage("error", error, '');
          return false;
        }
      }
    }
    return true;

  }

  camposValidos(): any {

    for (var _i = 0; _i < this.tablaDocumentos.length; _i++) {

      if (this.tablaDocumentos[_i].codigo === '' || this.tablaDocumentos[_i].codigo === String.fromCharCode(127)) {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          {
            filaVacia: String(_i + 1),
            campoVacio: this.translate.instant('CUMCO003.TABLA2.headerTabla1')
          });
        this.showMessage("error", error, '');
        return false;
      }
      else if (this.tablaDocumentos[_i].descripcion === '') {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          {
            filaRep1: String(_i + 1),
            campoVacio: this.translate.instant('CUMCO003.TABLA2.headerTabla2')
          });
        this.showMessage("error", error, '');
        return false;
      }
      else if (this.tablaDocumentos[_i].claseDocumental.id === '' || this.tablaDocumentos[_i].claseDocumental.id === undefined) {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          {
            filaRep1: String(_i + 1),
            campoVacio: this.translate.instant('CUMCO003.TABLA2.headerTabla3')
          });
        this.showMessage("error", error, '');
        return false;
      }

    }
    return true;

  }

  validacionEntrada(rowIndex, event) {
    this.rowIndexValidation = rowIndex;
    this.event = event;
    console.log(this.rows[rowIndex]);
    if (event.id === 1 && this.rows[rowIndex].plantilla.id !== '') {
      this.messageService.clear();
      this.messageService.add({
        key: 'c', sticky: true, severity: 'warn',
        summary: this.translate.instant('CUMCO003.MENSAJES.claseDocNoRequierePlantilla'),
        detail: this.translate.instant('CUMCO003.MENSAJES.detalleClaseDocNoRequierePlantilla')
      });
    } else {
      this.rows[rowIndex].claseDocumental = event;
      this.rows[rowIndex].tipoComunicacion = { id: '', codigoDescripcion: '' };
      this.edited(rowIndex);
    }
  }

  validarCamposPlantilla(): any {
    let valido = true;
    console.log(this.rows);
    for (var _i = 0; _i < this.rows.length; _i++) {
      let errIndex = _i + 1;

      if (this.rows[_i].tipoRadicado.id === '' && !this.habilitarPlantilla) {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla2') });
        this.showMessage('error', error, '');
        valido = false;
      }
      else if (this.rows[_i].tramiteTipoRadicado.id === '' && !this.habilitarPlantilla) {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla3') });
        this.showMessage('error', error, '');
        valido = false;
      }
      //else if (this.rows[_i].tipoDocumental.id === '' && !this.habilitarPlantilla) {
        else if (this.rows[_i].tipoDocumental.id === '') {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla4') });
        this.showMessage('error', error, '');
        valido = false;
      }
      //else if (this.rows[_i].claseDocumental.id === '' && !this.habilitarPlantilla) {
      else if (this.rows[_i].claseDocumental.id === '' && !this.habilitarPlantilla) {
        const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaVacioError',
          { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla5') });
        this.showMessage('error', error, '');
        valido = false;
      }
      else if (this.rows[_i].claseDocumental.codigoDescripcion != '2 Entrada' &&  this.rows[_i].claseDocumental.id !== '') {
        if (this.rows[_i].plantilla.id === '' || this.rows[_i].plantilla.id === undefined) {
          const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaPlantillaVacioError',
            { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla1') });
          this.showMessage('error', error, '');
          valido = false;
        }
      }
      else if (this.rows[_i].terminoRequerimiento) {
        if (!this.rows[_i].diasRequerimiento) {
          const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaDiasReqVacioError',
            { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla7') });
          this.showMessage('error', error, '');
          valido = false;
        }
        else if (this.rows[_i].diasRequerimiento <= 0) {
          const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaDiasMayorError',
            { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla7') });
          this.showMessage('error', error, '');
          valido = false;
        }
      }
      else if (this.rows[_i].prorrogaEntidad || this.rows[_i].prorrogaPeticionario) {
        if (!this.rows[_i].diasProrroga) {
          const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaDiasProVacioError',
            { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla10') });
          this.showMessage('error', error, '');
          valido = false;
        }
        else if (this.rows[_i].diasProrroga <= 0) {
          const error = this.translate.instant('CUMCO003.MENSAJES.campoFilaDiasMayorError',
            { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO003.TABLA1.headerTabla10') });
          this.showMessage('error', error, '');
          valido = false;
        }
      }
    }
    return valido;
  }

  validarRepetidosPlantillaSubtipoTipo(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {

        if (this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {

          if (this.rows[_k].tramiteTipoRadicado.id === this.rows[_i].tramiteTipoRadicado.id && 
              this.rows[_i].tramiteTipoRadicado.id !== '' && this.rows[_k].tramiteTipoRadicado.id !== '' &&
              this.rows[_k].tipoDocumental.id === this.rows[_i].tipoDocumental.id &&
              this.rows[_i].tipoDocumental.id !== '' && this.rows[_k].tipoDocumental.id !== '' &&
              this.rows[_k].plantilla.id === this.rows[_i].plantilla.id &&
              this.rows[_i].plantilla.id !== '' && this.rows[_k].plantilla.id !== '') {

            const error = this.translate.instant('CUMCO003.MENSAJES.campoSubRadciadoTipoDocumentalRepetidoError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                plantilla: this.rows[_i].plantilla.codigo,
                subRadicado: this.rows[_i].tramiteTipoRadicado.descripcion,
                tipoDocumental: this.rows[_i].tipoDocumental.descripcion
              });
            this.showMessage("error", error, '');
            return false;
          }

        }
      }
    }


    if (this.seleccionPlantilla || this.seleccionRadicado || this.seleccionClaseDocumental) {

      var filteredInitialData = [];

      for (const iniData of this.initialData1) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.rows.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.rows.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.rows[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].tramiteTipoRadicado.id === this.rows[_i].tramiteTipoRadicado.id &&
              filteredInitialData[_k].tramiteTipoRadicado.id !== ''  && this.rows[_i].tramiteTipoRadicado.id !== '' &&
              filteredInitialData[_k].tipoDocumental.id === this.rows[_i].tipoDocumental.id &&
              filteredInitialData[_k].tipoDocumental.id !== ''  && this.rows[_i].tipoDocumental.id !== '' &&
              filteredInitialData[_k].plantilla.id === this.rows[_i].plantilla.id && 
              filteredInitialData[_k].plantilla.id !== ''  && this.rows[_i].plantilla.id !== '') {
  
              const error = this.translate.instant('CUMCO003.MENSAJES.campoSubRadciadoTipoDocumentalRepetidoFiltradoError',
                {
                  filaRep1: String(_i + 1),
                  plantilla: filteredInitialData[_k].plantilla.codigo,
                  subRadicado: filteredInitialData[_k].tramiteTipoRadicado.descripcion,
                  tipoDocumental: filteredInitialData[_k].tipoDocumental.descripcion
                });
              this.showMessage("error", error, '');
              return false;
            }
  
          }
        }
      }

    }

    return true;

  }

  validarClaseDiferentePlantillaSubtipo(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {

        if (this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {

          if (this.rows[_k].tramiteTipoRadicado.id === this.rows[_i].tramiteTipoRadicado.id &&
            this.rows[_i].tramiteTipoRadicado.id !== '' && this.rows[_k].tramiteTipoRadicado.id !== '' &&
            this.rows[_k].plantilla.id === this.rows[_i].plantilla.id &&
            this.rows[_i].plantilla.id !== '' && this.rows[_k].plantilla.id !== '' &&
            this.rows[_k].claseDocumental.id !== this.rows[_i].claseDocumental.id && 
            this.rows[_i].claseDocumental.id !== '' && this.rows[_k].claseDocumental.id !== '') {

            const error = this.translate.instant('CUMCO003.MENSAJES.claseDocumentalDiferenteError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                plantilla: this.rows[_k].plantilla.codigo,
                subRadicado: this.rows[_k].tramiteTipoRadicado.descripcion
              });
            this.showMessage("error", error, '');
            return false;
          }

        }

      }

    }

    if (this.seleccionPlantilla || this.seleccionRadicado || this.seleccionClaseDocumental) {

      var filteredInitialData = [];

      for (const iniData of this.initialData1) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.rows.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.rows.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.rows[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].tramiteTipoRadicado.id === this.rows[_i].tramiteTipoRadicado.id &&
              filteredInitialData[_k].tramiteTipoRadicado.id !== ''  && this.rows[_i].tramiteTipoRadicado.id !== '' &&
              filteredInitialData[_k].plantilla.id === this.rows[_i].plantilla.id &&
              filteredInitialData[_k].plantilla.id !== ''  && this.rows[_i].plantilla.id !== '' &&
              filteredInitialData[_k].claseDocumental.id !== this.rows[_i].claseDocumental.id && 
              filteredInitialData[_k].claseDocumental.id !== ''  && this.rows[_i].claseDocumental.id !== '') {
  
              const error = this.translate.instant('CUMCO003.MENSAJES.claseDocumentalDiferenteFiltradoError',
                {
                  filaRep1: String(_i + 1),
                  plantilla: this.rows[_i].plantilla.codigo,
                  subRadicado: this.rows[_i].tramiteTipoRadicado.descripcion
                });
              this.showMessage("error", error, '');
              return false;
            }
  
          }
  
        }
  
      }

    }

    return true;

  }

  validarSalidaReactivarTerminos(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {

      if (this.rows[_i].tipoDocumental.accion !== undefined) {
        if (this.rows[_i].claseDocumental.id === 2 && this.rows[_i].tipoDocumental.accion.id === 1 && this.rows[_i].state !== 'delete' &&
            this.rows[_i].claseDocumental.id !== '' && this.rows[_i].tipoDocumental.id !== '') {
          const error = this.translate.instant('CUMCO003.MENSAJES.entradaReactivarTerminosError',
            { filaError: String(_i + 1) });
          this.showMessage("error", error, '');
          return false;

        }
      }
    }
    return true;

  }

  validarEntradaSubRadicadoTipoDocumental(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {

        if (this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {

          if ((this.rows[_k].claseDocumental.id === 1 || this.rows[_i].claseDocumental.id === 1) &&
            this.rows[_i].claseDocumental.id !== '' && this.rows[_k].claseDocumental.id !== '' &&
            this.rows[_k].tramiteTipoRadicado.id === this.rows[_i].tramiteTipoRadicado.id &&
            this.rows[_i].tramiteTipoRadicado.id !== '' && this.rows[_k].tramiteTipoRadicado.id !== '' &&
            this.rows[_k].tipoDocumental.id === this.rows[_i].tipoDocumental.id && 
            this.rows[_i].tipoDocumental.id !== '' && this.rows[_k].tipoDocumental.id !== '') {

            const error = this.translate.instant('CUMCO003.MENSAJES.entradaSubRadicadoTipoDocumentalRepetidoError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                subRadicado: this.rows[_k].tramiteTipoRadicado.descripcion,
                tipoDocumental: this.rows[_k].tipoDocumental.descripcion
              });
            this.showMessage("error", error, '');
            return false;
          }

        }

      }
    }

    if (this.seleccionPlantilla || this.seleccionRadicado || this.seleccionClaseDocumental) {

      var filteredInitialData = [];

      for (const iniData of this.initialData1) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.rows.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.rows.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.rows[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if ((filteredInitialData[_k].claseDocumental.id === 1 || this.rows[_i].claseDocumental.id === 1) &&
            filteredInitialData[_k].claseDocumental.id !== ''  && this.rows[_i].claseDocumental.id !== '' &&
            filteredInitialData[_k].tramiteTipoRadicado.id === this.rows[_i].tramiteTipoRadicado.id &&
            filteredInitialData[_k].tramiteTipoRadicado.id !== ''  && this.rows[_i].tramiteTipoRadicado.id !== '' &&
            filteredInitialData[_k].tipoDocumental.id === this.rows[_i].tipoDocumental.id &&
            filteredInitialData[_k].tipoDocumental.id !== ''  && this.rows[_i].tipoDocumental.id !== '') {
  
              const error = this.translate.instant('CUMCO003.MENSAJES.entradaSubRadicadoTipoDocumentalRepetidoFiltradoError',
                {
                  filaRep1: String(_i + 1),
                  subRadicado: filteredInitialData[_k].tramiteTipoRadicado.descripcion,
                  tipoDocumental: filteredInitialData[_k].tipoDocumental.descripcion
                });
              this.showMessage("error", error, '');
              return false;
            }
  
          }
        }
      }

    }

    return true;

  }


  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  edited(rowIndex) {
    this.compareInitialData(this.rows, this.initialData1);
  }

  editedDocument(rowIndex) {
    //this.tablaDocumentos[rowIndex].state = this.tablaDocumentos[rowIndex].state === 'new' ? 'new' : 'edit';
    this.compareInitialData(this.tablaDocumentos, this.initialData2);
  }


  onchangeTerminoRequerimiento(row) {
    if (row.terminoRequerimiento === 0) {
      row.diasRequerimiento = undefined;
    }
    this.edited(0);
  }

  onchangeDiasProrroga(row) {
    if (row.prorrogaEntidad === 0 && row.prorrogaPeticionario === 0) {
      row.diasProrroga = undefined;
    }
    this.edited(0);
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

  buildJsonPlantilla() {
    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "plantilla.id",
        "type": "autocomplete",
        "required": false
      },
      {
        "name": "plantilla.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.id",
        "type": "autocomplete",
        "required": true
      },
      {
        "name": "tipoRadicado.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.id",
        "type": "autocomplete",
        "required": true
      },
      {
        "name": "tramiteTipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.id",
        "type": "autocomplete",
        "required": true
      },
      {
        "name": "tipoDocumental.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.id",
        "type": "listbox",
        "required": true
      },
      {
        "name": "claseDocumental.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "terminoRequerimiento",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "diasRequerimiento",
        "type": "number",
        "required": false
      },
      {
        "name": "prorrogaEntidad",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "prorrogaPeticionario",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "diasProrroga",
        "type": "number",
        "required": false
      },
      {
        "name": "tipoComunicacion.id",
        "type": "listbox",
        "required": false
      },
      {
        "name": "tipoComunicacion.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "plantilla.jsonConfiguracion",
        "type": "input",
        "required": false
      },
      {
        "name": "plantilla.macroproceso",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoComunicacion.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoComunicacion.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoComunicacion.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.webfile",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.entrada",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.modificarDiaTermino",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.cof",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "cantidad",
        "type": "input",
        "required": false
      }
    ];
    let features = [];
    this.rows.forEach(row => {
      if (row.state !== 'new') {
        features.push({
          "attributes": {
            "id": row.id,
            "plantilla.id": row.plantilla.id ? row.plantilla.id : '',
            "plantilla.codigo": row.plantilla.codigo ? row.plantilla.codigo : '',
            "tipoRadicado.id": row.tipoRadicado.id ? row.tipoRadicado.id : '',
            "tipoRadicado.codigoDescripcion": row.tipoRadicado.codigoDescripcion ? row.tipoRadicado.codigoDescripcion : '',
            "tramiteTipoRadicado.id": row.tramiteTipoRadicado.id ? row.tramiteTipoRadicado.id : '',
            "tramiteTipoRadicado.descripcion": row.tramiteTipoRadicado.descripcion ? row.tramiteTipoRadicado.descripcion : '',
            "tipoDocumental.id": row.tipoDocumental.id ? row.tipoDocumental.id : '',
            "tipoDocumental.codigoDescripcion": row.tipoDocumental.codigoDescripcion ? row.tipoDocumental.codigoDescripcion : '',
            "claseDocumental.id": row.claseDocumental.id ? row.claseDocumental.id : '',
            "claseDocumental.codigoDescripcion": row.claseDocumental.codigoDescripcion ? row.claseDocumental.codigoDescripcion : '',
            "terminoRequerimiento": row.terminoRequerimiento,
            "diasRequerimiento": row.diasRequerimiento,
            "prorrogaEntidad": row.prorrogaEntidad,
            "prorrogaPeticionario": row.prorrogaPeticionario,
            "diasProrroga": row.diasProrroga,
            "tipoComunicacion.id": row.tipoComunicacion.id ? row.tipoComunicacion.id : '',
            "tipoComunicacion.codigoDescripcion": row.tipoComunicacion.codigoDescripcion ? row.tipoComunicacion.codigoDescripcion : '',
            "claseDocumental.codigo": row.claseDocumental.codigo,
            "claseDocumental.descripcion": row.claseDocumental.descripcion,
            "plantilla.jsonConfiguracion": "",
            "plantilla.macroproceso": "",
            "tipoDocumental.activo": row.tipoDocumental.activo ? row.tipoDocumental.activo : '',
            "tipoDocumental.codigo": row.tipoDocumental.codigo ? row.tipoDocumental.codigo : '',
            "tipoDocumental.descripcion": row.tipoDocumental.descripcion ? row.tipoDocumental.descripcion : '',
            "tipoRadicado.descripcion": row.tipoRadicado.descripcion ? row.tipoRadicado.descripcion : '',
            "tipoRadicado.codigo": row.tipoRadicado.codigo ? row.tipoRadicado.codigo : '',
            "tipoRadicado.activo": row.tipoRadicado.activo ? row.tipoRadicado.activo : '',
            "tipoComunicacion.descripcion": row.tipoComunicacion.descripcion ? row.tipoComunicacion.descripcion : '',
            "tipoComunicacion.codigo": row.tipoComunicacion.codigo ? row.tipoComunicacion.codigo : '',
            "tipoComunicacion.activo": row.tipoComunicacion.activo ? row.tipoComunicacion.activo : '',
            "tramiteTipoRadicado.webfile": row.tramiteTipoRadicado.webfile,
            "tramiteTipoRadicado.entrada": row.tramiteTipoRadicado.entrada,
            "tramiteTipoRadicado.modificarDiaTermino": row.tramiteTipoRadicado.modificarDiaTermino,
            "tramiteTipoRadicado.cof": row.tramiteTipoRadicado.cof,
            "tramiteTipoRadicado.activo": row.tramiteTipoRadicado.activo,
            "cantidad": row.cantidad
          },
          "state": row.state
        })
      } else {
        features.push({
          "attributes": {
            "id": "",
            "plantilla.id": row.plantilla.id ? row.plantilla.id : '',
            "plantilla.codigo": "",
            "tipoRadicado.id": row.tipoRadicado.id ? row.tipoRadicado.id : '',
            "tipoRadicado.codigoDescripcion": "",
            "tramiteTipoRadicado.id": row.tramiteTipoRadicado.id ? row.tramiteTipoRadicado.id : '',
            "tramiteTipoRadicado.descripcion": "",
            "tipoDocumental.id": row.tipoDocumental.id ? row.tipoDocumental.id : '',
            "tipoDocumental.codigoDescripcion": "",
            "claseDocumental.id": row.claseDocumental.id ? row.claseDocumental.id : '',
            "claseDocumental.codigoDescripcion": "",
            "terminoRequerimiento": row.terminoRequerimiento,
            "diasRequerimiento": row.diasRequerimiento,
            "prorrogaEntidad": row.prorrogaEntidad,
            "prorrogaPeticionario": row.prorrogaPeticionario,
            "diasProrroga": "",
            "tipoComunicacion.id": row.tipoComunicacion.id ? row.tipoComunicacion.id : '',
            "tipoComunicacion.codigoDescripcion": row.tipoComunicacion.codigoDescripcion ? row.tipoComunicacion.codigoDescripcion : '',
            "claseDocumental.codigo": "",
            "claseDocumental.descripcion": "",
            "plantilla.jsonConfiguracion": "",
            "plantilla.macroproceso": "",
            "tipoDocumental.activo": "",
            "tipoDocumental.codigo": "",
            "tipoDocumental.descripcion": "",
            "tipoRadicado.descripcion": "",
            "tipoRadicado.codigo": "",
            "tipoRadicado.activo": "",
            "tipoComunicacion.descripcion": row.tipoComunicacion.descripcion ? row.tipoComunicacion.descripcion : '',
            "tipoComunicacion.codigo": row.tipoComunicacion.codigo ? row.tipoComunicacion.codigo : '',
            "tipoComunicacion.activo": row.tipoComunicacion.activo ? row.tipoComunicacion.activo : '',
            "tramiteTipoRadicado.webfile": "",
            "tramiteTipoRadicado.entrada": "",
            "tramiteTipoRadicado.modificarDiaTermino": "",
            "tramiteTipoRadicado.cof": "",
            "tramiteTipoRadicado.activo": "",
            "cantidad": ""
          },
          "state": "new"
        })
      }
    })
    return {
      "grd_plantillas": JSON.stringify({
        fields,
        features
      })
    };
  }

  buildJsonComunicacion() {
    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.id",
        "type": "listbox",
        "required": false
      },
      {
        "name": "claseDocumental.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "activo",
        "type": "input",
        "required": false
      },
      {
        "name": "editable",
        "type": "input",
        "required": false
      }
    ];
    let features = [];
    this.tablaDocumentos.forEach(element => {
      if (element.state !== 'new') {
        features.push({
          "attributes": {
            "id": element.id,
            "codigo": element.codigo,
            "descripcion": element.descripcion,
            "claseDocumental.id": element.claseDocumental.id,
            "claseDocumental.descripcion": element.claseDocumental.descripcion,
            "claseDocumental.codigo": element.claseDocumental.codigo,
            "claseDocumental.codigoDescripcion": '',
            "codigoDescripcion": element.codigo + ' ' + element.descripcion,
            "activo": element.activo,
            "editable": element.editable
          },
          "state": element.state
        })
      } else {
        features.push({
          "attributes": {
            "id": '',
            "codigo": element.codigo,
            "descripcion": element.descripcion,
            "claseDocumental.id": element.claseDocumental.id,
            "claseDocumental.descripcion": '',
            "claseDocumental.codigo": '',
            "claseDocumental.codigoDescripcion": '',
            "codigoDescripcion": '',
            "activo": '1',
            "editable": '1'
          },
          "state": 'new'
        })
      }

    })
    return {
      "grd_tipoComunicacion": JSON.stringify({
        fields,
        features
      })
    };
  }

  prueba(event) {
    console.log(event);
    if (this.seleccionPlantilla === '' || this.seleccionPlantilla === undefined) {
      console.log('1');
      this.seleccionPlantilla = undefined;
    }
  }

}

export interface Row {
  idRow: any;
  id: any;
  plantilla: {
    id: any;
    codigo: string;
  };
  tipoRadicado: {
    id: any;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    activo: number;
  };
  tramiteTipoRadicado: {
    id: any;
    descripcion: string;
    tipoRadicado: {
      id: any;
      codigo: string;
      descripcion: string;
      codigoDescripcion: string;
      activo: number;
    },
    modificarDiaTermino: number;
    activo: number;
    entrada: number;
    cof: number;
    webfile: number;
    verbal: number;
    anonimo: number;
  },
  tipoDocumental: {
    id: any;
    activo: number;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    codigoDescripcionGuion: string;
  },
  claseDocumental: {
    id: any;
    descripcion: string;
    codigo: string;
    codigoDescripcion: string;
  },
  tipoComunicacion: {
    id: any;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    codigoDescripcionGuion: string;
    editable: number;
    activo: number;
  },
  terminoRequerimiento: number;
  prorrogaEntidad: number;
  prorrogaPeticionario: number;
  diasRequerimiento: number;
  diasProrroga: number;
  cantidad: number;
  state: string;
}

export interface Documento {
  idRow: any;
  id: any;
  codigo: string;
  descripcion: string;
  codigoDescripcion: string;
  codigoDescripcionGuion: string;
  claseDocumental: {
    id: any;
    descripcion: string;
    codigo: string;
  },
  editable: number;
  activo: number;
  state: string;

}
