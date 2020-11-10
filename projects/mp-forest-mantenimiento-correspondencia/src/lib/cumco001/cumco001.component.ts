import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Table } from 'primeng/table';

// Importacion de servicios
import { AsignarResponsableService } from './servicio/asignar-responsable.service';
import { ConfirmationService } from 'primeng/api';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

// Importacion Modulo de Para el Traslate
import { TranslateService } from '@ngx-translate/core';

import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-cumco001',
  templateUrl: './cumco001.component.html',
  styleUrls: ['./cumco001.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})


export class CUMCO001Component implements OnInit {

  constructor(private asignarResponsableService: AsignarResponsableService, 
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private translate: TranslateService,
              private el:ElementRef) {}

  // Variables de los autocompletables
  textAutoCompleteTipoRadicado: string; // (Filtro)
  textAutoCompleteOrganismoDependencia: string; // (Filtro)
  tableTextAutoCompleteTipoRadicado: string; // (Tabla)
  tableTextAutoCompleteSubtipoRadicado: string; // (Tabla)
  tableTextAutoCompleteOrganismoDependencia: string; // (Tabla)
  tableTextAutoCompleteFuncionarioSuplente: string; // (Tabla)
  suggestionsAutoCompleteTipoRadicado: string[]; // (Filtro y Tabla)
  suggestionsAutoCompleteOrganismoDependencia: string[]; // (Filtro y Tabla)
  suggestionsAutoCompleteSubTipoRadicado: string[]; // (Tabla)
  suggestionsAutoCompleteFuncionarioSuplente: string[]; // (Tabla)

  // Variables de la tabla
  indexNewNada = 0;
  asignarResponsableData: any[];
  cols: any[];
  selectedRow: any;
  nRowSelect: number;
  nRowsOptions = [1,5,10,15,20,25,50];
  nRows = 15;
  pageTable1 = 0;


  // Variables de los servicios de subcripcion
  responseAsignarResponsable: any[];
  responseTiporRadicado: any[];
  responseOrganismoDependencia: any[];
  responseSubTipoRadicado: any[];
  responseFuncionarioSuplente: any[];
  responsePostAsiganrResponsable: any;

  // Variables de estado inicial
  initiaLState: boolean;
  initialAsignarResponsableData: any[];

  // Variables para los mensajes
  msgs: Message[] = [];

  lang: any;

  prueba: any[];

  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumnsTraslations();

    // Setting de el estado inicial
    this.initiaLState = true;
    this.initialAsignarResponsableData = [];

    // Setting de la variable con el contenido de la tabla
    this.asignarResponsableData = [];

     // Obteniendo todos los datos iniclaes de la tabal en el servicio 'asignarResponsableSubtipoRadicado'
    this.subcribeServiceAsignarResponsable('?codigoDescripcion=&activo=1');
    
    //this.nRows = 5;
    //this.onResize();
    // Ajustando los valores iniciales del los autocompletables
    this.textAutoCompleteTipoRadicado = '';
    this.textAutoCompleteOrganismoDependencia = '';
    this.suggestionsAutoCompleteTipoRadicado = [];
    this.suggestionsAutoCompleteOrganismoDependencia = [];
    this.suggestionsAutoCompleteFuncionarioSuplente = [];


  }


  // Metodos internos -- Metodos internos -- Metodos internos -- Metodos internos -- Metodos internos
  // Metodos internos -- Metodos internos -- Metodos internos -- Metodos internos -- Metodos internos
  // Metodos internos -- Metodos internos -- Metodos internos -- Metodos internos -- Metodos internos  


  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  // SUSCRIBIRSE a '/documentos/1.0.0/asignarResponsableSubtipoRadicado/grid' (Valores Tabla)
  subcribeServiceAsignarResponsable(getParameters: string) {
    this.asignarResponsableService.getAsignarResponsableSubtipoRadicadoGrid(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseAsignarResponsable = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.asignarResponsableError'), getError.error.message); 
      },
      () => {                 // Fin del suscribe
        const responseData = this.responseAsignarResponsable;
        this.asignarResponsableData = [];

        for (const data of responseData) {
          if (!data.funcionario){
            data.funcionario = {codigoNombre: ''};
          }
          else{
            data.funcionario.codigoNombre = data.funcionario.codigoNombreGuion;
          }
          this.asignarResponsableData.push( { ...data, postState: 'noedit'} ); 
        }

        if (this.initiaLState){
          this.initialAsignarResponsableData = [];
          for (const data of this.asignarResponsableData) {
            this.initialAsignarResponsableData.push(JSON.parse(JSON.stringify(data)));
          }
          this.initiaLState = false;
        }
    });
  }

  // SUSCRIBIRSE a '/documentos/1.0.0/tipoRadicado' (Filtro y Tabla)
  subcribeServiceTiporadicado(getParameters: string) {
    this.asignarResponsableService.getTipoRadicado(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseTiporRadicado = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.tipoRadicadoError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteTipoRadicado = [];
        for (const data of this.responseTiporRadicado) {
          this.suggestionsAutoCompleteTipoRadicado.push(data.codigoDescripcion);
        }

    });
  }

  // SUSCRIBIRSE a '/documentos/1.0.0/dependencia/lista' (Filtro y Tabla)
  subcribeServiceOrganismoDependencia(getParameters: string) {
    this.asignarResponsableService.getOrganismoDependencia(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseOrganismoDependencia = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.organismoDependenciaError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteOrganismoDependencia = [];
        for (const data of this.responseOrganismoDependencia) {
          this.suggestionsAutoCompleteOrganismoDependencia.push(data.nombreCodigo);
        }

    });
  }

  // SUSCRIBIRSE a '/documentos/1.0.0/tipoRadicadoTramite' (Tabla)
  subcribeServiceSubTipoRadicado(getParameters: string) {
    this.asignarResponsableService.getSubTipoRadicado(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseSubTipoRadicado = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.subtipoRadicadoError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteSubTipoRadicado = [];
        for (const data of this.responseSubTipoRadicado) {
          this.suggestionsAutoCompleteSubTipoRadicado.push(data.codigoDescripcion);
        }

    });
  }

  // SUSCRIBIRSE a '/sistema/1.0.0/funcionarios/dependenciaAsociados' (Tabla)
  subcribeServiceFuncionarioSuplente(getParameters: string) {
    this.asignarResponsableService.getFuncionarioSuplente(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseFuncionarioSuplente = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.FuncionarioSuplenteError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteFuncionarioSuplente = [];
        for (const data of this.responseFuncionarioSuplente) {
          this.suggestionsAutoCompleteFuncionarioSuplente.push(data.codigoNombre);
        }

    });
  }

  subcribePostAsignarResponsableSubtipoRadicadoGrid(body: any) {
    this.asignarResponsableService.postAsignarResponsableSubtipoRadicadoGrid(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responsePostAsiganrResponsable = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.guardarError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
        this.initiaLState = true;
        this.subcribeServiceAsignarResponsable('?codigoDescripcion=&activo=1');
        this.ngOnInit();
        this.showMessage('success', this.translate.instant('CUMCO001.MENSAJES.exito'), '');
    });
  }

  // SUSCRIBIRSE para Obtener los valores de los headers de la tabla
  subcribeSetColumnsTraslations(){
    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO001.TABLA1.headerTabla0')},
        { field: 'tipoRadicado.codigoDescripcion', header: this.translate.instant('CUMCO001.TABLA1.headerTabla1'), required: true  },
        { field: 'tramiteTipoRadicado.codigoDescripcion', header: this.translate.instant('CUMCO001.TABLA1.headerTabla2'), required: true  },
        { field: 'dependencia.nombreCodigo', header: this.translate.instant('CUMCO001.TABLA1.headerTabla3'), required: true  },
        { field: 'atiendeDependencia', header: this.translate.instant('CUMCO001.TABLA1.headerTabla4') },
        { field: 'atiendeResponsable', header: this.translate.instant('CUMCO001.TABLA1.headerTabla5') },
        { field: 'funcionario.codigoNombre', header:  this.translate.instant('CUMCO001.TABLA1.headerTabla6'), required: true  }
      ];
    });

  }




  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  // Boton CLICK Agregar
  onClicAgregar() {
    
    const newData = {
      "id" : '',
      "tramiteTipoRadicado": {"codigoDescripcion": ''},
      "tipoRadicado": {
        "id": '',
        "codigo": '',
        "descripcion": '',
        "codigoDescripcion": '',
        "activo": '',
      },
      "tramite": {
        "id": '',
        "codigo": '',
        "descripcion": "/donaciones",
        "codigoDescripcion": "",
        "activo": '',
        "diasTramite": '',
        "habil": '',
        "modificable": ''
      },
      "dependencia": {
        "id": '',
        "nombre": "",
        "codigo": "",
        "nombreCodigo": ""
      },
      "funcionario": {
        "id": "",
        "nombre": "",
        "codigoNombre": "",
        "codigoNombreGuion": "",
        "activo": 0
      },
      "atiendeDependencia": 0,
      "atiendeResponsable": 0,
      "postState": "new",
      "newID": 'New ' + String(this.indexNewNada)

    };

    this.asignarResponsableData = [...this.asignarResponsableData, newData];

    this.indexNewNada = this.indexNewNada + 1;

    const newPage = Math.trunc(this.asignarResponsableData.length/this.nRows) * this.nRows;
    this.pageTable1 = newPage;

  }

  // Boton CLICK Eliminar
  onClicEliminar() {
    if (!this.selectedRow){
      this.messageService.add({key: 'topMessage', severity:'info', summary: 'Error al eliminar', detail: 'Porfavor seleccione un registro de la tabla'});
      return;
    }

    if (this.selectedRow.postState === 'new'){
      this.asignarResponsableData = this.asignarResponsableData.filter(obj => obj.newID !== this.selectedRow.newID)
    }
    else{
      this.selectedRow.postState = 'delete';
    }

    
    //this.asignarResponsableData[this.selectedRow].postState = 'delete';
  }

  // Boton CLICK Guardar
  onClicGuardar() {

    // Revisar si hay algún valor vacío
    for(var _i = 0; _i < this.asignarResponsableData.length; _i++){
      let errIndex = _i + 1
      if(!this.asignarResponsableData[_i].tipoRadicado.id){
        this.showMessage('error',
                          this.translate.instant('CUMCO001.MENSAJES.campoFilaVacioError',
                          {filaVacia: String(errIndex), campoVacio: this.translate.instant('CUMCO001.TABLA1.headerTabla1') } ), '');
        return;
      }
      if(!this.asignarResponsableData[_i].tramiteTipoRadicado.id){
        this.showMessage('error',
                          this.translate.instant('CUMCO001.MENSAJES.campoFilaVacioError',
                          {filaVacia: String(errIndex), campoVacio: this.translate.instant('CUMCO001.TABLA1.headerTabla2') } ), '');
        return;
      }
      if(!this.asignarResponsableData[_i].dependencia.id){
        this.showMessage('error',
                          this.translate.instant('CUMCO001.MENSAJES.campoFilaVacioError',
                          {filaVacia: String(errIndex), campoVacio: this.translate.instant('CUMCO001.TABLA1.headerTabla3') } ), '');
        return;
      }
      if(!this.asignarResponsableData[_i].atiendeDependencia && !this.asignarResponsableData[_i].atiendeResponsable){
        this.showMessage('error',
                          this.translate.instant('CUMCO001.MENSAJES.responsableCDCError',
                          {filaVacia: String(errIndex)}), '' );
        return;
      }
      if(!this.asignarResponsableData[_i].funcionario.id){
        this.showMessage('error',
                          this.translate.instant('CUMCO001.MENSAJES.campoFilaVacioError',
                          {filaVacia: String(errIndex), campoVacio: this.translate.instant('CUMCO001.TABLA1.headerTabla6') } ), '');
        return;
      }
    }

    // Revisar si hay algún Subtipo de radicado repetido
    for(var _i = 0; _i < this.asignarResponsableData.length; _i++){
      let errIndex = _i + 1
      for (var _x = errIndex; _x < this.asignarResponsableData.length; _x++){
        if(this.asignarResponsableData[_i].tramiteTipoRadicado.codigoDescripcion === this.asignarResponsableData[_x].tramiteTipoRadicado.codigoDescripcion 
          && this.asignarResponsableData[_i].postState !== 'delete'
          && this.asignarResponsableData[_x].postState !== 'delete'){
          this.showMessage('error', 
                            this.translate.instant('CUMCO001.MENSAJES.repetidoSubtipoRadicadoError',
                            {filaRep1: String(errIndex), filaRep2: String(_x+1), descripcion: this.asignarResponsableData[_i].tramiteTipoRadicado.codigoDescripcion } ), '');
          return;
        }
      }
    }


    if (this.textAutoCompleteTipoRadicado || this.textAutoCompleteOrganismoDependencia) {

      var filteredInitialData = [];

      for (const iniData of this.initialAsignarResponsableData) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.asignarResponsableData.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.asignarResponsableData.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.asignarResponsableData[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].tramiteTipoRadicado.id === this.asignarResponsableData[_i].tramiteTipoRadicado.id) {
  
              this.showMessage('error',
                              this.translate.instant('CUMCO001.MENSAJES.repetidoSubtipoRadicadoFiltroError2',
                              {descripcion: this.asignarResponsableData[_i].tramiteTipoRadicado.codigoDescripcion } ), '');
              return;
            }
  
          }
        }
      }

    }


    this.subcribePostAsignarResponsableSubtipoRadicadoGrid(this.buildJson());
  }

  // Boton CLICK Borrar contenido del Atutocmplete Tipo radicado (Filtro)
  onClicBorrarFilterTipoRadicado() {
    this.textAutoCompleteTipoRadicado = '';
    this.onSelectFilterTipoRadicadoOrOrganismoDependencia('');
  }

  // Boton CLICK Borrar contenido del Atutocmplete Organismo (Filtro)
  onClicBorrarFilterOrganismoDependencia() {
    this.textAutoCompleteOrganismoDependencia = '';
    this.onSelectFilterTipoRadicadoOrOrganismoDependencia('');
  }

  onClickElminiarSelected(){
    this.selectedRow = undefined;
  }

  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  // Autocompletable SEARCH Tipo de Radicado (Filtro y Tabla) 
  searchFilterTipoRadicado(event) {
    this.selectedRow = undefined;
    this.subcribeServiceTiporadicado('?codigoDescripcion=' + event.query + '&activo=1');
  }

  // Autocompletable SEARCH Organismo o Dependencia (Filtro y Tabla) 
  searchFilterOrganismoDependencia(event) {
    this.selectedRow = undefined;
    this.subcribeServiceOrganismoDependencia('?codigoNombre=' + event.query + '&activo=1');
  }

  // Autocompletable SEARCH Subtipo de Radicado (Tabla) 
  searchFilterSubtipoRadicado(row: any, index: number, event) {
    this.selectedRow = undefined;
    this.subcribeServiceSubTipoRadicado('?idTipo=' + row.tipoRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1');
  }

  // Autocompletable SEARCH Funcionario Suplente (Tabla) 
  searchFilterFuncionarioSuplente(event, row) {
    this.selectedRow = undefined;
    if (row.dependencia.id !== ''){
      this.subcribeServiceFuncionarioSuplente('?activo=1&ausente=0&idDependencia=' +  String(row.dependencia.id)  + '&codigoNombre=' + event.query );
    }
  }




  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  // Autocompletable SELECT Tipo Radicado y Organismo Dependencia (Filtros, Ambos)
  onSelectFilterTipoRadicadoOrOrganismoDependencia(event) {
    var selectedTipoRadicado;
    var selectedOrganismoDependencia;

    if (this.textAutoCompleteTipoRadicado.length === 0){
      selectedTipoRadicado = {id: ''};
    }
    else {
      selectedTipoRadicado = this.responseTiporRadicado.find(element => element.codigoDescripcion === this.textAutoCompleteTipoRadicado);
    }

    if (this.textAutoCompleteOrganismoDependencia.length === 0){
      selectedOrganismoDependencia = {id: ''};
    }
    else {
      selectedOrganismoDependencia = this.responseOrganismoDependencia.find(
        element => element.nombreCodigo === this.textAutoCompleteOrganismoDependencia);
    }

    this.subcribeServiceAsignarResponsable('?idTipoRadicado=' + selectedTipoRadicado.id +
    '&idDependencia=' + selectedOrganismoDependencia.id + '&activo=1');
  }

  // Autocompletable SELECT Tipo Radicado  (Tabla)
  onSelectTableTipoRadicado(row: any, index: number) {

    var selectedTipoRadicado;

    if (this.tableTextAutoCompleteTipoRadicado.length === 0){
      selectedTipoRadicado = {id: ''};
    }
    else {
      selectedTipoRadicado = this.responseTiporRadicado.find(
        element => element.codigoDescripcion === this.tableTextAutoCompleteTipoRadicado);

      //dentro de tipoRadicado
      this.asignarResponsableData[index].tipoRadicado.id = selectedTipoRadicado.id;
      this.asignarResponsableData[index].tipoRadicado.codigo = selectedTipoRadicado.codigo;
      this.asignarResponsableData[index].tipoRadicado.descripcion = selectedTipoRadicado.descripcion;
      this.asignarResponsableData[index].tipoRadicado.codigoDescripcion = selectedTipoRadicado.codigoDescripcion;
      this.asignarResponsableData[index].tipoRadicado.activo = selectedTipoRadicado.activo;

      //Quitar elemento Subtipo Radicado
      this.asignarResponsableData[index].tramiteTipoRadicado = {codigoDescripcion: ''};

      //show as it was edited if it is not new
      if ( this.asignarResponsableData[index].postState !== 'new'){
        this.compareInitialData();
      }
      
    }

  }

  // Autocompletable SELECT Subtipo Radicado (Tabla)
  onSelectTableSubRadicado(row: any, index: number) {

    var selectedSubtipoRadicado;

    if (this.tableTextAutoCompleteSubtipoRadicado.length === 0){
      selectedSubtipoRadicado = {id: ''};
    }
    else {
      selectedSubtipoRadicado = this.responseSubTipoRadicado.find(
        element => element.codigoDescripcion === this.tableTextAutoCompleteSubtipoRadicado);

      //dentro de tramiteTipoRadicado  tramiteTipoRadicado.tipoRadicado  tramiteTipoRadicado.tramite
      this.asignarResponsableData[index].tramiteTipoRadicado = selectedSubtipoRadicado ;

      delete this.asignarResponsableData[index].tramiteTipoRadicado.tipoRadicado.codigoDescripcionGuion;
      delete this.asignarResponsableData[index].tramiteTipoRadicado.tipoRadicado.categoria;
      
      //dentro de tramiteTipoRadicado.tramite
      this.asignarResponsableData[index].tramite = selectedSubtipoRadicado.tramite ;

      //show as it was edited if it is not new
      if ( this.asignarResponsableData[index].postState !== 'new'){
        this.compareInitialData();
        //this.asignarResponsableData[index].postState = 'edit';
      }

    }

  }

  // Autocompletable SELECT Organismo Dependencia (Tabla)
  onSelectOrganismoDependencia(row: any, index: number) {
  
    var selectedOrganismoDependencia;

    if (this.tableTextAutoCompleteOrganismoDependencia.length === 0){
      selectedOrganismoDependencia = {id: ''};
    }
    else {
      selectedOrganismoDependencia = this.responseOrganismoDependencia.find(
        element => element.nombreCodigo === this.tableTextAutoCompleteOrganismoDependencia);

      //dentro de dependencia
      this.asignarResponsableData[index].dependencia.id = selectedOrganismoDependencia.id ;
      this.asignarResponsableData[index].dependencia.nombre = selectedOrganismoDependencia.descripcion ;
      this.asignarResponsableData[index].dependencia.codigo = selectedOrganismoDependencia.codigoDescripcion ;
      this.asignarResponsableData[index].dependencia.nombreCodigo = selectedOrganismoDependencia.nombreCodigo ;

      

      //show as it was edited if it is not new
      if ( this.asignarResponsableData[index].postState !== 'new'){
        this.compareInitialData();
        //this.asignarResponsableData[index].postState = 'edit';
      }

      //Quitar elemento Subtipo Radicado
      if(this.asignarResponsableData[index].state === 'edit' || this.asignarResponsableData[index].state === 'new'){
        this.asignarResponsableData[index].funcionario = {codigoDescripcion: '', id: ''};
      }

    }

  }

  onSelectFuncionarioSuplente(row: any, index: number) {
  
    var selectedFuncionarioSuplente;

    if (this.tableTextAutoCompleteFuncionarioSuplente.length === 0){
      selectedFuncionarioSuplente = {id: ''};
    }
    else {
      selectedFuncionarioSuplente = this.responseFuncionarioSuplente.find(
        element => element.codigoNombre === this.tableTextAutoCompleteFuncionarioSuplente);

      //dentro de funcionario
      this.asignarResponsableData[index].funcionario.id = selectedFuncionarioSuplente.id ;
      this.asignarResponsableData[index].funcionario.nombre = selectedFuncionarioSuplente.nombre ;
      this.asignarResponsableData[index].funcionario.codigoNombre = selectedFuncionarioSuplente.codigoNombre ;
      this.asignarResponsableData[index].funcionario.codigoNombreGuion = selectedFuncionarioSuplente.nombre + ' - ' + selectedFuncionarioSuplente.id;
      this.asignarResponsableData[index].funcionario.activo = 1;

      //show as it was edited if it is not new
      if ( this.asignarResponsableData[index].postState !== 'new'){
        this.compareInitialData();
        //this.asignarResponsableData[index].postState = 'edit';
      }
    }

  }


  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroRadicado(){
    if(this.textAutoCompleteTipoRadicado === null){
      this.onClicBorrarFilterTipoRadicado();
    }
  }

  focusOutOranismoDependencia(){
    if(this.textAutoCompleteOrganismoDependencia === null){
      this.onClicBorrarFilterOrganismoDependencia();
    }
  }


  // Eventos OnCHANGE de los checkbox -- Eventos OnCHANGE de los checkbox
  // Eventos OnCHANGE de los checkbox -- Eventos OnCHANGE de los checkbox

  // Checkbox OnCHANGE CDC  (Tabla)
  onChangeCDC(row: any, index: number) {

    const valueCDC = this.asignarResponsableData[index].atiendeDependencia;

    //dentro de atiendeResponsable 
    if (valueCDC){
      this.asignarResponsableData[index].atiendeResponsable = 0;
      this.asignarResponsableData[index].atiendeDependencia = 1;
    }

    //show as it was edited if it is not new
    if ( this.asignarResponsableData[index].postState !== 'new'){
      this.compareInitialData();
      //this.asignarResponsableData[index].postState = 'edit';
    }

  }

  // Checkbox OnCHANGE Responsable  (Tabla)
  onChangeResponsable(row: any, index: number) {

    const valueResponsable = this.asignarResponsableData[index].atiendeResponsable;

    //dentro de atiendeDependencia
    if (valueResponsable){
      this.asignarResponsableData[index].atiendeDependencia = 0;
      this.asignarResponsableData[index].atiendeResponsable = 1;
    }

    //show as it was edited if it is not new
    if ( this.asignarResponsableData[index].postState !== 'new'){
      this.compareInitialData();
      //this.asignarResponsableData[index].postState = 'edit';
    }

  }


  // Metodos Creacion datos Para Guardar -- Metodos Creacion datos Para Guardar
  // Metodos Creacion datos Para Guardar -- Metodos Creacion datos Para Guardar

  buildJson(){
    let fields = [
      {
        "name": "id",
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
        "name": "tramiteTipoRadicado.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.id",
        "type": "autocomplete",
        "required": true
      },
      {
        "name": "dependencia.nombreCodigo",
        "type": "input",
        "required": false
      },
      {
        "name": "atiendeDependencia",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "atiendeResponsable",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "funcionario.id",
        "type": "autocomplete",
        "required": false
      },
      {
        "name": "funcionario.codigoNombre",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.modificarDiaTermino",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.nombreCodigoGuion",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.idTercero",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.usuarioDelegacion",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.imagenFirma",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.nombreDelegacion",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.codigoNombreGuion",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.cedula",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.idTercero",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.clave",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.modificable",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.codigoDescripcionGuion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.habil",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.diasTramite",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.email",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.ausente",
        "type": "input",
        "required": false
      },
      {
        "name": "funcionario.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.id",
        "type": "input",
        "required": true
      },
      {
        "name": "funcionario.nombre",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.nombre",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.listaFuncionarios",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.fechaInicioVigencia",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.fechaFinVigencia",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.dependenciasHijas",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.codigoDescripcionGuion",
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
        "name": "tramiteTipoRadicado.verbal",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.cof",
        "type": "input",
        "required": false
      },
      {
        "name": "codigoExcluir",
        "type": "input",
        "required": false
      }
    ];
    
    let features = [];

    this.asignarResponsableData.forEach(element => {
      
      features.push({
        "attributes": {
          "id": element.id,
          "tipoRadicado.id": element.tipoRadicado.id ,
          "tipoRadicado.codigoDescripcion": element.tipoRadicado.codigoDescripcion,
          "tramiteTipoRadicado.id": element.tramiteTipoRadicado.id,
          
          "tramiteTipoRadicado.codigoDescripcion": element.tramiteTipoRadicado.codigoDescripcion,
          "tramiteTipoRadicado.descripcion": element.tramiteTipoRadicado.descripcion,
          
          "dependencia.id": element.dependencia.id,
          "dependencia.nombreCodigo": element.dependencia.nombreCodigo,
          
          "atiendeDependencia": element.atiendeDependencia,
          "atiendeResponsable": element.atiendeResponsable,
          
          "funcionario.id": element.funcionario.id,
          "funcionario.codigoNombre": element.funcionario.codigoNombre,
          
          "tramiteTipoRadicado.activo": element.tramiteTipoRadicado.activo,
          "tramiteTipoRadicado.modificarDiaTermino": element.tramiteTipoRadicado.modificarDiaTermino,
          
          "dependencia.nombreCodigoGuion": "",
          "dependencia.idTercero": "",
          
          "funcionario.usuarioDelegacion": "",
          "funcionario.imagenFirma": "",
          "funcionario.nombreDelegacion": "",
          "funcionario.codigoNombreGuion": element.funcionario.codigoNombreGuion,
          "funcionario.cedula": "",
          "funcionario.idTercero": "",
          "funcionario.clave": "",
          
          "tramite.modificable": element.tramite.modificable,
          "tramite.codigoDescripcionGuion": "",
         
          "tipoRadicado.activo": element.tipoRadicado.activo,
          "tipoRadicado.codigo": element.tipoRadicado.codigo,
          "tipoRadicado.descripcion": element.tipoRadicado.descripcion,
          
          "tramite.habil": element.tramite.habil,
          "tramite.diasTramite": element.tramite.diasTramite,
          
          "funcionario.email": "",
          "funcionario.ausente": "",
          "funcionario.activo": element.funcionario.activo,
          
          "tramite.descripcion": element.tramite.descripcion,
          "tramite.codigoDescripcion": element.tramite.codigoDescripcion,
          "tramite.codigo": element.tramite.codigo,
          "tramite.activo": element.tramite.activo,
          "tramite.id": element.tramite.id,
          
          "funcionario.nombre": element.funcionario.nombre,
          
          "dependencia.nombre": element.dependencia.nombre,
          "dependencia.listaFuncionarios": "",
          "dependencia.fechaInicioVigencia": "",
          "dependencia.fechaFinVigencia": "",
          "dependencia.dependenciasHijas": "",
          "dependencia.codigo": element.dependencia.codigo,
          
          "tipoRadicado.codigoDescripcionGuion": "",
          "tramiteTipoRadicado.webfile": element.tramiteTipoRadicado.webfile,
          "tramiteTipoRadicado.entrada": element.tramiteTipoRadicado.entrada,
          "tramiteTipoRadicado.verbal": element.tramiteTipoRadicado.verbal,
          "tramiteTipoRadicado.cof": element.tramiteTipoRadicado.cof,
          "codigoExcluir": ""
        },
      "state": element.postState

      });

  

    });

    
    return {
      "grd_responsableSubtipoRadicado": JSON.stringify({
        fields,
        features
      })
    };

  }

  // Metodos para Definir Color Deacuerdo al Estado de la Fila  -- Metodos para Definir Color Deacuerdo al Estado de la Fila
  // Metodos para Definir Color Deacuerdo al Estado de la Fila  -- Metodos para Definir Color Deacuerdo al Estado de la Fila

  gteRowColorState(rowData: any){

    switch(rowData.postState) {
      case 'new': {
        return {'background-color': '#77DD77'};
        break;
      }
      case 'delete': {
        return {'background-color': '#D36E70'};
        break;
      }
      case 'edit': {
        return {'background-color': '#E3B778'};
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
    this.msgs.push({severity: sev, summary: sum, detail: det});

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

  @HostListener('window:resize', ['$event.target']) onResize() {

    var contentHeight = document.getElementById('mantenimiento-correspondencia-conenido').scrollHeight;
    var windowHeight = window.innerHeight ;
    var a = window.outerHeight + 100

    //console.log("Contendio: " + String(contentHeight));
    //console.log("Ventana D: " + String(windowHeight));
    //console.log("Ventana F: " + String(a));
    //console.log("Pantalla: " + String(screen.height));
    

    if(a > screen.height-100){
      this.nRows = 15;
      return
    }

    if (contentHeight > windowHeight ){
      if (this.nRows === this.nRowsOptions[0]){
        this.nRows = this.nRows;
      }else{
        this.nRows = this.nRows - 1;
      }
    }
    else{
      if (this.nRows === 25 ){
        this.nRows = this.nRows;
      }else{
        this.nRows = this.nRows + 1;
      }
    }




  }


  // Metodos para Comparar la tabla Actual con los datos Iniciales  -- Metodos para Comparar la tabla Actual con los datos Iniciales
  // Metodos para Comparar la tabla Actual con los datos Iniciales  -- Metodos para Comparar la tabla Actual con los datos Iniciales
  compareInitialData(){

    for (var _i = 0; _i < this.asignarResponsableData.length; _i++){

      if (this.asignarResponsableData[_i].postState === "edit" || this.asignarResponsableData[_i].postState === "noedit")  {
        var keys = Object.keys(this.asignarResponsableData[_i]);
        var initialData = this.initialAsignarResponsableData.filter(obj => obj.id === this.asignarResponsableData[_i].id);
        var areEqual = true;
        for (const key of keys){
          if (typeof this.asignarResponsableData[_i][key] === "object"){

            if (this.asignarResponsableData[_i][key].id !== initialData[0][key].id){
              areEqual = false;
            }

          }
          else{

            if (this.asignarResponsableData[_i][key] !== initialData[0][key] && key !== "postState" ) {
              areEqual = false;
            }

          }

        }
        if (areEqual){
          this.asignarResponsableData[_i].postState = "noedit";
        }
        else{
          this.asignarResponsableData[_i].postState = "edit";
        }
      }
    }
  }

  changeLanguage(){
    if(this.lang){
      this.translate.use('en');
      //this.subcribeSetColumnsTraslations();
    }else{
      this.translate.use('es');
      //this.subcribeSetColumnsTraslations();
    }
  }


}





