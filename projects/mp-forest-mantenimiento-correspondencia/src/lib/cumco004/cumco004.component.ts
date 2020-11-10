import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CodigoDescripcionService } from './servicio/codigo-descripcion.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-cumco004',
  templateUrl: './cumco004.component.html',
  styleUrls: ['./cumco004.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO004Component implements OnInit {

  codigoDescripcionList: any[];
  informacionTabla: any[];
  listaAcciones: any[];
  listaSugerencias: string[];

  suggestionsAcciones: any[];

  dataFilter: any[];


  // Array que contiene las filas de la tabla
  rows: any[];
  initiaLState = true;
  nRowsOptions = [1,5,10,15,20,25,50];
  nRows = 15;
  rowInd = 0;
  pageTable1 = 0;
  loading: boolean;

  // Headers de la tabla
  cols: any[];
  selectedRows: any[]; 

  // Variables de los autocompletables
  textAutocompleteTipoDocumental: any;
  suggestionTextAutocompleteTipoDocumental: string[];

  // respuesta Post Guardar
  responseGuardar: any[];

   // Variables para los mensajes
   msgs: Message[] = [];

   page = 1;
   size = 250;

  constructor(private codigoDescripcionService: CodigoDescripcionService,
    private messageService: MessageService,
    private translate: TranslateService,
  )

  {
    this.textAutocompleteTipoDocumental = '';
    this.suggestionTextAutocompleteTipoDocumental = [];
    this.listaSugerencias = [];
  }

  ngOnInit() {
    this.rowInd = 0;
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribeDependenciaTabla('?activo=1&page=' + String(this.page) + '&size=' + String(this.size));
    this.subscribeAccionDocumental();
  }


  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
 
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'rowIndex', header: '' },
        { field: 'tipoDocumental.codigoDescripcion', header: this.translate.instant('CUMCO004.TABLA1.headerTabla1') },
        { field: 'accionDocumental.accion', header: this.translate.instant('CUMCO004.TABLA1.headerTabla2') }
      ];
    });
  }

  subscribeDependenciaLista(codigoDescripcion: string, activo: string) {
    this.codigoDescripcionService.getCodigoDescripcion(codigoDescripcion, activo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.codigoDescripcionList = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.suggestionTextAutocompleteTipoDocumental = [];
        for (const data of this.codigoDescripcionList) {
          this.suggestionTextAutocompleteTipoDocumental.push(data.codigoDescripcion);
        }
      });
  }

  subscribeDependenciaTabla(parameters) {
    if (this.page === 1) {
      this.rows = [];
      this.informacionTabla = [];
    }
    this.loading = true;
    let response: any[];
    this.codigoDescripcionService.getConfigurarAccionTipoDocumental(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        for (const data of response) {
          if (data.id !== undefined){
            if (data.accionDocumental === undefined){
              this.rows.push({ ...data, accionDocumental:{ id: '', accion: ''}, state: 'noedit'} );
            }
            else{
              this.rows.push({ ...data, state: 'noedit'} );
            }
          }
        }

        if (response.length >= this.size) {
          this.page = this.page + 1;
          //if (parameters === '') {
            this.subscribeDependenciaTabla('?activo=1&page=' + String(this.page) + '&size=' + String(this.size));
          //}
          //else {
          //  this.subcribeServiceEjeTematico(parameters + '&page=' + String(this.page) + '&size=' + String(this.size));
          //}
        } else {
            if (this.initiaLState){
              this.informacionTabla = [];
              for (const data of this.rows) {
                this.informacionTabla.push(JSON.parse(JSON.stringify(data)));
              }
              this.initiaLState = false;
            }
          this.page = 1;
          this.rows = [...this.rows];
          this.loading = false
          return;
        }




    })

  }
   

  subcribeRecorridoRepartoFisico(body: string) {
    this.codigoDescripcionService.postGuardarAccionTipoDocumental(body).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseGuardar = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO004.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.translate.instant('CUMCO004.MENSAJES.exito');
        this.initiaLState = true;
        this.subscribeDependenciaTabla('?activo=1&page=' + String(this.page) + '&size=' + String(this.size));
        this.showMessage(exito, "success");

      });
  }

  subscribeAccionDocumental() {
    this.codigoDescripcionService.getAccionDocumental().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaAcciones = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO004.MENSAJES.falloObtenerAcionesDocumentales');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        var listaAcciones2 : any[];
        listaAcciones2 = [];

        for(var accion of this.listaAcciones){
          if(accion.codigo == 'REA' ||
             accion.codigo == 'SUS' ||
             accion.codigo == 'FIN' ||
             accion.codigo == 'TRA'){

              listaAcciones2.push(accion);

             }
        }
        this.listaAcciones = listaAcciones2;

      });
  }

  subscribeGetTiopoDocumental(getParameters = '') {
    this.codigoDescripcionService.getTipoDocumental(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.codigoDescripcionList = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO004.MENSAJES.falloObtenerAcionesDocumentales');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
      });
  }

  
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  search(event) {
    //this.subscribeDependenciaLista(event.query, '1'); 

    this.subscribeGetTiopoDocumental('?activo=1&codigoDescripcion=' + event.query);

  }

  searchAction(event) {
    this.selectedRows = undefined;
    //this.subscribeAccionDocumental();

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listaAcciones.length; i++) {
      let data = this.listaAcciones[i];
      if ( data.accion.toLowerCase().search(query.toLowerCase()) !== -1 ) {
        filtered.push(data);
      }
    }

    this.suggestionsAcciones = filtered;
  }

  focusOutCargoFilter(rowIndex){
    if(this.textAutocompleteTipoDocumental){
      if (this.textAutocompleteTipoDocumental.id === undefined || this.textAutocompleteTipoDocumental.id === ''){
        this.textAutocompleteTipoDocumental = undefined;
      }
    }
    else if (this.textAutocompleteTipoDocumental === ''){
      this.textAutocompleteTipoDocumental = undefined;
    }
  }
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables


  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClickElminiarSelected(){
    this.selectedRows = undefined;
  }

  onClicBorrarAutoComplete() {
    this.textAutocompleteTipoDocumental = [];
  }

  onGuardarColumna() {
    this.subcribeRecorridoRepartoFisico(this.buildJson());
  }

  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutTablaAccion(rowIndex: any){
  if(this.rows[rowIndex].accionDocumental){
    if (this.rows[rowIndex].accionDocumental.id === undefined || this.rows[rowIndex].accionDocumental.id === ''){
      this.rows[rowIndex].accionDocumental = {id: '', codigoDescripcion: ''};
    }
  }
  else if (this.rows[rowIndex].accionDocumental === ''){
    this.rows[rowIndex].accionDocumental = {id: '', codigoDescripcion: ''};
  }
  this.edited(0);
}


  // Metodos EDICION de Tablas -- Metodos EDICION de Tablass
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  edited(rowIndex) {
    //this.rows[rowIndex].state = 'edit';
    this.compareInitialData(this.rows, this.informacionTabla);
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

  buildJson(): any {
    let features = []
    this.rows.forEach(row => {
      if (row.state === 'edit' || row.state === 'new' || row.state === 'delete' ) {

      let ans = {
        attributes: {
          'id': row.id,
          'tipo_documental.id': row.tipoDocumental.id,
        },
        'state': row.state
      }

      if (row.accionDocumental.id !== '') {
        let tempAns = {
          ...ans,
          'attributes': {
            ...ans.attributes,
            "accionDocumental.id": row.accionDocumental.id
          }
        };
        ans = tempAns;
      }else{
        let tempAns = {
          ...ans,
          'attributes': {
            ...ans.attributes,
            "accionDocumental.id": ''
          }
        };
        ans = tempAns;
      }

      features.push(ans);
    }

    })

    return {
      "grd_tipos_doc": JSON.stringify({
        features
      })
    };
  }

  

}
