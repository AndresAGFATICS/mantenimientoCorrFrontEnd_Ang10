import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Cumco019Service } from './servicio/cumco019.service';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco019',
  templateUrl: './cumco019.component.html',
  styleUrls: ['./cumco019.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO019Component implements OnInit {

  // Variables para los mensajes
  msgs: Message[] = [];

  tipoComunicacionOptions: any[];
  selectedtipoComunicacion: any;

  cargoSuggestionsFilter: any[];
  selectedCargoFilter: any; 

  cols1: any[];
  dataTable1: any[];
  rowSelected1: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 10;

  cols2: any[];
  dataTable2: any[];
  initialData2: any[];
  initialDataSate2 = true;
  rowSelected2: any;
  suggestionsCargoFirmanteTabla2: any[];
  cargos: any[];
  idRow2 = 0;

  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 5;
  pageTable2 = 0;


  

  constructor(private cumco019Service: Cumco019Service,
              private translate: TranslateService,
              private messageService: MessageService) { }

  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribeTablaDocumento('');

  }


  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {
      this.cols1 = [
        { field: 'codigo', header: this.translate.instant('CUMCO019.TABLA1.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO019.TABLA1.headerTabla2') },
        { field: 'claseDocumental.descripcion', header: this.translate.instant('CUMCO019.TABLA1.headerTabla3') }
      ];
      this.cols2 = [
        { field: 'rowIndex', header: '' },
        { field: 'codEsp', header: this.translate.instant('CUMCO019.TABLA2.headerTabla1') },
        { field: 'cargo.codigoNombreGuion', header: this.translate.instant('CUMCO019.TABLA2.headerTabla2'), required: true }
      ];
    });
  }

  subscribeTablaDocumento(parameters: string) {
    this.cumco019Service.getTablaDocumento(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dataTable1 = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.tipoComunicacionOptions = [];
        for (const data of this.dataTable1) {
          this.tipoComunicacionOptions.push(JSON.parse(JSON.stringify(data)));
        }
      });
  }

  subscribeGetRelacionTipoComunicacionCargo(parameters: string) {
    this.cumco019Service.getRelacionTipoComunicacionCargo(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dataTable2 = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable2.forEach(data => data.state = 'noedit' );

        if (this.initialDataSate2) {
          this.initialData2 = [];
          for (const data of this.dataTable2) {
            this.initialData2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialDataSate2 = false;
        }


      });
  }

  subscribeGetCargo(parameters: string) {
    this.cumco019Service.getCargo(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.suggestionsCargoFirmanteTabla2 = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
      });
  }

  subscribePostRelacionGrupoSeguridadRadicado(body: any){
    var respuestaPost
    this.cumco019Service.postRelacionGrupoSeguridadRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO008.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        this.onClickBorrarCargoFilter();
        this.onRowTable1Select('',this.rowSelected1);
        this.showMessage(respuestaPost.message, "success");
      });

  }


  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchCargoFirmanteTabla2(event){
    this.onClickElminiarSelected2();
    this. subscribeGetCargo('?activo=1&codigoNombre=' + event.query);
  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  

  selectCargoFirmanteTabla2($event, rowIndex){
    this.dataTable1[rowIndex].cargo = event; 
    this.editedTable2();
  }

  selectFilter2(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialData2) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if(this.selectedCargoFilter){
      if (this.selectedCargoFilter.id !== undefined && this.selectedCargoFilter.id !== '') {
        filtered = copyInitialData.filter(data => data.cargo.id === this.selectedCargoFilter.id);
      }
      else{
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else{
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.dataTable2 = filtered;

  }


  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutCargoFilter(rowIndex){
    if(this.selectedCargoFilter){
      if (this.selectedCargoFilter.id === undefined || this.selectedCargoFilter.id === ''){
        this.selectedCargoFilter = undefined;
        this.selectFilter2('');
      }
    }
    else if (this.selectedCargoFilter === ''){
      this.selectedCargoFilter = undefined;
      this.selectFilter2('');
    }
  }

 

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones


  onClickBorrarCargoFilter() {
    this.selectedCargoFilter= undefined;
    this.selectFilter2('');
  }


  agregarClick() {
    let newElement = {
      idRow2: this.idRow2,
      id: '',
      cargo: {},
      tipoComunicacion: this.rowSelected1,
      state: 'new',
    }
    this.dataTable2 = [...this.dataTable2, newElement];
    this.idRow2 += 1;

    const newPage = Math.trunc(this.dataTable2.length/this.nRowsTable2) * this.nRowsTable2;
    this.pageTable2 = newPage;
  }

  eliminarClick() {
    if (this.rowSelected2 && this.rowSelected2.state !== 'new') {
      this.dataTable2.find(row => row === this.rowSelected2).state = this.rowSelected2.state === 'delete' ? 'edit' : 'delete';
    } else if (this.rowSelected2 && this.rowSelected2.state === 'new') {
      let index = this.dataTable2.indexOf(this.rowSelected2);
      this.dataTable2 = this.dataTable2.filter((val, i) => i !== index);
      this.rowSelected2 = undefined;
    }
    this.editedTable2();
  }

  onGuardar() {
    if(this.dataTable2.length === 0){
      return;
    }
    else if(!this.validarCamposVacios2()){
      return;
    }
    else if(!this.validarCamposRepetidos2()){
      return;
    }
    else{
      this.subscribePostRelacionGrupoSeguridadRadicado(this.buildJsonRelacionTipoComunicacionCargo());
    }
    
  }

  onClickElminiarSelected2(){
    this.rowSelected2 = undefined;
  }


  // Eventos ON_ROW_SELECT en Tablas -- Eventos ON_ROW_SELECT en Tablas
  // Eventos ON_ROW_SELECT en Tablas -- Eventos ON_ROW_SELECT en Tablas

  onRowTable1Select(event: any, selectionTable1: any){
    this.initialDataSate2 = true;
    this.subscribeGetRelacionTipoComunicacionCargo('?idTipoComunicacion=' + String(selectionTable1.id)); // ?idTipoComunicacion=21
  }


  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas



  validarCamposVacios2(): any{

    for (var _i = 0; _i < this.dataTable2.length;_i++){

      if (!this.dataTable2[_i].cargo.id || this.dataTable2[_i].cargo.id === '' ){
        const error = this.translate.instant('CUMCO019.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO019.TABLA2.headerTabla2') });
        this.showMessage(error, "error");
        return false;
      }
      
    }

    return true;

  }

  validarCamposRepetidos2(): any{

    for (var _i = 0; _i < this.dataTable2.length; _i++){
      for (var _k = _i+1; _k < this.dataTable2.length; _k++){
        if (this.dataTable2[_k].cargo.id === this.dataTable2[_i].cargo.id
          && this.dataTable2[_k].state !== 'delete' && this.dataTable2[_i].state !== 'delete'){
          const error = this.translate.instant('CUMCO019.MENSAJES.campoCargoRepetidoError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), cargo: this.dataTable2[_k].cargo.nombre });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }


    if (this.selectedCargoFilter) {

      var filteredInitialData = [];

      for (const iniData of this.initialData2) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.dataTable2.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.dataTable2.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.dataTable2[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].cargo.id === this.dataTable2[_i].cargo.id ){
              const error = this.translate.instant('CUMCO019.MENSAJES.campoCargoRepetidoFiltroError',
                      {filaRep1: String(_i + 1), cargo: filteredInitialData[_k].cargo.nombre });
                      this.showMessage(error, "error");
              return false;
            }

          }
        }
      }

    }

    return true;

  }



  // Metodos EDICION de Tablas -- Metodos EDICION de Tablass
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  editedTable2(){
    this.compareInitialData(this.dataTable2, this.initialData2);
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
  showMessage(sum: string, sev: string) {
    this.msgs = [];
    this.msgs.push({ severity: sev, summary: sum, detail: '' });

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  // Metodos para Ocultar MENSAJES
  hideMessage() {
    this.msgs = [];
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


  buildJsonRelacionTipoComunicacionCargo(): any {
    var dataSend = [];
    for(var data2 of this.dataTable2){
      if (data2.state !== 'noedit'){
        dataSend.push( {
          id: data2.id,
          idCargo: data2.cargo.id,
          idTipoComunicacion: data2.tipoComunicacion.id,
          state: data2.state
        });

      }
    }

    return(dataSend);
  }



}
