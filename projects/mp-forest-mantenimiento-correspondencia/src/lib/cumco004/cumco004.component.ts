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


  // Array que contiene las filas de la tabla
  rows: any[];
  initiaLState = true;
  nRowsOptions = [1,5,10,15,20,25,50];
  nRows = 15;
  rowInd = 0;

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
    this.subscribeDependenciaTabla();
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

  subscribeDependenciaTabla() {
    let response: any[];
    
    this.codigoDescripcionService.getConfigurarAccionTipoDocumental().subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.rows = [];
        this.rowInd = 0;
        for (const data of response) {
          //if (data.id){
            
            data.diIdex = this.rowInd;
            this.rowInd= this.rowInd+1;
            if (!data.accionDocumental){
              data.accionDocumental = {id: '', accion: ''};
            }
            this.rows.push({ ...data, state: 'noedit'} );
          //}
        }

        if (this.initiaLState){
          this.informacionTabla = [];
          for (const data of this.rows) {
            this.informacionTabla.push(JSON.parse(JSON.stringify(data)));
          }
          this.initiaLState = false;
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
        this.subscribeDependenciaTabla();
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
          if(accion.accion == 'Reactivar Términos Trámite' ||
             accion.accion == 'Suspender Términos Trámite' ||
             accion.accion == 'Finalizar Trámite' ||
             accion.accion == 'Trasladar'){

              listaAcciones2.push(accion);

             }
        }
        this.listaAcciones = listaAcciones2;
        console.log(this.listaAcciones)


      });
  }

  
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  search(event) {
    this.subscribeDependenciaLista(event.query, '1'); 
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
      // 'accionDocumental.id': row.accion.id
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

    })

    return {
      "grd_tipos_doc": JSON.stringify({
        features
      })
    };
  }

  

}
