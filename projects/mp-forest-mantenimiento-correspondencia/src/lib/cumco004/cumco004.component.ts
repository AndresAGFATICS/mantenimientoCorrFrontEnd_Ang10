import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CodigoDescripcionService } from './servicio/codigo-descripcion.service';
import { MessageService } from 'primeng/api';
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

  // Variables de texto
  varText: any = {"default": {
      "MENSAJES": {
        "eliminarFallido1": "El recorrido ",
        "eliminarFallido2": " no puede ser eliminado: Ya se encuentra creado, en caso de ya no estar vigente, por favor proceda a inactivarlo",
        "errorHoraInicio": "La hora final del recorrido no puede ser menor a la hora inicial, por favor validar",
        "errorGuardar": "Diligenciar todos los campos requeridos",
        "exitoGuardar": "Operación ejecutada con éxito",
        "falloGuardar": "Se ha presentado un error al guardar",
        "repetidos":"Existen registros repetidos para Tipo de Anexo y Anexo Físico",
        "repetidosAnexoTipo":"Existen Anexos Físicos repetidos para diferentes Tipos de Anexos"
      },
      "CALENDARIO": {
          "firstDayOfWeek": 1,
          "dayNames": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
          "dayNamesShort": ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
          "dayNamesMin": ["D", "L", "M", "X", "J", "V", "S"],
          "monthNames": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
          "monthNamesShort": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
          "today": "Hoy",
          "clear": "Borrar"
      },
      "GENERAL": {

      },
      "TABLAS": {
        "codigo": "Código",
        "descripcion": "Descripción",
        "activo": "Activo",
        "tipoDocumental": "Tipo Documental",
        "accion": "Acción",
        "codigoTipoPersona":"Código Tipo de Persona",
        "tipoPersona":"Tipo de Persona",
        "codigoTipoIdentificacion":"Código tipo de Identificación",
        "tipoIdentificacion":"Tipo de Identificación"
      },
      "BOTON": {
        "agregar": "Agregar",
        "eliminar": "Eliminar",
        "guardar": "Guardar"

      },

      "CUMCO001": {
        "titulo": "Asignar Responsable para Atención Directa de Tipo de Radicado",
        "filtroTipoRadicado": "Tipo de Radicado",
        "filtroTipoRadicadoPlaceHolder": "Ingrese aquí el tipo de radicado a filtrar",
        "filtroOrganismoDependencia": "Organismo o Dependencia",
        "filtroOrganismoDependenciaPlaceHolder": "Ingrese aquí el organismo o dependencia a filtrar",
        "headerTabla0": "",
        "headerTabla1": "Tipo de Radicado",
        "headerTabla2": "Subtipo de radicado",
        "headerTabla3": "Organismo o Dependencia",
        "headerTabla4": "CDC",
        "headerTabla5": "Responsable",
        "headerTabla6": "Funcionario Sumplente"
      },

      "CUMCO004": {
        "titulo": "Definir Acciones para los Tipos Documentales",
        "filtro": "Buscar Tipo Documental",
        "filtroPlaceHolder": "Ingrese aquí el tipo documental a filtrar.",
        "falloObtenerAcionesDocumentales" : "Error al obtener las Acciones Documentales"
      },
      "CUMCO005": {

      },
      "CUMCO009": {
        "titulo": "Filtros",
        "tituloPersona": "Tipo de Persona:",
        "placeholderFiltroTipoPersona": "Ingrese aquí el tipo de persona a filtrar",
        "tituloIdentificacion": "Tipo de identificación:",
        "placeholderFiltroIdentificacion": "Ingrese aquí el tipo de identificación a filtrar",
        "tablaPersona":"Configurar Tipos de Persona",
        "tablaTipoId":"Configurar firmantes por tipo de Comunicación",
        "textoTipoId":"Por favor seleccione los cargos de los funcionarios que pueden firmar el tipo de comunicación oficial seleccionada."
      },
      "CUMCO012": {
        "titulo": "Configurar Recorridos de Reparto de Documentos Físicos",
        "filtro": "Organismo a Configurar",
        "filtroPlaceHolder": "Ingrese aquí el organismo a configurar",
        "tituloTabla": "Recorridos de Reparto Documentos Físicos",
        "headerTabla1": "Nombre Recorrido",
        "headerTabla2": "Hora Inicio",
        "headerTabla3": "Hora Fin",
        "headerTabla4": "Activo"
      },
      "CUMCO016": {
          "titulo": "Configurar Ejes Temáticos",
          "placeHolder": "Buscar por",
          "tituloVincular": "Vincular Ejes Temáticos con Organismos o Dependencias",
          "organismos": "Organismos o Dependecias",
          "ejes": "Ejes Temáticos",
          "ejesOrganismo": "Ejes Temáticos del Organismo o Dependecia",
          "placeHolderEjes": "Buscar por Ejes"
      }

  }};

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
    private messageService: MessageService
  ) 
  
  {
    this.cols = [
      { field: 'tipo_documental', header: this.varText.default.TABLAS.tipoDocumental },
      { field: 'accion.accion', header: this.varText.default.TABLAS.accion }
    ];
    this.textAutocompleteTipoDocumental = '';
    this.suggestionTextAutocompleteTipoDocumental = [];
    this.listaSugerencias = [];
  }

  ngOnInit() {
    this.subscribeDependenciaTabla();
    this.subscribeAccionDocumental();
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
        const error = this.varText.default.MENSAJES.falloGuardar;
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.varText.default.MENSAJES.exitoGuardar;
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
        const error = this.varText.default.CUMCO004.falloObtenerAcionesDocumentales;
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
