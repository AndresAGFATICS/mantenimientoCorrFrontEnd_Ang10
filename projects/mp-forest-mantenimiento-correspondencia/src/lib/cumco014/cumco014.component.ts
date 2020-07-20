import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Cumco014Service } from './servicio/cumco014.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
//import * as confJson from '../../assets/i18n/es.json';

@Component({
  selector: 'app-cumco014',
  templateUrl: './cumco014.component.html',
  styleUrls: ['./cumco014.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO014Component implements OnInit {
  respuestaGuardarRadicado: any;
  responseGetSubcribe: any[];


  constructor(private cumco014Service: Cumco014Service,
    private messageService: MessageService,
    private translate: TranslateService) {

    this.idRow = 0;
    this.suggestionsAutoCompleteSubTipoRadicado = [];
  }


  cols: any[];
  seleccionRadicado: any;
  listaRadicado: any[];

  cols2: any[];
  seleccionSubRadicado: any;
  listaSubRadicado: any[];

  seleccionCategoria: any;
  listadoCategoria: any[];

  tablaTipoRadicado: Radicado[];
  seleccionTablaRadicado: any;
  idRow: number;

  suggestionsAutoCompleteSubTipoRadicado: any[];
  tableTextAutoCompleteTramite: string;
  suggestionsAutoCompleteTramite: any[];


  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribeRadicado('');
    this.subscribeTablaRadicado('');
  }
  subcribeSetColumns() {

    this.translate.get(['']).subscribe(translations => {
    this.cols = [
      { field: 'id', header: this.translate.instant('CUMCO014.TABLA1.headerTabla0') },
      { field: 'codigo', header: this.translate.instant('CUMCO014.TABLA1.headerTabla1') },
      { field: 'nombre', header: this.translate.instant('CUMCO014.TABLA1.headerTabla2') },
      { field: 'clase_documental', header: this.translate.instant('CUMCO014.TABLA1.headerTabla3') },
      { field: 'activo', header: this.translate.instant('CUMCO014.TABLA1.headerTabla4') }
    ];
    this.cols2 = [
      { field: 'id', header: this.translate.instant('CUMCO014.TABLA2.headerTabla1') },
      { field: 'codigo', header: this.translate.instant('CUMCO014.TABLA2.headerTabla2') },
      { field: 'nombre', header: this.translate.instant('CUMCO014.TABLA2.headerTabla3') },
      { field: 'clase_documental', header: this.translate.instant('CUMCO014.TABLA2.headerTabla4') },
      { field: 'item_4', header: this.translate.instant('CUMCO014.TABLA2.headerTabla5') },
      { field: 'item_5', header: this.translate.instant('CUMCO014.TABLA2.headerTabla6') },
      { field: 'item_6', header: this.translate.instant('CUMCO014.TABLA2.headerTabla7') },
      { field: 'item_7', header: this.translate.instant('CUMCO014.TABLA2.headerTabla8') },
      { field: 'item_8', header: this.translate.instant('CUMCO014.TABLA2.headerTabla9') },
      { field: 'item_9', header: this.translate.instant('CUMCO014.TABLA2.headerTabla10') },
      { field: 'item_10', header: this.translate.instant('CUMCO014.TABLA2.headerTabla11') },
      { field: 'item_11', header: this.translate.instant('CUMCO014.TABLA2.headerTabla12') }
    ];


      this.cols = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO001.TABLA1.headerTabla0') },
        { field: 'tipoRadicado.codigoDescripcion', header: this.translate.instant('CUMCO001.TABLA1.headerTabla1') },
        { field: 'tramiteTipoRadicado.codigoDescripcion', header: this.translate.instant('CUMCO001.TABLA1.headerTabla2') },
        { field: 'dependencia.nombreCodigo', header: this.translate.instant('CUMCO001.TABLA1.headerTabla3') },
        { field: 'atiendeDependencia', header: this.translate.instant('CUMCO001.TABLA1.headerTabla4') },
        { field: 'atiendeResponsable', header: this.translate.instant('CUMCO001.TABLA1.headerTabla5') },
        { field: 'funcionario.codigoNombre', header:  this.translate.instant('CUMCO001.TABLA1.headerTabla6') }
      ];
    });

  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subscribeRadicado(codigo: any) {
    this.cumco014Service.getTipoRadicado(codigo).subscribe(

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

  subscribeCategoria(codigo: any) {
    this.cumco014Service.getTipoRadicado(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listadoCategoria = [];
        getRes.forEach(res => {
          this.listadoCategoria.push(res);
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

  subscribeTablaRadicado(codigo: any) {
    this.cumco014Service.getTablaTipoRadicado(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaTipoRadicado = [];
        getRes.forEach(res => {

          this.tablaTipoRadicado.push({
              idRow: '',
              id: res.id,
              codigo: res.codigo,
              descripcion: res.descripcion,
              codigoDescripcion: res.codigoDescripcion,
              codigoDescripcionGuion: res.codigoDescripcionGuion,
              categoria: {
                id: res.categoria.id,
                codigo: res.categoria.codigo,
                descripcion: res.categoria.descripcion,
                codigoDescripcion: res.categoria.codigoDescripcion,
                codigoDescripcionGuion: res.categoria.codigoDescripcionGuion,
                requisitos: res.categoria.requisitos,
                editable: res.categoria.editable,
                activo: res.categoria.activo
              },
              activo: res.activo,
              state: 'noedit'
          });
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
    this.cumco014Service.postGuardarRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarRadicado = getRes;
        this.showMessage(getRes.message, "error");
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        this.showMessage(this.respuestaGuardarRadicado.message, "success");
        this.actualizarTablaRadicado();
      });
  }

  subscribeSubRadicado(parameters: any) {
    this.cumco014Service.getSubTipoRadicado(parameters).subscribe( //?idTipo=81&codigoTramiteDescripcion=&activo=1

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaSubRadicado = [];
        getRes.forEach(res => {

          this.listaSubRadicado.push(res);
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

  // SUSCRIBIRSE a '/documentos/1.0.0/tipoRadicadoTramite' (Tabla)
  subcribeServiceSubTipoRadicado(getParameters: string) {
    this.cumco014Service.getSubTipoRadicado(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseGetSubcribe = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          console.log('GET call in subcribeServiceSubTipoRadicado: ', getError);
          this.messageService.add({key: 'topMessage', severity:'error', summary: 'Error al obtener Subtipos de Radicados', detail: getError.error.message});
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteSubTipoRadicado = [];
        for (const data of this.responseGetSubcribe) {
          this.suggestionsAutoCompleteSubTipoRadicado.push(data.codigoDescripcion);
        }
        console.log(this.suggestionsAutoCompleteSubTipoRadicado);
    });
  }


  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchRadicado(event) {
    this.subscribeRadicado(event.query ? event.query : '');
  }

  searchSubRadicado(event, seleccionTablaRadicado) {
    this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchCategoria(event) {
    this.subscribeCategoria(event.query ? event.query : '')
  }

  searchFilterTramite(event) {
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  onSelectSubtipoRadicado(){

  }

  onSelectTramite(rowData: any, rowIndex : any){

  }


  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClicBorrarAutoCompleteRadicado() {
    this.seleccionRadicado = undefined;
    this.actualizarTablaRadicado();
  }

  onClicBorrarAutoCompleteSubRadicado() {
    this.seleccionSubRadicado = undefined;
  }

  onClicAgregarRadicado() {
    let element = {
      idRow: this.idRow,
      id: '',
      codigo: '',
      descripcion: '',
      codigoDescripcion: '',
      codigoDescripcionGuion: '',
      categoria: {
        id: '',
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        codigoDescripcionGuion: '',
        requisitos: 0,
        editable: 1,
        activo: 1
      },
      activo: 1,
      state: 'new'
    }
    this.tablaTipoRadicado = [...this.tablaTipoRadicado, element];
    this.idRow += 1;
  }

  onClicAgregarSubRadicado() {

  }

  onClicEliminarRadicado() {
    if (this.seleccionTablaRadicado && this.seleccionTablaRadicado.state !== 'new') {
      this.tablaTipoRadicado.find(row => row === this.seleccionTablaRadicado).state = this.seleccionTablaRadicado.state === 'delete' ? 'edit' : 'delete';
    } else if (this.seleccionTablaRadicado && this.seleccionTablaRadicado.state === 'new') {
      let index = this.tablaTipoRadicado.indexOf(this.seleccionTablaRadicado);
      this.tablaTipoRadicado = this.tablaTipoRadicado.filter((val, i) => i !== index);
      this.seleccionTablaRadicado = undefined;
    }
  }

  onClicEliminarSubRadicado() {

  }

  onClicGuardarRadicado() {
     if (!this.camposValidosRadicado()) {
       const error = this.translate.instant('CUMCO014.MENSAJES.errorGuardar');
       this.showMessage(error, "error");
    } else if (!this.validarRepetidosRadicado()) {
      const error = this.translate.instant('CUMCO014.MENSAJES.repetidos');
      this.showMessage(error, "error");
    } else {
      this.subcribeRecorridoRepartoFisico(this.buildJsonRadicado());
     }
  }

  onClicGuardarSubRadicado() {

  }

  // Metodos Para VALIDACIONES -- Metodos Para VALIDACIONES
  // Metodos Para VALIDACIONES -- Metodos Para VALIDACIONES

  camposValidosRadicado(): any {
    let valido = true;
    this.tablaTipoRadicado.forEach(row => {
      valido = valido && (row.descripcion === '' ? false : true
        && row.categoria.codigoDescripcion === '' ? false : true);
    })
    return valido;
  }

  validarRepetidosRadicado(): any {
    let couples: string[] = [];
    let counter = {};
    var result = [];
    this.tablaTipoRadicado.forEach(row => {
      couples.push(row.descripcion);
    })

    couples.forEach(function(couple) {
      if (!counter[couple]) {
        counter[couple] = 0;
      }
      counter[couple] += 1;
    })

    for (var prop in counter) {
      if (counter[prop] >= 2) {
        result.push(prop);
      }
    }
    return result.length === 0 ? true : false;

  }

  // Metodos Para Actualizar Tablas -- Metodos Para Actualizar Tablas
  // Metodos Para Actualizar Tablas -- Metodos Para Actualizar Tablas

  actualizarTablaRadicado() {
    this.subscribeTablaRadicado(this.seleccionRadicado?this.seleccionRadicado.codigoDescripcion:'');
  }


  // Otros -- Otros
  // Otros -- Otros

  buildJsonRadicado() {
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
        "name": "codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.requisitos",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.editable",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.id",
        "type": "listbox",
        "required": false
      },
      {
        "name": "categoria.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "activo",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "ventanilla.entrada",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "cof",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "ventanilla.virtual",
        "type": "checkbox",
        "required": false
      }
    ];
    let features = [];
    this.tablaTipoRadicado.forEach(tipo => {
      features.push( {
        attributes: {
         "id": tipo.id,
         "codigo": tipo.codigo,
         "descripcion": tipo.descripcion,
         "codigoDescripcion": tipo.codigoDescripcion,
         "categoria.descripcion": tipo.categoria.descripcion,
         "categoria.codigo": tipo.categoria.codigo,
         "categoria.requisitos": tipo.categoria.requisitos,
         "categoria.editable": tipo.categoria.editable,
         "categoria.codigoDescripcion": tipo.categoria.codigoDescripcion,
         "categoria.id": tipo.categoria.id,
         "categoria.activo": tipo.categoria.activo,
         "activo": tipo.activo,
         "ventanilla.entrada": false,
         "cof": false,
         "ventanilla.virtual": false
       },
       "state": tipo.state
      })

    })
    return {
      "grd_tipoRadicado": JSON.stringify({
        fields,
        features
      })
    };
  }

  onRowSelect(event, selected){
    this.subscribeSubRadicado('?idTipo=' + selected.id + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
  }

  editedRadicado(rowIndex) {
    this.tablaTipoRadicado[rowIndex].state =  this.tablaTipoRadicado[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  edited(event){

  }


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

}

export interface Radicado {
  idRow: any;
  id: any;
  codigo: string;
  descripcion: string;
  codigoDescripcion: string;
  codigoDescripcionGuion: string;
  categoria: {
    id: any;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    codigoDescripcionGuion: string;
    requisitos: number;
    editable: number;
    activo: number
  };
  activo: number;
  state: string;

}
