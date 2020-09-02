import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { Cumco017Service } from './servicio/cumco017.service';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco017',
  templateUrl: './cumco017.component.html',
  styleUrls: ['./cumco017.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco017Component implements OnInit {

  constructor(private translate: TranslateService,
    private messageService: MessageService,
    private cumco017Service: Cumco017Service) { }

  forestPropiedad: any;
  habilitarPestana2: boolean;

  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];


  //Variables Tabla 1
  dataTable1: any[] = [];
  selectionTable1: any;
  initialDataTable1: any[];
  initialStateTablae1 = true;
  cols1: any[];
  idRow1: number;
  grupoSistemaData: any[];
  suggestionsGrupoSistema: any[];
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 15;
  pageTable1 = 0;


  // Variables Filtro 2
  suggestionsFilterRadicado: any[];
  selectionFilterRadicado: any;
  grupoAsociadoText: string;
  grupoSeguridadSelected: any;

  //Variables Tabla 2
  dataTable2: any[] = [];
  selectionTable2: any;
  initialDataTable2: any[];
  initialStateTablae2 = true;
  cols2: any[];
  idRow2: number;
  organismoDependenciaData: any[];
  suggestionsOrganismoDependencia: any[];
  selectedDependenciaTable: any;
  funcinoarioData: any[];
  suggestionsFuncinoario: any[];
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 15;
  pageTable2 = 0;


  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    this.subscribeGetGrupoSeguridad('');
    this.subscribeGetClasificacionInformacion('');

    this.subscribeGetOrganismoDependencia('');

    this.subscribeGetForestPropiedades('?nombre=corr.HabilitarEdicionClasifSeg');

  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.cols1 = [
        { field: 'rowIndex', header: '' },
        { field: 'descripcion', header: this.translate.instant('CUMCO017.TABLA1.headerTabla0') },
        { field: 'clasificacionInformacion.codigoNombre', header: this.translate.instant('CUMCO017.TABLA1.headerTabla1') },
        { field: 'observacion', header: this.translate.instant('CUMCO017.TABLA1.headerTabla2') }
      ];

      this.cols2 = [
        { field: 'rowIndex', header: '' },
        { field: 'codigo_tipo_radicado', header: this.translate.instant('CUMCO017.TABLA2.headerTabla0') },
        { field: 'descripcion', header: this.translate.instant('CUMCO017.TABLA2.headerTabla1') }
      ];
    });
  }

  subscribeGetGrupoSeguridad(parameters: any) {
    this.cumco017Service.getGrupoSeguridad(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.initialDataTable1 = [];
        getRes.forEach(res => {
          this.initialDataTable1.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialDataTable1.forEach(data => data.state = 'noedit');

        this.initialDataTable1.forEach(data => {

          if (!data.clasificacionInformacion) {
            data.clasificacionInformacion = { id: '', nombre: '' };
          }

        }

        );
        if (this.initialStateTablae1) {
          this.dataTable1 = [];
          for (const data of this.initialDataTable1) {
            this.dataTable1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTablae1 = false;
        }
      });
  }

  subscribeGetClasificacionInformacion(parameters: any) {
    this.cumco017Service.getClasificacionInformacion(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.grupoSistemaData = [];
        getRes.forEach(res => {
          this.grupoSistemaData.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
      });
  }

  subcribePostAsociarGrupoSeguridad(body: any){
    var respuestaPost
    this.cumco017Service.postAsociarGrupoSeguridad(body).subscribe(
      
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
          this.showMessage(error, "error");
        }
        else{
          this.initialStateTablae1 = true,
          this.subscribeGetGrupoSeguridad('');
          this.showMessage(respuestaPost.message, "success");
          this.subscribeGetForestPropiedades('?nombre=corr.HabilitarEdicionClasifSeg');
        }
        
      });

  }

  subscribeGetRadicadoNoAnuladoCruzado(parameters: any) {
    var responseGet : any[];
    this.cumco017Service.getRadicadoNoAnuladoCruzado(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        responseGet = [];
        getRes.forEach(res => {
          responseGet.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.suggestionsFilterRadicado = [];
        responseGet.forEach(respon => { 
          if (this.suggestionsFilterRadicado.length ===0){
            this.suggestionsFilterRadicado.push(respon.radicado);
          }
          else{
            let ifRadicado = this.suggestionsFilterRadicado.filter(radi => radi.id === respon.radicado.id);
            if(ifRadicado.length === 0){
              this.suggestionsFilterRadicado.push(respon.radicado);
            }
          }
        })

      });
  }

  subcribeGetRadicadoFuncionarioAsociado(parameters: any) {
    this.grupoSeguridadSelected = undefined;
    this.grupoAsociadoText = '';
    this.cumco017Service.getRadicadoFuncionarioAsociado(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.initialDataTable2 = [];
        getRes.forEach(res => {
          this.initialDataTable2.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        if (this.initialDataTable2.length > 0){
          this.grupoSeguridadSelected = this.initialDataTable2[0].grupoSeguridad;
          this.grupoAsociadoText = this.grupoSeguridadSelected.descripcion;
        }
        this.initialDataTable2.forEach(data => data.state = 'noedit');
        this.initialDataTable2.forEach(data => data.nombreCodigo = data.nombre + ' ' + data.codigo);

        if (this.initialStateTablae2) {
          this.dataTable2 = [];
          for (const data of this.initialDataTable2) {
            this.dataTable2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTablae2 = false;
        }

      });
  }

  subscribeGetOrganismoDependencia(parameters: any) {
    this.cumco017Service.getOrganismoDependencia(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.organismoDependenciaData = [];
        getRes.forEach(res => {
          this.organismoDependenciaData.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
      });
  }

  subscribeGetFuncionario(parameters: any) {
    this.cumco017Service.getFuncionario(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.suggestionsFuncinoario = [];
        getRes.forEach(res => {
          this.suggestionsFuncinoario.push(res);
        })
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
    this.cumco017Service.postRelacionGrupoSeguridadRadicado(body).subscribe(

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
        this.initialStateTablae2 = true,
        this.selectRadciadoFilter();
        this.showMessage2(respuestaPost.message, "success");
        this.subscribeGetForestPropiedades('?nombre=corr.HabilitarEdicionClasifSeg');
      });

  }

  subscribeGetForestPropiedades(parameters: any) {
    let response: any[];
    this.cumco017Service.getForestPropiedades(parameters).subscribe(
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
          this.forestPropiedad = response[0];
          if (this.forestPropiedad.valor.toLowerCase() == 'false' ){
            this.habilitarPestana2 = false;
          }
          else{
            this.habilitarPestana2 = true;
          }
        }
        else{
          this.habilitarPestana2 = true;
        }
      });
  }



  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchGrupoSistemaTabla(event) {
    this.onClickElminiarSelected1();

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.grupoSistemaData.length; i++) {
      let data = this.grupoSistemaData[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1 &&
          data.activo)  {
        filtered.push(data);
      }
    }

    this.suggestionsGrupoSistema = filtered;

  }

  searchRadicadoFilter(event) {
    if (event.query.length >= 4){
      this.subscribeGetRadicadoNoAnuladoCruzado('?numRad=' + event.query);
    }
  }

  searchDependenciaTabla(event) {
    this.onClickElminiarSelected2()

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.organismoDependenciaData.length; i++) {
      let data = this.organismoDependenciaData[i];
      if ( data.nombreCodigo.toLowerCase().search(query.toLowerCase()) !== -1 ) {
        filtered.push(data);
      }
    }

    this.suggestionsOrganismoDependencia = filtered;
    

  }

  searchFuncionarioTabla(event, row){
    this.onClickElminiarSelected2()
    if(row.dependencia.id){
      this.subscribeGetFuncionario('?activo=1&ausente=0&idDependencia='+ String(row.dependencia.id) + '&codigoNombre=' + event.query.trim()); //?activo=1&ausente=0&idDependencia=1&codigoNombre=Ga
    }
    else{
      const error = this.translate.instant('CUMCO017.MENSAJES.selecionarDependencia');
      this.showMessage2(error, "error");

    }
    

  }



  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectGrupoSistemaTable() {
    this.editedTable1();
  }

  selectRadciadoFilter() {
    if(this.selectionFilterRadicado){
      this.initialStateTablae2 = true;
      this.subcribeGetRadicadoFuncionarioAsociado('?idRadicado=' + String(this.selectionFilterRadicado.id));

    }
  }

  selectDependenciaTabla(row){   
    row.funcionario = {id: '', nombre: ''};
    this.editedTable2(); 
  }

  selectFuncionarioTable(){
    this.editedTable2();
  }

 
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroRadicado(){
    if(this.selectionFilterRadicado){
      if (this.selectionFilterRadicado.id === undefined || this.selectionFilterRadicado.id === ''){
        this.selectionFilterRadicado = undefined;
        this.dataTable2 = [];
        this.grupoAsociadoText = '';
      }
    }
    else if (this.selectionFilterRadicado === '' || this.selectionFilterRadicado === null){
      this.selectionFilterRadicado = undefined;
      this.dataTable2 = [];
      this.grupoAsociadoText = '';
    }
  }



  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClickAgregar1() {
    let newElement = {
      idRow1: this.idRow1,
      id: '',
      codigo: '',
      descripcion: '',
      codigoDescripcion: '',
      clasificacionInformacion: {id: '', codigoNombre: '' },
      observacion: ' ',
      editable: 1,
      activo: 1,
      state: 'new',
    }
    this.dataTable1 = [...this.dataTable1, newElement];
    this.idRow1 += 1;

    const newPage = Math.trunc(this.dataTable1.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;
  }

  onClickEliminar1() {
    if (this.selectionTable1 && !this.selectionTable1.editable){
      const error = this.translate.instant('CUMCO017.MENSAJES.campoEliminarGrupoSeguridadError',
                      {descripcion: this.selectionTable1.descripcion });
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

  onClickGuardar1() {

    if(!this.validarCamposVacios1()){
      return
    }
    else if(!this.validarCamposRepetidos1()){
      return
    }
    else{
      this.subcribePostAsociarGrupoSeguridad(this.buildJson1());
    }
    
  }

  onClickElminiarSelected1() {
    this.selectionTable1 = undefined;
  } 


  onClickAgregar2() {
    let newElement = {
      idRow2: this.idRow2,
      id: '',
      funcionario: {id: '', nombre: ''},
      dependencia: {id: '', nombreCodigo: ''},
      grupoSeguridad: this.grupoSeguridadSelected,
      radicado: this.selectionFilterRadicado,
      state: 'new'
    }
    this.dataTable2 = [...this.dataTable2, newElement];
    this.idRow2 += 1;

    const newPage = Math.trunc(this.dataTable2.length/this.nRowsTable2) * this.nRowsTable2;
    this.pageTable2 = newPage;
  }

  onClickEliminar2() {
    if (this.selectionTable2 && this.selectionTable2.state !== 'new') {
      this.dataTable2.find(row => row === this.selectionTable2).state = this.selectionTable2.state === 'delete' ? 'edit' : 'delete';
      this.editedTable2();
    } 
    else if (this.selectionTable2 && this.selectionTable2.state === 'new') {
      let index = this.dataTable2.indexOf(this.selectionTable2);
      this.dataTable2 = this.dataTable2.filter((val, i) => i !== index);
      this.selectionTable2 = undefined;
    }
  }

  onClickGuardar2() {
    if(!this.validarCamposVacios2()){
      return
    }
    else if(!this.validarCamposRepetidos2()){
      return
    }
    else{
      this.subscribePostRelacionGrupoSeguridadRadicado(this.buildJson2());
    }
  }

  onClicBorrarSelectedRadicadoFilter() {
    this.selectionFilterRadicado = undefined;
    this.dataTable2 = [];
    this.grupoAsociadoText = ''; 
  }

  onClickElminiarSelected2() {
    this.selectionTable2 = undefined;
  }

  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarCamposVacios1(): any{

    for (var _i = 0; _i < this.dataTable1.length;_i++){

      if (!this.dataTable1[_i].descripcion && this.dataTable1[_i].editable){
        const error = this.translate.instant('CUMCO017.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO017.TABLA1.headerTabla0') });
        this.showMessage(error, "error");
        return false;
      }
      else if(!this.dataTable1[_i].clasificacionInformacion.id && this.dataTable1[_i].editable){
        const error = this.translate.instant('CUMCO017.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO017.TABLA1.headerTabla1') });
        this.showMessage(error, "error");
        return false;
      }
      
    }

    return true;

  }

  validarCamposRepetidos1(): any{

    for (var _i = 0; _i < this.dataTable1.length; _i++){
      for (var _k = _i+1; _k < this.dataTable1.length; _k++){
        if (this.dataTable1[_k].descripcion.trim() === this.dataTable1[_i].descripcion.trim() &&
          this.dataTable1[_k].clasificacionInformacion.id === this.dataTable1[_i].clasificacionInformacion.id){
          const error = this.translate.instant('CUMCO017.MENSAJES.campoCodigoClasificacionRepetido',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.dataTable1[_k].descripcion, nombre: this.dataTable1[_k].clasificacionInformacion.nombre });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }
    return true;

  }

  validarCamposVacios2(): any{

    for (var _i = 0; _i < this.dataTable2.length;_i++){

      if (!this.dataTable2[_i].dependencia.id){
        const error = this.translate.instant('CUMCO017.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO017.TABLA2.headerTabla0') });
        this.showMessage2(error, "error");
        return false;
      }
      else if(!this.dataTable2[_i].funcionario.id){
        const error = this.translate.instant('CUMCO017.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO017.TABLA2.headerTabla1') });
        this.showMessage2(error, "error");
        return false;
      }

    }

    return true;

  }

  validarCamposRepetidos2(): any{

    for (var _i = 0; _i < this.dataTable2.length; _i++){
      for (var _k = _i+1; _k < this.dataTable2.length; _k++){
        if (this.dataTable2[_k].dependencia.id === this.dataTable2[_i].dependencia.id &&
          this.dataTable2[_k].funcionario.id === this.dataTable2[_i].funcionario.id){
          const error = this.translate.instant('CUMCO017.MENSAJES.camposDependenciaFuncionarioRepetido',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                        dependencia: this.dataTable2[_k].dependencia.nombre, funcionario: this.dataTable2[_k].funcionario.nombre });
                      this.showMessage2(error, "error");
          return false;
        }
      }
    }
    return true;

  }

  // Metodos EDICION de Tablas -- Metodos EDICION de Tablass
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  editedTable1() {
    this.compareInitialData(this.dataTable1, this.initialDataTable1);
  }

  editedTable2() {
    this.compareInitialData(this.dataTable2, this.initialDataTable2);
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

  showMessage2(sum: string, sev: string) {
    this.msgs2 = [];
    this.msgs2.push({ severity: sev, summary: sum, detail: '' });

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


  buildJson1(): any{

    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "codigo",
        "type": "input",
        "required": "true"
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": "false"
      },
      {
        "name": "id_grupo",
        "type": "input",
        "required": "false"
      },
      {
        "name": "observacion",
        "type": "input",
        "required": "false"
      },
      {
        "name": "activo",
        "type": "input",
        "required": "true"
      },
      {
        "name": "editable",
        "type": "input",
        "required": "false"
      }
    ];
    let features = [];

    this.dataTable1.forEach(tipo => {
      features.push( {
        attributes: {
          "id": tipo.id,
          "codigo": this.generateCodigo(tipo.descripcion),
          "descripcion": tipo.descripcion,
          "id_grupo": tipo.clasificacionInformacion.id,
          "observacion": tipo.observacion,
          "activo": tipo.activo,
          "editable": tipo.editable
        },
        "state": tipo.state
      })

    })
    return {
      "grd_grupoSeguridad": JSON.stringify({
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
        "name": "radicado.id",
        "type": "input",
        "required": "true"
      },
      {
        "name": "grupoSeguridad.id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "dependencia.id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "funcionario.id",
        "type": "input",
        "required": "false"
      }
    ];
    let features = [];

    this.dataTable2.forEach(tipo => {
      features.push( {
        attributes: {
          "id": tipo.id,
          "radicado.id": tipo.radicado.id,
          "grupoSeguridad.id": tipo.grupoSeguridad.id,
          "dependencia.id": tipo.dependencia.id,
          "funcionario.id": tipo.funcionario.id
        },
      "state": tipo.state
      })

    })
    return {
      "grd_RelacionGrupoSeguridadRadicado": JSON.stringify({
        fields,
        features
      })
    };


  }

  // Metodos para Generar CODIGOS de registros -- Metodos para Generar CODIGOS de registros
  // Metodos para Generar CODIGOS de registros  -- Metodos para Generar CODIGOS de registros  

  generateCodigo(stringName: string): string {
    var codigo: string;
    const upperCase = stringName.toLocaleUpperCase();
    var splitted = upperCase.split(" ");
    if (splitted.length >= 4){
      codigo = splitted[0] + splitted[1] + splitted[2] + splitted[3];
    }
    else if (splitted.length === 3){
      if (splitted[0].length >= 2){
        codigo = splitted[0].substr(0, 2) + splitted[1] + splitted[2];
      }
      else{
        codigo = splitted[0] + splitted[1] + splitted[2];
      }
    }
    else if (splitted.length === 2){
      if (splitted[0].length >= 2 && splitted[1].length >= 2){
        codigo = splitted[0].substr(0, 2) + splitted[1].substr(0, 2);
      }
      else if(splitted[0].length >= 3){
        codigo = splitted[0].substr(0, 3) + splitted[1];
      }
      else{
        codigo = splitted[0] + splitted[1];
      }
    }
    else{
      if (splitted[0].length >= 4){
        codigo = splitted[0].substr(0, 4);
      }
      else{
        codigo = splitted[0];
      }
    }
    return codigo;

  }

}
