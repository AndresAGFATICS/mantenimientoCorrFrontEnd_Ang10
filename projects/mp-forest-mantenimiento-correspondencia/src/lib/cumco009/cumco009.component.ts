import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cumco009Service } from './servicio/cumco009.service';
// import * as confJson from '../../assets/i18n/es.json';

@Component({
  selector: 'app-cumco009',
  templateUrl: './cumco009.component.html',
  styleUrls: ['./cumco009.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO009Component implements OnInit {

  tablaPersonas: Persona[];
  tablaIdentificacion: any[];
  seleccionPersona: any;

  rows: Row[] = [];
  seleccionConfiguracion: any;
  // varText: any = confJson;
  varText: any = { 
    "default": {
      "MENSAJES": {
        "eliminarFallido1": "El recorrido ",
        "eliminarFallido2": " no puede ser eliminado: Ya se encuentra creado, en caso de ya no estar vigente, por favor proceda a inactivarlo",
        "errorHoraInicio": "La hora final del recorrido no puede ser menor a la hora inicial, por favor validar",
        "errorGuardar": "Diligenciar todos los campos requeridos",
        "exitoGuardar": "Operación ejecutada con éxito",
        "falloGuardar": "Se ha presentado un error al guardar",
        "repetidos": "Existen registros repetidos para Tipo de Anexo y Anexo Físico",
        "repetidosAnexoTipo": "Existen Anexos Físicos repetidos para diferentes Tipos de Anexos",
        "identificacionRepetida": "El tipo de identificación, se encuentra repetido, por favor validar"
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
        "codigoTipoPersona": "Código Tipo de Persona",
        "tipoPersona": "Tipo de Persona",
        "codigoTipoIdentificacion": "Código tipo de Identificación",
        "tipoIdentificacion": "Tipo de Identificación",
        "motivoDevolucion": "Motivo de devolución"
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
        "tablaPersona": "Configurar Tipos de Persona",
        "tablaTipoId": "Configurar firmantes por tipos de Identificación",
        "textoTipoId": "Por favor seleccione los cargos de los funcionarios que pueden firmar el tipo de comunicación oficial seleccionada."
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

  tipoPersona: any[];
  filtroTipoPersona: any;
  tipoIdentificacion: any[];
  filtroTipoIdentificacion: any;
  responseGuardar: any;



  text: string;
  results: any[];
  columnasAdjuntos: any[];
  columnasAdjuntosComunicacion: any[];
  adjunto: any[];
  tablaPersonasFiltro: any[];
  tablaIdentificacionFiltro: any[];
  idRow: number;




  constructor(private cumco009Service: Cumco009Service,
    private messageService: MessageService) {
    this.columnasAdjuntos = [
      { field: 'id', header: '' },
      { field: 'codPer', header: this.varText.default.TABLAS.codigoTipoPersona },
      { field: 'tipPer', header: this.varText.default.TABLAS.tipoPersona },
      { field: 'des', header: this.varText.default.TABLAS.descripcion }
    ];
    this.columnasAdjuntosComunicacion = [
      { field: 'id', header: '' },
      { field: 'tipPer', header: this.varText.default.TABLAS.tipoPersona },
      { field: 'codId', header: this.varText.default.TABLAS.codigoTipoIdentificacion },
      { field: 'tipId', header: this.varText.default.TABLAS.tipoIdentificacion }
    ];
    this.idRow = 0;

    this.tablaPersonas = [];
    this.tablaIdentificacion = [];
  }

  ngOnInit() {
    this.subscribePersona();
    this.subscribeIdentficacion();
  }



  subscribePersona() {
    this.cumco009Service.getPersona().subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaPersonas = [];
        getRes.forEach(res => {
          this.tablaPersonas.push({
            id: res.id,
            nombreTipoPersona: res.nombreTipoPersona,
            descripcion: res.descripcion,
            idDescripcion: res.idDescripcion,
            codigo: res.codigo,
            codigoNombre: res.codigoNombre,
            state: 'noedit'
          });
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.showMessage(getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeIdentficacion() {
    this.cumco009Service.getIdentificacion().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaIdentificacion = [];
        getRes.forEach(res => {

          this.tablaIdentificacion.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.showMessage(getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeConfigurarPersona(clase: any, tipo: any) {
    this.cumco009Service.getConfigurarPersona(clase, tipo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.rows = [];
        getRes.forEach(res => {

          this.rows.push({
            idRow: '',
            id: res.id,
            descripcion: res.descripcion,
            editable: res.editable,
            tipoPersona: {
              id: res.tipoPersona.id,
              nombreTipoPersona: res.tipoPersona.nombreTipoPersona
            },
            state: 'noedit'
          });
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

      });
  }


  rowSelect() {
    if (this.seleccionPersona) {
      this.subscribeConfigurarPersona(this.seleccionPersona ? this.seleccionPersona.id : '', '');
    } else {
      this.rows = [];
    }

  }


  editedPerson(rowIndex) {
    this.tablaPersonas[rowIndex].state = 'edit';
  }

  editedIdentification(rowIndex, event) {
    let count = 0;
    this.tablaIdentificacion.forEach(row => {
      count = count + (row.descripcion.toLowerCase() === this.rows[rowIndex].descripcion.toLowerCase() ? 1 : 0);
    })
    if (count === 1) {
      this.rows[rowIndex].descripcion = '';
      const error = this.varText.default.MENSAJES.identificacionRepetida;
      this.showMessage(error, "error");
    }
    this.rows[rowIndex].state = this.rows[rowIndex].state === 'new' ? 'new' : 'edit';
  }
  seleccion() {
    console.log(this.filtroTipoPersona);
  }
  searchPersona(event) {

    event = event === undefined || event === '' ? '' : event;
    this.tablaPersonasFiltro = [];
    for (let i = 0; i < this.tablaPersonas.length; i++) {
      let persona = this.tablaPersonas[i];
      if (persona.idDescripcion.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.tablaPersonasFiltro.push(persona);
      }
    }
  }
  searchTipoIdentificacion(event) {
    event = event === undefined || event === '' ? '' : event;
    this.tablaIdentificacionFiltro = [];
    for (let i = 0; i < this.tablaIdentificacion.length; i++) {
      let persona = this.tablaIdentificacion[i];
      if (persona.idDescripcion.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.tablaIdentificacionFiltro.push(persona);
      }
    }
  }

  subcribeGuardarPersonas(body: string) {
    this.cumco009Service.postGuardarPersonas(body).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseGuardar = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.varText.default.MENSAJES.falloGuardar;
        this.showMessage(error + ' ' + getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.varText.default.MENSAJES.exitoGuardar;

        if (!this.responseGuardar.status) {
          this.showMessage(this.responseGuardar.message, "error");
        }
        else {
          this.showMessage(this.responseGuardar.message, "success");
          this.showMessage(exito, "success");
          this.subscribePersona();
          this.subscribeIdentficacion();
        }
      });
  }

  subcribeGuardarIdentificacion(body: string) {
    this.cumco009Service.postGuardarIdentificacion(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardar = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.varText.default.MENSAJES.falloGuardar;
        this.showMessage(error + ' ' + getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.varText.default.MENSAJES.exitoGuardar;
        if (!this.responseGuardar.status) {
          this.showMessage(this.responseGuardar.message, "error");
        }
        else {
          this.showMessage(this.responseGuardar.message, "success");
          this.showMessage(exito, "success");
          this.subscribePersona();
          this.subscribeIdentficacion();
        }
      });
  }


  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
  }


  onClickBorrarAutoComplete() {
    this.text = '';
  }

  onClicBorrarAutoCompletePersona() {
    this.filtroTipoPersona = undefined;
  }

  onClicBorrarAutoCompleteIdentificacion() {
    this.filtroTipoIdentificacion = undefined;
  }

  onClicBorrarColumna() {

  }
  onClicAnadirColumna() {

  }
  onGuardarConfiguracion() {
    if (this.rows !== undefined && this.rows.length !== 0 && this.seleccionPersona !== undefined) {
      if (!this.validarCampos()) {
        const error = this.varText.default.MENSAJES.errorGuardar;
        this.showMessage(error, "error");
      } else {
        this.subcribeGuardarIdentificacion(this.buildJsonConfiguracion());
      }
    }

  }
  buildJsonConfiguracion(): any {
    let fields = [
      {
        "name": "tipoPersona.nombreTipoPersona",
        "type": "input",
        "required": false
      },
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoIdentificacion.id",
        "type": "input",
        "required": false
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": true
      },
      {
        "name": "tipoIdentificacion.idDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoPersona.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoPersona.id",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoPersona.idDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "editable",
        "type": "input",
        "required": false
      }
    ];
    let features = [];
    this.rows.forEach(row => {
      features.push({
        "attributes": {
          "tipoPersona.nombreTipoPersona": row.tipoPersona.nombreTipoPersona,
          "id": row.id,
          "tipoIdentificacion.id": "",
          "descripcion": row.descripcion,
          "tipoIdentificacion.idDescripcion": "",
          "tipoPersona.descripcion": "",
          "tipoPersona.id": row.tipoPersona.id,
          "tipoPersona.idDescripcion": "",
          "editable": row.state === 'new' ? row.editable.toString() : row.editable
        },
        "state": row.state
      })
    })

    return {
      "grd_tipos_identif": JSON.stringify({
        fields,
        features
      })
    };
  }
  onGuardarColumna() {
    this.subcribeGuardarPersonas(this.buildJson());
  }
  buildJson(): any {
    let fields = [
      {
        "name": "id",
        "type": "number",
        "required": false
      },
      {
        "name": "nombreTipoPersona",
        "type": "input",
        "required": true
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "idDescripcion",
        "type": "input",
        "required": false
      }
    ];
    let features = [];
    this.tablaPersonas.forEach(persona => {
      features.push({
        "attributes": {
          "id": persona.id,
          "nombreTipoPersona": persona.nombreTipoPersona,
          "descripcion": persona.descripcion,
          "idDescripcion": persona.idDescripcion
        },
        "state": persona.state
      })
    })
    return {
      "grd_tipos_persona": JSON.stringify({
        fields,
        features
      })
    };
  }
  validarCampos(): boolean {
    let validation = true;
    this.rows.forEach(row => {
      if (row.descripcion === '') {
        validation = false;
      }
    })
    return validation;
  }

  agregarClick() {
    if (this.rows !== undefined && this.rows.length !== 0 && this.seleccionPersona !== undefined) {
      this.rows.push({
        idRow: this.idRow,
        id: '',
        descripcion: '',
        editable: 1,
        tipoPersona: {
          id: this.seleccionPersona.id,
          nombreTipoPersona: this.seleccionPersona.nombreTipoPersona
        },
        state: 'new'
      });
      this.idRow += 1;
    }
  }

  eliminarClick() {
    if (this.seleccionConfiguracion && this.seleccionConfiguracion.state !== 'new') {
      this.rows.find(row => row === this.seleccionConfiguracion).state = this.seleccionConfiguracion.state === 'delete' ? 'edit' : 'delete';
    } else if (this.seleccionConfiguracion && this.seleccionConfiguracion.state === 'new') {
      let index = this.rows.indexOf(this.seleccionConfiguracion);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.seleccionConfiguracion = '';
    }
  }

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
}

export interface Row {
  idRow: any;
  id: any;
  descripcion: string;
  editable: number;
  tipoPersona: {
    id: number;
    nombreTipoPersona: string;
  }
  state: string;
}

export interface Persona {
  id: number;
  nombreTipoPersona: string;
  descripcion: string;
  idDescripcion: string;
  codigo: string;
  codigoNombre: string;
  state: string;

}
