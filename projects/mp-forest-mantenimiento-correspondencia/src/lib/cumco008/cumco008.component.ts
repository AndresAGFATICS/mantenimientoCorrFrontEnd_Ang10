import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';


import { Cumco008Service } from './servicio/cumco008.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco008',
  templateUrl: './cumco008.component.html',
  styleUrls: ['./cumco008.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco008Component implements OnInit {

  constructor( private cumco008Service: Cumco008Service,
               private messageService: MessageService,
               private translate: TranslateService) { }

 // Variables para los mensajes
 msgs: Message[] = [];
 msgs2: Message[] = [];

 // Variables Filtro 1
 suggestionsFilterCanal: any[];
 selectionFilterCanal: any;


 // Variables Filtros 2
 suggestionsFilterMedioEnvio: any[];
 selectionFilterMedioEnvio: any;

 dataMedioEnvioFilter: any[];


 //Variables Tabla 1
 dataTable1: any[] = [];
 selectionTable1: any;
 initialDataTable1: any[];
 initialStateTablae1 = true;
 cols1: any[];
 idRow1: number;
 nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
 nRowsTable1 = 10;
 pageTable1 = 0;
 loading1: boolean;


//Variables Tabla 2
 dataTable2: any[] = [];
 selectionTable2: any;
 initialDataTable2: any[];
 initialStateTablae2 = true;
 cols2: any[];
 idRow2: number;
 nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
 nRowsTable2 = 5;
 pageTable2 = 0;
 loading2: boolean;


  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de las Tablas
    this.subcribeSetColumns();

    // Obtener Datos Tabala 1
    this.subscribeGetCanalEnvio('');

  }


  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS 

  subcribeSetColumns() {

    this.translate.get(['']).subscribe(translations => {
      this.cols1 = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO008.TABLA1.headerTabla0') },
        { field: 'codigo', header: this.translate.instant('CUMCO008.TABLA1.headerTabla1'), required: true },
        { field: 'descripcion', header: this.translate.instant('CUMCO008.TABLA1.headerTabla2'), required: true  },
        { field: 'activo', header: this.translate.instant('CUMCO008.TABLA1.headerTabla3') },
        { field: 'virtual', header: this.translate.instant('CUMCO008.TABLA1.headerTabla4') },
        { field: 'presencial', header: this.translate.instant('CUMCO008.TABLA1.headerTabla5') },
        { field: 'telefonico', header: this.translate.instant('CUMCO008.TABLA1.headerTabla6') }
      ];

      this.cols2 = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO008.TABLA2.headerTabla0') },
        { field: 'medioEnvio.descripcion', header: this.translate.instant('CUMCO008.TABLA2.headerTabla1'), required: true  },
        { field: 'medioEnvio.fuente.codigo', header: this.translate.instant('CUMCO008.TABLA2.headerTabla2') },
        { field: 'virtual', header: this.translate.instant('CUMCO008.TABLA2.headerTabla3')}
      ];
    });
  }

  subscribeGetCanalEnvio(parameters: any) {
    this.loading1 = true;
    this.cumco008Service.getCanalEnvio(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dataTable1 = [];
        getRes.forEach(res => {
          this.dataTable1.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading1 = false;
      },
      () => {                 // Fin del suscribe
        this.dataTable1.forEach(data => data.state = 'noedit' );

        if (this.initialStateTablae1){
          this.initialDataTable1 = [];
          for (const data of this.dataTable1) {
            this.initialDataTable1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTablae1 = false;
        }
        this.loading1 = false;
      });
  }
  
  subscribeGetCanalEnvioSuggestions(parameters: any){
    var responseData: any[]; 
    this.cumco008Service.getCanalEnvioDescripcion(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.suggestionsFilterCanal = responseData;
      });
  }

  subcribePostCanalEnvio(body: any){
    var respuestaPost
    this.cumco008Service.postCanalEnvio(body).subscribe(
      
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
        this.selectionFilterCanal = undefined;
        this.initialStateTablae1 = true,
        this.subscribeGetCanalEnvio('');
        this.showMessage(respuestaPost.message, "success");
      });

  }

  suscribeGetMedioCanalEnvio(parameters: any) {
    this.loading2 = true;
    this.cumco008Service.getMedioCanalEnvio(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dataTable2 = [];
        getRes.forEach(res => {
          this.dataTable2.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading2 = false;
      },
      () => {                 // Fin del suscribe
        this.dataTable2.forEach(data => data.state = 'noedit' );


        if (this.initialStateTablae2){
          this.dataMedioEnvioFilter = [];
          for (const data of this.dataTable2) {
            this.dataMedioEnvioFilter.push({ ...data.medioEnvio, codigoDescripcion: data.medioEnvio.codigo + ' - ' + data.medioEnvio.descripcion });
          }

          this.initialDataTable2 = [];
          for (const data of this.dataTable2) {
            this.initialDataTable2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTablae2 = false;
        }
        this.loading2 = false;
      });
  }

  subscribeGetMedioEnvioSuggestions(parameters: any){
    
    var responseData: any[]; 
    this.cumco008Service.getMedioEnvio(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.suggestionsFilterMedioEnvio = responseData;
      });

  }
 
  subcribePostAsociacionMedioCanal(body: any){
    var respuestaPost
    this.cumco008Service.postAsociacionMedioCanal(body).subscribe(
      
      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO008.MENSAJES.falloGuardar');
        this.showMessage2(error, "error");
      },
      () => {                 // Fin del suscribe
        if (respuestaPost.message == 'La relación del medio de envío null con el canal null no puede ser eliminada: Se encuentra asociada a uno o más borradores y/o radicados en el sistema' ){
          var detelteData: any;
          this.dataTable2.forEach(element => {
            if (element.state === 'delete'){
              detelteData = element;
              return;
            }
          });
          const error = this.translate.instant('CUMCO008.MENSAJES.eliminarAsociacionMedioCanalError',
                        {medio: detelteData.medioEnvio.descripcion , canal: detelteData.canalEnvio.descripcion } ); 
          this.showMessage2(error, "error");
        }
        else{
          this.selectionFilterMedioEnvio = undefined;
          this.initialStateTablae2 = true,
          this.onClicBorrarSelectedMedioEnvioFilter();
          this.showMessage2(respuestaPost.message, "success");
        }
        
      });

  }


  subcribePostAsociacionMedioCanal2(body: any){
    let respuestaPost;
    this.cumco008Service.postAsociacionMedioCanal2(body).subscribe(
      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO008.MENSAJES.falloGuardar');
        this.showMessage2(error, "error");
      },
      () => {                 // Fin del suscribe

          this.selectionFilterMedioEnvio = undefined;
          this.initialStateTablae2 = true,
          this.onClicBorrarSelectedMedioEnvioFilter();
          this.showMessage2(respuestaPost.message, "success");

      });

  }

  subcribeGetRadicadoMedioEnvio(parameters: any){
    
    var responseData: any[]; 
    this.cumco008Service.getRadicadoMedioEnvio(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        if(responseData.length !== 0){
          const error = this.translate.instant('CUMCO008.MENSAJES.medioEnvioAsociadoRadicadodoError',
                        {medioEnvio: this.selectionTable2.medioEnvio.descripcion , canal: this.selectionTable1.codigo + ' - '  +  this.selectionTable1.descripcion  });
          this.showMessage2(error, "error");
        }
        else{
          this.dataTable2.find(row2 => row2 === this.selectionTable2).state = this.selectionTable2.state === 'delete' ? 'edit' : 'delete';
          this.editedTable2();
        }

      });

  }

  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchCanalFilter(event) {
    this.subscribeGetCanalEnvioSuggestions('?activo=1' + '&codigoDescripcion=' + event.query); 
  }

  searchMedioEnvioFilter(event){
    this.selectionTable2 = undefined;
    this.subscribeGetMedioEnvioSuggestions('?activo=1' + '&codigoDescripcion=' + event.query) // codigoDescripcion=serv
  }


  searchMedioFilterFil(event){
    this.selectionTable2 = undefined;


    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataMedioEnvioFilter.length; i++) {
      let data = this.dataMedioEnvioFilter[i];
      if (data.codigoDescripcion.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsFilterMedioEnvio = filtered;
    //this.subscribeGetMedioEnvioSuggestions('?activo=1' + '&codigoDescripcion=' + event.query) // codigoDescripcion=serv
  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectCanalFilter(){
    this.subscribeGetCanalEnvio('?idCanal=' + this.selectionFilterCanal.id);
  }

  selectMedioEnvioFilter(){
    this.suscribeGetMedioCanalEnvio('?idCanal=' + this.selectionTable1.id + '&idMedio=' + this.selectionFilterMedioEnvio.id); //?idCanal=1060&idMedio=1
  }

  selectMedioEnvioTable(row: any){
    this.editedTable2();
  }

  
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroCanal(){
    if(this.selectionFilterCanal){
      if (this.selectionFilterCanal.id === undefined || this.selectionFilterCanal.id === ''){
        this.selectionFilterCanal = undefined;
        this.onClicBorrarSelectedCanalFilter();
      }
    }
    else if (this.selectionFilterCanal === ''){
      this.selectionFilterCanal = undefined;
      this.onClicBorrarSelectedCanalFilter();
    }
  }

  focusOutFiltroMedioEnvio(){
    if(this.selectionFilterMedioEnvio){
      if (this.selectionFilterMedioEnvio.id === undefined || this.selectionFilterMedioEnvio.id === ''){
        this.selectionFilterMedioEnvio = undefined;
        this.onClicBorrarSelectedMedioEnvioFilter();
      }
    }
    else if (this.selectionFilterMedioEnvio === ''){
      this.selectionFilterMedioEnvio = undefined;
      this.onClicBorrarSelectedMedioEnvioFilter();
    }
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClicBorrarSelectedCanalFilter(){
    this.selectionFilterCanal = undefined;
    this.subscribeGetCanalEnvio('');
  }

  onClicBorrarSelectedMedioEnvioFilter(){
    this.selectionFilterMedioEnvio = undefined;
    if (this.selectionTable1){
      this.initialStateTablae2 = true;
      this.suscribeGetMedioCanalEnvio('?idCanal=' + String(this.selectionTable1.id));
    }
  }

  onClickAgregar1() {
    
    let newElement = {
      idRow1: this.idRow1,
      id: '',
      activo: 1,
      codigo: '',
      codigoDescripcion: '',
      descripcion: '',
      pqr: 0,
      presencial: 0,
      telefonico: 0,
      virtual: 0,
      state: 'new',
    }
    this.dataTable1 = [...this.dataTable1, newElement];
    this.idRow1 += 1;

    const newPage = Math.trunc(this.dataTable1.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;


  }

  onClickEliminar1() { 
    if (this.selectionTable1 && this.dataTable2.length !== 0){
      const error = this.translate.instant('CUMCO008.MENSAJES.campoEliminarCanalError',
                      {codigo: this.selectionTable1.codigo, descripcion: this.selectionTable1.descripcion });
        this.showMessage(error, "error");
    }
    else if (this.selectionTable1 && this.selectionTable1.state !== 'new') {
      this.dataTable1.find(row => row === this.selectionTable1).state = this.selectionTable1.state === 'delete' ? 'edit' : 'delete';
      this.editedTable1();
    } else if (this.selectionTable1 && this.selectionTable1.state === 'new') {
      let index = this.dataTable1.indexOf(this.selectionTable1);
      this.dataTable1 = this.dataTable1.filter((val, i) => i !== index);
      this.selectionTable1 = undefined;
    }

  }

  onClickGuardar1(){

    if(!this.validarCamposVacios1()){
      return;
    }
    else if(!this.validarCamposRepetidos1()){
      return;
    }
    else{
      this.subcribePostCanalEnvio(this.buildJson1());
    }

  }

  onClickAgregar2(){

    let newElement = {
      idRow2: this.idRow2,
      id: '',
      canalEnvio: this.selectionTable1,
      medioEnvio: {fuente: {codigo: '', descripcion: ''} },
      state: 'new',
    }
    this.dataTable2 = [...this.dataTable2, newElement];
    this.idRow2 += 1;

    const newPage = Math.trunc(this.dataTable2.length/this.nRowsTable2) * this.nRowsTable2;
    this.pageTable2 = newPage;

  }

  onClickEliminar2(){

    if (this.selectionTable2 && this.selectionTable2.state !== 'new') {
      this.subcribeGetRadicadoMedioEnvio('?activos=1&page=1&size=1&idCanalEnvio=' + String(this.selectionTable1.id) + '&idMedioEnvio=' + String(this.selectionTable2.medioEnvio.id) ); // ?activos=1&page=1&size=1&idCanalEnvio=1&idMedioEnvio=3
    } else if (this.selectionTable2 && this.selectionTable2.state === 'new') {
      let index = this.dataTable2.indexOf(this.selectionTable2);
      this.dataTable2 = this.dataTable2.filter((val, i) => i !== index);
      this.selectionTable2 = undefined;
    }

  }

  onClickGuardar2(){
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
      //this.subcribePostAsociacionMedioCanal(this.buildJson2());
      this.subcribePostAsociacionMedioCanal2(this.buildJson22());
    }
  }

  onClickElminiarSelected2(){
    this.selectionTable2 = undefined;
  }


  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX
  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX

  checkboxVirtualChange(row: any){
    if(row.virtual){
      row.presencial = 0;
      row.telefonico = 0;

      for (var data of this.dataTable1){
        if (data !== row){
          data.virtual = 0;
        }
      }
    }
    this.editedTable1();
  }

  checkboxPresencialChange(row: any){
    if(row.presencial){
      row.virtual = 0;
      row.telefonico = 0;
    }
    this.editedTable1()
  }

  checkboxTelefonicoChange(row: any){
    if(row.telefonico){
      row.virtual = 0;
      row.presencial = 0;
    }
    this.editedTable1()
  }


  checkboxVentanillaVirtualChange(row: any){

    if(row.virtual){
      for (var data of this.dataTable2){
        if (data !== row){
          data.virtual = 0;
        }
      }
    }

  }

  // Eventos ON_ROW_SELECT en Tablas -- Eventos ON_ROW_SELECT en Tablas
  // Eventos ON_ROW_SELECT en Tablas -- Eventos ON_ROW_SELECT en Tablas

  onRowTable1Select(event: any, selectionTable1: any){
    this.selectionFilterMedioEnvio = undefined;
    this.initialStateTablae2 = true;
    this.suscribeGetMedioCanalEnvio('?idCanal=' + String(selectionTable1.id));
  }

  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarCamposVacios1(): any{

    for (var _i = 0; _i < this.dataTable1.length;_i++){

      if (!this.dataTable1[_i].codigo.trim()){
        const error = this.translate.instant('CUMCO008.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO008.TABLA1.headerTabla1') });
        this.showMessage(error, "error");
        return false;
      }
      else if(!this.dataTable1[_i].descripcion.trim()){
        const error = this.translate.instant('CUMCO008.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO008.TABLA1.headerTabla2') });
        this.showMessage(error, "error");
        return false;
      }
      
    }

    return true;

  }

  validarCamposRepetidos1(): any{

    for (var _i = 0; _i < this.dataTable1.length; _i++){
      for (var _k = _i+1; _k < this.dataTable1.length; _k++){
        if (this.dataTable1[_k].codigo.trim() === this.dataTable1[_i].codigo.trim() && this.dataTable1[_i].state !== 'delete' && this.dataTable1[_k].state !== 'delete'){
          const error = this.translate.instant('CUMCO008.MENSAJES.campoCodigoRepetidoError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), codigo: this.dataTable1[_k].codigo });
                      this.showMessage(error, "error");
          return false;
        }
        else if (this.dataTable1[_k].descripcion.trim() === this.dataTable1[_i].descripcion.trim() && this.dataTable1[_i].state !== 'delete' && this.dataTable1[_k].state !== 'delete'){
          const error = this.translate.instant('CUMCO008.MENSAJES.campoDescreipcionRepetidoError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.dataTable1[_k].descripcion });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }



    if (this.selectionFilterCanal) {

      var filteredInitialData = [];

      for (const iniData of this.initialDataTable1) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.dataTable1.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.dataTable1.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.dataTable1[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].codigo === this.dataTable1[_i].codigo){
              const error = this.translate.instant('CUMCO008.MENSAJES.campoCodigoRepetidoFiltroError',
                          {filaRep1: String(_i + 1), codigo: filteredInitialData[_k].codigo });
                          this.showMessage(error, "error");
              return false;
            }
            else if (filteredInitialData[_k].descripcion === this.dataTable1[_i].descripcion){
              const error = this.translate.instant('CUMCO008.MENSAJES.campoDescreipcionRepetidoFiltroError',
                          {filaRep1: String(_i + 1), descripcion: filteredInitialData[_k].descripcion });
                          this.showMessage(error, "error");
              return false;
            }
  
          }
        }
      }

    }

    return true;

  }

  validarCamposVacios2(): any{

    for (var _i = 0; _i < this.dataTable2.length;_i++){

      if (!this.dataTable2[_i].medioEnvio.descripcion){
        const error = this.translate.instant('CUMCO008.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO008.TABLA2.headerTabla1') });
        this.showMessage2(error, "error");
        return false;
      }
      
    }

    return true;

  }

  validarCamposRepetidos2(): any{

    for (var _i = 0; _i < this.dataTable2.length; _i++){
      for (var _k = _i+1; _k < this.dataTable2.length; _k++){
        if (this.dataTable2[_k].medioEnvio.id === this.dataTable2[_i].medioEnvio.id
          && this.dataTable2[_k].state !== 'delete' && this.dataTable2[_i].state !== 'delete'){
          const error = this.translate.instant('CUMCO008.MENSAJES.campoMedioEnvioRepetidoError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), medioEnvio: this.dataTable2[_k].medioEnvio.descripcion });
                      this.showMessage2(error, "error");
          return false;
        }
      }
    }


    if (this.selectionFilterMedioEnvio) {

      var filteredInitialData = [];

      for (const iniData of this.initialDataTable2) {
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
  
            if (filteredInitialData[_k].medioEnvio.id === this.dataTable2[_i].medioEnvio.id ){
              const error = this.translate.instant('CUMCO008.MENSAJES.campoMedioEnvioRepetidoFiltroError',
                      {filaRep1: String(_i + 1), medioEnvio: filteredInitialData[_k].medioEnvio.descripcion });
                      this.showMessage2(error, "error");
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

  editedTable1(){
    this.compareInitialData(this.dataTable1, this.initialDataTable1);
  }

  editedTable2(){
    this.compareInitialData(this.dataTable2, this.initialDataTable2);
  }


  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL
  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL

  compareInitialData(currentData: any[], initialData: any[]){

    for (var _i = 0; _i < currentData.length; _i++){

      if (currentData[_i].state === "edit" || currentData[_i].state === "noedit")  {
        var keys = Object.keys(currentData[_i]);
        var initialDataValue = initialData.filter(obj => obj.id === currentData[_i].id);
        var areEqual = true;
        for (const key of keys){
          if (typeof currentData[_i][key] === "object"){

            if (currentData[_i][key].id !== initialDataValue[0][key].id){
              areEqual = false;
            }

          }
          else{
            if (currentData[_i][key] !== initialDataValue[0][key] && key !== "state" ) {
              areEqual = false;
            }
          }

        }
        if (areEqual){
          currentData[_i].state = "noedit";
        }
        else{
          currentData[_i].state = "edit";
        }

      }
    }
  }


  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado
  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado

  gteRowColorState(rowData: any){

    switch(rowData.state) {
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

  showMessage(sum: string, sev: string) {
    this.msgs = [];
    this.msgs.push({severity: sev, summary: sum, detail: ''});

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  showMessage2(sum: string, sev: string) {
    this.msgs2 = [];
    this.msgs2.push({severity: sev, summary: sum, detail: ''});

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
  }


  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar
  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar


  buildJson1(){
    var dataSend = [];
    for(const data1 of this.dataTable1){
      if (data1.state !== 'noedit'){
        dataSend.push( {
          id: data1.id,
          descripcion: data1.descripcion,
          codigo: data1.codigo,
          activo: data1.activo,

          pqr: data1.pqr,
          presencial: data1.presencial,
          telefonico: data1.telefonico,
          virtual: data1.virtual,

          state: data1.state
        });

      }
    }

    return(dataSend);
  }

  buildJson11(): any{

    let fields = [
        {
          "name": "id",
          "type": "input",
          "required": "false"
        },
        {
          "name": "descripcion",
          "type": "input",
          "required": "true"
        },
        {
          "name": "codigo",
          "type": "input",
          "required": "false"
        },
        {
          "name": "activo",
          "type": "checkbox",
          "required": "false"
        },
        {
          "name": "pqr",
          "type": "checkbox",
          "required": "false"
        },
        {
          "name": "presencial",
          "type": "checkbox",
          "required": "false"
        },
        {
          "name": "telefonico",
          "type": "checkbox",
          "required": "false"
        },
        {
          "name": "virtual",
          "type": "checkbox",
          "required": "false"
        }
    ];
    let features = [];

    this.dataTable1.forEach(tipo => {
      features.push( {
        attributes: {
          "id": tipo.id,
          "descripcion": tipo.descripcion,
          "codigo": tipo.codigo,
          "activo": tipo.activo,
          "pqr": tipo.pqr,
          "presencial": tipo.presencial,
          "telefonico": tipo.telefonico,
          "virtual": tipo.virtual
        },
        "state": tipo.state
      })

    })
    return {
      "grd_canalEnvio": JSON.stringify({
        fields,
        features
      })
    };


  }

  buildJson2(): any{

    let fields = [
        {
          "name": "id",
          "type": "input",
          "required": "false"
        },
        {
          "name": "canalEnvio.id",
          "type": "input",
          "required": "true"
        },
        {
          "name": "medioEnvio.id",
          "type": "input",
          "required": "false"
        }
    ];
    let features = [];

    this.dataTable2.forEach(tipo => {
      features.push( {
        attributes: {
          "id": tipo.id,
          "canalEnvio.id": tipo.canalEnvio.id,
          "medioEnvio.id": tipo.medioEnvio.id
        },
        "state": tipo.state
      })

    })
    return {
      "grd_med_envio": JSON.stringify({
        fields,
        features
      })
    };


  }

  buildJson22(){

    let dataSend = [];
    for(const data2 of this.dataTable2){
      if (data2.state !== 'noedit'){
        dataSend.push( {
          id: data2.id,
          idCanalEnvio: this.selectionTable1.id,
          idMedioEnvio: data2.medioEnvio.id,
          virtual: data2.virtual,
          state: data2.state
        });

      }
    }

    return(dataSend);
  }

}
