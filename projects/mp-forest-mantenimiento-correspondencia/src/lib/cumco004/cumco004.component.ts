import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CodigoDescripcionService } from './servicio/codigo-descripcion.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
// import * as confJson from '../../assets/i18n/es.json';

//const confJson = require('../../assets/i18n/es.json');
//const confJson = 'nada';


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



  // Array que contiene las filas de la tabla
  rows: Row[];

  // Headers de la tabla
  cols: any[];

  selectedRows: Row[];

  // Variables de los autocompletables
  textAutocompleteTipoDocumental: any;

  suggestionTextAutocompleteTipoDocumental: string[];

  // respuesta Post Guardar

  responseGuardar: any[];

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
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribeDependenciaTabla();
    this.subscribeAccionDocumental();
  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'tipo_documental', header: this.translate.instant('CUMCO004.TABLA1.headerTabla1') },
        { field: 'accion.accion', header: this.translate.instant('CUMCO004.TABLA1.headerTabla2') }
      ];
    });
  }

  onClickElminiarSelected(){
    this.selectedRows = undefined;
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
          //const index = this.rows.indexOf(selectedRow);
          this.suggestionTextAutocompleteTipoDocumental.push(data.codigoDescripcion);
        }
      });
  }

  subscribeDependenciaTabla() {
    this.codigoDescripcionService.getConfigurarAccionTipoDocumental().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.informacionTabla = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        this.updateTable(this.informacionTabla);
      });
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


        this.actualizarSugerencias(this.listaAcciones);

      });
  }

  actualizarSugerencias(acciones: any[]): any {
    this.listaSugerencias = [];
    acciones.forEach(accion => {
      this.listaSugerencias.push(accion.accion)
    })

  }


  updateTable(dataArray: any[]) {

    this.rows = [];
    dataArray.forEach(data => {
      this.rows.push({
        id: data.id,
        id_tipo_documental: data.tipoDocumental.id,
        tipo_documental: data.tipoDocumental.descripcion,
        accion: {
          id: data.accionDocumental ? data.accionDocumental.id : '',
          accion: data.accionDocumental ? data.accionDocumental.accion : ''
        },
        state: 'noedit'
      });
    })
  }

  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
  }


  search(event) {
    this.subscribeDependenciaLista(event.query, '1');
  }

  edited(rowIndex) {
    this.rows[rowIndex].state = 'edit';
  }


  onClicBorrarAutoComplete() {
    this.textAutocompleteTipoDocumental = [];
  }


  onGuardarColumna() {
    this.subcribeRecorridoRepartoFisico(this.buildJson());
  }

  buildJson(): any {
    let features = []
    this.rows.forEach(row => {
      // 'accionDocumental.id': row.accion.id
      let ans = {
        attributes: {
          'id': row.id,
          'tipo_documental.id': row.id_tipo_documental,
        },
        'state': row.state
      }

      if (row.accion.id !== '') {
        let tempAns = {
          ...ans,
          'attributes': {
            ...ans.attributes,
            "accionDocumental.id": row.accion.id
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
export interface Row {
  id;
  id_tipo_documental;
  tipo_documental;
  accion;
  state;
}
