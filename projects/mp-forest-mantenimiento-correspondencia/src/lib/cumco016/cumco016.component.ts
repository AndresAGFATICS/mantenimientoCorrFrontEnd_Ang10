import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
//import * as confJson from '../../assets/i18n/es.json';
import {TreeNode} from 'primeng/api';
import { EjeTematicoService } from './servicio/eje-tematico.service';

@Component({
  selector: 'app-cumco016',
  templateUrl: './cumco016.component.html',
  styleUrls: ['./cumco016.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Cumco016Component implements OnInit {

  // Variables de texto
  //varText:any = confJson;

  varText: any = {
    "default": {
        "MENSAJES": {
          "eliminarFallido1": "El recorrido ",
          "eliminarFallido2": " no puede ser eliminado: Ya se encuentra creado, en caso de ya no estar vigente, por favor proceda a inactivarlo",
          "errorHoraInicio": "La hora final del recorrido no puede ser menor a la hora inicial, por favor validar",
          "errorGuardar": "Diligenciar todos los campos requeridos",
          "exitoGuardar": "Operación ejecutada con éxito",
          "falloGuardar": "Se ha presentado un error al guardar",
          "repetidos":"Existen registros repetidos para Tipo de Anexo y Anexo Físico",
          "repetidosAnexoTipo":"Existen Anexos Físicos repetidos para diferentes Tipos de Anexos",
          "identificacionRepetida":"El tipo de identificación, se encuentra repetido, por favor validar"
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
          "tipoIdentificacion":"Tipo de Identificación",
          "motivoDevolucion":"Motivo de devolución"
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
          "filtroPlaceHolder": "Ingrese aquí el tipo documental a filtrar."
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
        "CUMCO010": {
          "titulo": "Filtro",
          "tituloDevolucion": "Motivo de devolución:",
          "filtroDevolucion": "Ingrese aquí el motivo de la devolución",
          "tituloTabla": "Configurar Motivos de devolución"
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

    }


  }

  // Variables de los srevicios
  confEjeTematico: any[];
  dependenciaLista: any[];
  ejetematicoDependenciaLista: any [];

  rowIndex = 0;

  rows: Row[];

  cols: any[];

  selectedRows: Row[] = [];

  files: TreeNode[] = [];

  sourceRows: Row[] = [];

  targetRows: Row[] = [];

  selectedFile: TreeNode;

  constructor(private ejeTematicoService: EjeTematicoService) {
    this.rows = [];

    this.cols = [
      { field: 'codigo', header: this.varText.default.TABLAS.codigo },
      { field: 'descripcion', header: this.varText.default.TABLAS.descripcion },
      { field: 'activo', header: this.varText.default.TABLAS.activo }
    ];

}



  ngOnInit() {
    this.subcribeServiceEjeTematico('','');
    this.subscribeDependenciaLista('','');
  }

  subscribeEjeTematicoDependencia(idDependencia:string) {
    this.ejeTematicoService.getEjeTematicoDependencia(idDependencia).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.ejetematicoDependenciaLista = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.updateEjeTematicoDependencia(this.ejetematicoDependenciaLista);
      });
  }

  updateEjeTematicoDependencia(ejetematicoDependencia: any[]): any {
      this.targetRows = [];
    ejetematicoDependencia.forEach(data => {
      this.targetRows.push({
        id: data.id,
        codigo: '',
        descripcion: data.descripcion,
        activo: data.activo
      });
    })
  }

  subscribeDependenciaLista(descripcion: string, activo: string): any {
    this.ejeTematicoService.getDependenciaLista(descripcion, activo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dependenciaLista = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.updateDependencias(this.dependenciaLista);
      });
  }
  updateDependencias(dependenciaLista: any[]): any {
    dependenciaLista.forEach(dependencia => {
      if(dependencia.tipoDependencia.nombre !== 'CDC' && dependencia.tipoDependencia.codigo !=='CDC')
      {
        this.files.push({
          label: dependencia.nombre,
          data: dependencia.id,
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder'
        })
      }
    })

  }

  subcribeServiceEjeTematico(descripcion: string, activo: string): any {
    this.ejeTematicoService.getEjeTematico(descripcion, activo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.confEjeTematico = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.updateTable(this.confEjeTematico);
      });
  }

  updateTable(dataArray: any[]) {

    this.rows = [];
    for (const data of dataArray) {
      //const index = this.rows.indexOf(selectedRow);
      this.rows.push({
        id: data.id,
        codigo: (dataArray.indexOf(data)+1001).toString().substring(1,4),
        descripcion: data.descripcion,
        activo: data.activo
      });
    }
  }

  onNodeSelect($event) {
    this.subscribeEjeTematicoDependencia(this.selectedFile.data);
  }

  onClicAgregar() {
    let rows = [...this.rows];

    rows.push({
                id: '',
                codigo: (this.rows.length + 1001).toString().substring(1,4),
                descripcion: '',
                activo: '1'})

    this.rows = rows;
    this.rowIndex = this.rowIndex + 1;
  }

  onClicEliminar() {
    let id;
    let rows = [];

    for (const selectedRow of this.selectedRows) {
      let index = this.rows.indexOf(selectedRow);
      this.rows = this.rows.filter((val, i) => i !== index);
    }
    this.updateCodTable();
    this.selectedRows = [];
  }
  updateCodTable(): any {
    this.rows.forEach(row => {
      row.codigo = (this.rows.indexOf(row)+1001).toString().substring(1,4);
    })
  }

}

export interface Row {
  id;
  codigo;
  descripcion;
  activo;
}
