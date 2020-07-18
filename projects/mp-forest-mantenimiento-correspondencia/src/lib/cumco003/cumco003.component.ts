import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

import { HostListener } from '@angular/core';

import { Cumco003Service } from './servicio/cumco003.service';

@Component({
  selector: 'app-cumco003',
  templateUrl: './cumco003.component.html',
  styleUrls: ['./cumco003.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco003Component implements OnInit {
  responseGuardarPlantilla: any;


  constructor(private cumco003Service: Cumco003Service,
    private messageService: MessageService) {
    this.rows = [];

    this.cols = [
      { field: 'ID', header: '' },
      { field: 'plantilla.codigo', header: this.varText.default.TABLAS.plantilla },
      { field: 'tipoRadicado.codigoDescripcion', header: this.varText.default.TABLAS.tipoRadicado },
      { field: 'tramiteTipoRadicado.descripcion', header: this.varText.default.TABLAS.subtipoRadicado },
      { field: 'tipoDocumental.codigoDescripcion', header: this.varText.default.TABLAS.tipoDocumental },
      { field: 'claseDocumental.codigoDescripcion', header: this.varText.default.TABLAS.claseDocumental },
      { field: 'terminoRequerimiento', header: this.varText.default.TABLAS.TerminoReq },
      { field: 'diasRequerimiento', header: this.varText.default.TABLAS.diasRequerimiento },
      { field: 'prorrogaEntidad', header: this.varText.default.TABLAS.prorrogaEntidad },
      { field: 'prorrogaPeticionario', header: this.varText.default.TABLAS.prorrogaPeticionario },
      { field: 'diasProrroga', header: this.varText.default.TABLAS.diasProrroga },
      { field: 'tipoComunicacion.codigoDescripcion', header: this.varText.default.TABLAS.tipoComunicacion },
    ];

    this.cols2 = [
      { field: 'codigo', header: this.varText.default.TABLAS.codigo },
      { field: 'descripcion', header: this.varText.default.TABLAS.nombre },
      { field: 'claseDocumental.descripcion', header: this.varText.default.TABLAS.claseDocumental }
    ];

    this.tablaDocumentos = [];
    this.idRow = 0;
  }
  varText: any = {
    "default":
    {
      "MENSAJES": {
        "eliminarFallido1": "El recorrido ",
        "eliminarFallido2": " no puede ser eliminado: Ya se encuentra creado, en caso de ya no estar vigente, por favor proceda a inactivarlo",
        "errorHoraInicio": "La hora final del recorrido no puede ser menor a la hora inicial, por favor validar",
        "errorGuardar": "Diligenciar todos los campos requeridos",
        "exitoGuardar": "Operación ejecutada con éxito",
        "falloGuardar": "Se ha presentado un error al guardar",
        "repetidos": "Existen registros repetidos para Tipo de Anexo y Anexo Físico",
        "repetidosAnexoTipo": "Existen Anexos Físicos repetidos para diferentes Tipos de Anexos",
        "identificacionRepetida": "El tipo de identificación, se encuentra repetido, por favor validar",
        "seleccioneTipoRadicado": "Por Favor Seleccione un tipo de radicado para la fila",
        "claseDocNoRequierePlantilla": "La clase documental Entrada no requiere una selección de plantilla, si continúa se borrará la plantilla seleccionada al inicio",
        "detalleClaseDocNoRequierePlantilla": "¿Desea continuar?",
        "repetidosPlantillaSubtipoTipo": "El registro con la plantilla, subtipo de radicado y tipo documental está repetido",
        "repetidosPlantillaSubtipoClase": "Para el registro con la plantilla, Subtipo de radicado, la clase documental no debe ser diferente.",
        "repetidosSubtipoClase": "El registro con el subtipo de radicado y tipo documental está repetido"
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
        "nombre": "Nombre",
        "descripcion": "Descripción",
        "activo": "Activo",
        "tipoDocumental": "Tipo Documental",
        "accion": "Acción",
        "codigoTipoPersona": "Código Tipo de Persona",
        "tipoPersona": "Tipo de Persona",
        "codigoTipoIdentificacion": "Código tipo de Identificación",
        "tipoIdentificacion": "Tipo de Identificación",
        "motivoDevolucion": "Motivo de devolución",
        "plantilla": "Plantilla",
        "tipoRadicado": "Tipo Radicado",
        "subtipoRadicado": "Subtipo Radicado",
        "claseDocumental": "Clase Documental",
        "TerminoReq": "Termino Requerimiento",
        "prorrogaEntidad": "Prórroga entidad",
        "prorrogaPeticionario": "Prórroga Peticionario",
        "diasProrroga": "Días Prórroga",
        "tipoComunicacion": "Tipo Comunicacion",
        "diasRequerimiento": "Días Requerimiento"
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
      "CUMCO003": {
        "pestana1": "Plantillas",
        "titulo1": "Configurar Plantillas",
        "tituloAutocompletarPlantilla": "Plantilla:",
        "placeHolderAutoCompletarPlantilla": "Ingresar aquí plantilla a filtrar",
        "tituloAutoCompletarTipoRadicado": "Tipo de Radicado:",
        "placeHolderAutoCompletarTipoRadicado": "Ingrese aquí el tipo de radicado a filtrar",
        "tituloAutoCompletarClaseDocumental": "Clase Documental:",
        "placeHolderAutoCompletarClaseDocumental": "Seleccione la clase documental",
        "pestana2": "Tipo Comunicación Ofcicial",

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
        "tablaTipoId": "Configurar firmantes por tipo de Comunicación",
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
  };


  //autocompletePlantilla
  seleccionPlantilla: any;
  listaPlantilla: any[];

  seleccionRadicado: any;
  listaRadicado: any[];

  listadoDocumento: any[];

  listaSubTipoRadicado: any[];

  seleccionClaseDocumental: any;
  listaClaseDocumental: any[];


  //TABLAS
  rows: Row[];
  tablaDocumentos: Documento[];
  selectedRowDocument: any;


  idRow: number;
  rowIndex = 0;
  rowIndexValidation: number;

  responseGuardarComunicacion: any;


  cols: any[];

  selectedRows: Row;

  cols2: any[];

  // Variables para los mensajes
  msgs: Message[] = [];




  ngOnInit() {
    this.subscribePlantilla('');
    this.subscribeRadicado('');
    this.subscribeDocumento('');
    this.subscribeClaseDocumental('');
    this.subscribeTablaDocumento();
    this.subscribeTablaPlantilla();
  }

  onClickElminiarSelected(){
    this.selectedRows = undefined;
  }

  onClickElminiarSelected2(){
    this.selectedRowDocument = undefined;
  }

  subscribePlantilla(codigo: any) {
    this.cumco003Service.getPlantilla(codigo).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        this.listaPlantilla = [];
        getRes.forEach(res => {
          this.listaPlantilla.push(res);
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

  subscribeRadicado(codigo: any) {
    this.cumco003Service.getTipoRadicado(codigo).subscribe(

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

  subscribeSubTipoRadicado(descripcion: any, idTipo: any) {
    this.cumco003Service.getSubTipoRadicado(descripcion, idTipo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaSubTipoRadicado = [];
        getRes.forEach(res => {

          this.listaSubTipoRadicado.push(res);
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

  subscribeDocumento(codigo: any) {
    this.cumco003Service.getDocumento(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listadoDocumento = [];
        getRes.forEach(res => {
          this.listadoDocumento.push(res);
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

  subscribeTablaDocumento() {
    this.cumco003Service.getTablaDocumento().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaDocumentos = [];
        getRes.forEach(res => {
          this.tablaDocumentos.push(res);
        })
        this.tablaDocumentos.forEach(documento => {
          documento.state = 'noedit'
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

  subscribeTablaPlantilla() {
    this.cumco003Service.getTablaPlantilla().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.rows = [];
        getRes.forEach(res => {
          res.tipoComunicacion = res.tipoComunicacion?res.tipoComunicacion:'';
          this.rows.push(res);
        })
        this.rows.forEach(documento => {
          documento.state = 'noedit'

        })
        let index = this.rows.indexOf(this.selectedRows);
        this.rows = this.rows.filter(val => val.plantilla !== undefined);

        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeClaseDocumental(codigo: any) {
    this.cumco003Service.getClaseDocumental(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaClaseDocumental = [];
        getRes.forEach(res => {
          this.listaClaseDocumental.push(res);
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
    this.cumco003Service.postComuniacion(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardarComunicacion = getRes;
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.varText.default.MENSAJES.falloGuardar;
        this.showMessage('error', 'Error ', error);
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        this.showMessage('success', 'Guardar ', this.responseGuardarComunicacion.message);
        this.subscribeTablaDocumento();
      });
  }

  subcribeGuardarPlantilla(body: any) {
    this.cumco003Service.postPlantilla(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardarPlantilla = getRes;
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.varText.default.MENSAJES.falloGuardar;
        this.showMessage('error', 'Guardar ', error);
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        this.showMessage('success', 'Guardar ', this.responseGuardarPlantilla.message);
        this.subscribeTablaPlantilla();
      });
  }

  searchPlantilla(event) {
    this.subscribePlantilla(event.query ? event.query : '');
  }

  searchRadicado(event) {
    this.subscribeRadicado(event.query ? event.query : '')
  }

  searchSubTipoRadicado(event, rowIndex) {
    if (this.rows[rowIndex].tipoRadicado.id || this.rows[rowIndex].tipoRadicado.id) {
      this.subscribeSubTipoRadicado(event.query ? event.query : '', this.rows[rowIndex].tipoRadicado.id)
    } else {
      const error = this.varText.default.MENSAJES.seleccioneTipoRadicado;
      this.showMessage('error', 'Error ', error);
    }

  }

  searchClaseDocumento(event) {
    this.subscribeClaseDocumental(event.query ? event.query : '')
  }

  searchDocumento(event) {
    this.subscribeDocumento(event.query ? event.query : '')
  }

  validacionEntrada(rowIndex) {
    this.rowIndexValidation = rowIndex;
    if (this.rows[rowIndex].claseDocumental.id === 1 && this.rows[rowIndex].plantilla.id !== '') {
      this.messageService.clear();
      this.messageService.add({
        key: 'c', sticky: true, severity: 'warn',
        summary: this.varText.default.MENSAJES.claseDocNoRequierePlantilla,
        detail: this.varText.default.MENSAJES.detalleClaseDocNoRequierePlantilla
      });
    }else{
      this.edited(rowIndex);
    }
  }
  onConfirm() {
    this.messageService.clear('c');
    this.rows[this.rowIndexValidation].plantilla.codigo = '';
    this.rows[this.rowIndexValidation].plantilla.id = '';
    this.edited(this.rowIndexValidation);
  }

  onReject() {
    this.messageService.clear('c');
    this.rows[this.rowIndexValidation].claseDocumental.codigo = '';
    this.rows[this.rowIndexValidation].claseDocumental.codigoDescripcion = '';
    this.rows[this.rowIndexValidation].claseDocumental.descripcion = '';
    this.rows[this.rowIndexValidation].claseDocumental.id = '';
    this.edited(this.rowIndexValidation);
    this.subscribeClaseDocumental('');
  }


  edited(rowIndex) {
    this.rows[rowIndex].state = this.rows[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  editedDocument(rowIndex) {
    this.tablaDocumentos[rowIndex].state = this.tablaDocumentos[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  onClicBorrarAutoCompletePlantilla() {
    this.seleccionPlantilla = undefined;
  }

  onClicBorrarAutoCompleteRadicado() {
    this.seleccionRadicado = undefined;
  }

  onClicBorrarAutoCompleteDocumento() {
    this.seleccionClaseDocumental = undefined;
  }

  onClicAgregar() {
    let element = {
      idRow: this.idRow,
      id: '',
      plantilla: {
        id: '',
        codigo: '',
      },
      tipoRadicado: {
        id: '',
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        activo: 1,
      },
      tramiteTipoRadicado: {
        id: '',
        descripcion: '',
        tipoRadicado: {
          id: '',
          codigo: '',
          descripcion: '',
          codigoDescripcion: '',
          activo: 1
        },
        modificarDiaTermino: 0,
        activo: 1,
        entrada: 0,
        cof: 0,
        webfile: 0,
        verbal: 0,
        anonimo: 0
      },
      tipoDocumental: {
        id: '',
        activo: 1,
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        codigoDescripcionGuion: ''
      },
      claseDocumental: {
        id: '',
        descripcion: '',
        codigo: '',
        codigoDescripcion: ''
      },
      tipoComunicacion: {
        id: '',
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        codigoDescripcionGuion: '',
        editable: 1,
        activo: 0
      },
      terminoRequerimiento: 0,
      prorrogaEntidad: 0,
      prorrogaPeticionario: 0,
      diasRequerimiento: 0,
      diasProrroga: 0,
      cantidad: 0,
      state: 'new'
    }
    this.rows = [...this.rows, element];
    this.idRow += 1;
  }

  onClicAgregarComunicacion() {
    let element = {
      idRow: this.idRow,
      id: '',
      codigo: String.fromCharCode(127),
      descripcion: '',
      codigoDescripcion: '',
      codigoDescripcionGuion: '',
      claseDocumental: {
        id: '',
        descripcion: '',
        codigo: ''
      },
      editable: 1,
      activo: 1,
      state: 'new'
    }
    this.tablaDocumentos = [...this.tablaDocumentos, element];
    this.idRow += 1;

  }

  onClicEliminarComunicacion() {
    if (this.tablaDocumentos && this.selectedRowDocument.state !== 'new') {
      this.tablaDocumentos.find(row => row === this.selectedRowDocument).state = this.selectedRowDocument.state === 'delete' ? 'edit' : 'delete';
    } else if (this.selectedRowDocument && this.selectedRowDocument.state === 'new') {
      let index = this.tablaDocumentos.indexOf(this.selectedRowDocument);
      this.tablaDocumentos = this.tablaDocumentos.filter((val, i) => i !== index);
      this.selectedRowDocument = '';
    }
  }

  onClicGuardarComuniacion() {
    if (!this.camposValidos()) {
      const error = this.varText.default.MENSAJES.errorGuardar;
      this.showMessage('error', 'Error ', error);
    } else if (!this.validarRepetidos()) {
      const error = this.varText.default.MENSAJES.repetidos;
      this.showMessage('error', 'Error ', error);
    } else {
      this.subcribeRecorridoRepartoFisico(this.buildJsonComunicacion());
    }
  }

  validarRepetidos(): any {
    let couples: string[] = [];
    let counter = {};
    var result = [];
    this.tablaDocumentos.forEach(row => {
      couples.push(row.codigo + row.claseDocumental.codigo);
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
  camposValidos(): any {
    let valido = true;
    this.tablaDocumentos.forEach(row => {
      valido = valido && (row.codigo === '' || row.codigo === String.fromCharCode(127) ? false : true
        && row.claseDocumental.descripcion === '' ? false : true
          && row.claseDocumental.descripcion === '' ? false : true);
    })
    return valido;
  }

  onClicGuardar() {
    if (!this.validarCamposPlantilla()) {
      const error = this.varText.default.MENSAJES.errorGuardar;
      this.showMessage('error', 'Error ', error);
    } else if (!this.validarRepetidosPlantillaSubtipoTipo()) {
      const error = this.varText.default.MENSAJES.repetidosPlantillaSubtipoTipo;
      this.showMessage('error', 'Error ', error);
    } else if (!this.validarRepetidosPlantillaSubtipoClase()) {
      const error = this.varText.default.MENSAJES.repetidosPlantillaSubtipoClase;
      this.showMessage('error', 'Error ', error);
    } else if (!this.validarRepetidosSubtipoClase()) {
      const error = this.varText.default.MENSAJES.repetidosSubtipoClase;
      this.showMessage('error', 'Error ', error);
    } else {
      this.subcribeGuardarPlantilla(this.buildJsonPlantilla());
    }
  }

  validarCamposPlantilla(): any {
    let valido = true;
    this.rows.forEach(row => {
      valido = valido && (row.tipoRadicado.id === '' ? false : true
        && row.tramiteTipoRadicado.id === '' ? false : true
          && row.tipoDocumental.id === '' ? false : true
            && row.claseDocumental.id === '' ? false : true
              && (row.claseDocumental.id !== 1 && row.plantilla.id === '') ? false : true);
    })
    return valido;
  }

  validarRepetidosPlantillaSubtipoTipo(): any {
    let couples: string[] = [];
    let counter = {};
    var result = [];
    this.rows.forEach(row => {
      couples.push(row.plantilla.id + row.tramiteTipoRadicado.id + row.tipoDocumental.id);
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

  validarRepetidosPlantillaSubtipoClase(): any {
    let couples: string[] = [];
    let counter = {};
    var result = [];
    this.rows.forEach(row => {
      couples.push(row.plantilla.id + row.tramiteTipoRadicado.id + row.claseDocumental.id);
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

  validarRepetidosSubtipoClase(): any {
    let couples: string[] = [];
    let counter = {};
    var result = [];
    this.rows.forEach(row => {
      couples.push(row.tramiteTipoRadicado.id + row.claseDocumental.id);
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

  onClicEliminar() {
    if (this.rows && this.selectedRows.state !== 'new') {
      this.rows.find(row => row === this.selectedRows).state = this.selectedRows.state === 'delete' ? 'edit' : 'delete';
    } else if (this.selectedRows && this.selectedRows.state === 'new') {
      let index = this.rows.indexOf(this.selectedRows);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.selectedRows = undefined;
    }
  }

  buildJsonPlantilla() {
    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "plantilla.id",
        "type": "autocomplete",
        "required": false
      },
      {
        "name": "plantilla.codigo",
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
        "name": "tramiteTipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.id",
        "type": "autocomplete",
        "required": true
      },
      {
        "name": "tipoDocumental.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.id",
        "type": "listbox",
        "required": true
      },
      {
        "name": "claseDocumental.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "terminoRequerimiento",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "diasRequerimiento",
        "type": "number",
        "required": false
      },
      {
        "name": "prorrogaEntidad",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "prorrogaPeticionario",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "diasProrroga",
        "type": "number",
        "required": false
      },
      {
        "name": "tipoComunicacion.id",
        "type": "listbox",
        "required": false
      },
      {
        "name": "tipoComunicacion.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "plantilla.jsonConfiguracion",
        "type": "input",
        "required": false
      },
      {
        "name": "plantilla.macroproceso",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoDocumental.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoComunicacion.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoComunicacion.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoComunicacion.activo",
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
        "name": "tramiteTipoRadicado.modificarDiaTermino",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.cof",
        "type": "input",
        "required": false
      },
      {
        "name": "tramiteTipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "cantidad",
        "type": "input",
        "required": false
      }
    ];
    let features = [];
    this.rows.forEach(row => {
      if (row.state !== 'new') {
        features.push({
          "attributes": {
            "id": row.id,
            "plantilla.id": row.plantilla.id,
            "plantilla.codigo": row.plantilla.codigo,
            "tipoRadicado.id": row.tipoRadicado.id,
            "tipoRadicado.codigoDescripcion": row.tipoRadicado.codigoDescripcion,
            "tramiteTipoRadicado.id": row.tramiteTipoRadicado.id,
            "tramiteTipoRadicado.descripcion": row.tramiteTipoRadicado.descripcion,
            "tipoDocumental.id": row.tipoDocumental.id,
            "tipoDocumental.codigoDescripcion": row.tipoDocumental.codigoDescripcion,
            "claseDocumental.id": row.claseDocumental.id,
            "claseDocumental.codigoDescripcion": row.claseDocumental.codigoDescripcion,
            "terminoRequerimiento": row.terminoRequerimiento,
            "diasRequerimiento": row.diasRequerimiento,
            "prorrogaEntidad": row.prorrogaEntidad,
            "prorrogaPeticionario": row.prorrogaPeticionario,
            "diasProrroga": row.diasProrroga,
            "tipoComunicacion.id": row.tipoComunicacion.id,
            "tipoComunicacion.codigoDescripcion": row.tipoComunicacion.codigoDescripcion,
            "claseDocumental.codigo": row.claseDocumental.codigo,
            "claseDocumental.descripcion": row.claseDocumental.descripcion,
            "plantilla.jsonConfiguracion": "",
            "plantilla.macroproceso": "",
            "tipoDocumental.activo": row.tipoDocumental.activo,
            "tipoDocumental.codigo": row.tipoDocumental.codigo,
            "tipoDocumental.descripcion": row.tipoDocumental.descripcion,
            "tipoRadicado.descripcion": row.tipoRadicado.descripcion,
            "tipoRadicado.codigo": row.tipoRadicado.codigo,
            "tipoRadicado.activo": row.tipoRadicado.activo,
            "tipoComunicacion.descripcion": row.tipoComunicacion.descripcion,
            "tipoComunicacion.codigo": row.tipoComunicacion.codigo,
            "tipoComunicacion.activo": row.tipoComunicacion.activo,
            "tramiteTipoRadicado.webfile": row.tramiteTipoRadicado.webfile,
            "tramiteTipoRadicado.entrada": row.tramiteTipoRadicado.entrada,
            "tramiteTipoRadicado.modificarDiaTermino": row.tramiteTipoRadicado.modificarDiaTermino,
            "tramiteTipoRadicado.cof": row.tramiteTipoRadicado.cof,
            "tramiteTipoRadicado.activo": row.tramiteTipoRadicado.activo,
            "cantidad": row.cantidad
          },
          "state": row.state
        })
      } else {
        features.push({
          "attributes": {
            "id": "",
            "plantilla.id": row.plantilla.id,
            "plantilla.codigo": "",
            "tipoRadicado.id": row.tipoRadicado.id,
            "tipoRadicado.codigoDescripcion": "",
            "tramiteTipoRadicado.id": row.tramiteTipoRadicado.id,
            "tramiteTipoRadicado.descripcion": "",
            "tipoDocumental.id": row.tipoDocumental.id,
            "tipoDocumental.codigoDescripcion": "",
            "claseDocumental.id": row.claseDocumental.id,
            "claseDocumental.codigoDescripcion": "",
            "terminoRequerimiento": row.terminoRequerimiento,
            "diasRequerimiento": row.diasRequerimiento,
            "prorrogaEntidad": row.prorrogaEntidad,
            "prorrogaPeticionario": row.prorrogaPeticionario,
            "diasProrroga": "",
            "tipoComunicacion.id": row.tipoComunicacion.id,
            "tipoComunicacion.codigoDescripcion": "",
            "claseDocumental.codigo": "",
            "claseDocumental.descripcion": "",
            "plantilla.jsonConfiguracion": "",
            "plantilla.macroproceso": "",
            "tipoDocumental.activo": "",
            "tipoDocumental.codigo": "",
            "tipoDocumental.descripcion": "",
            "tipoRadicado.descripcion": "",
            "tipoRadicado.codigo": "",
            "tipoRadicado.activo": "",
            "tipoComunicacion.descripcion": "",
            "tipoComunicacion.codigo": "",
            "tipoComunicacion.activo": "",
            "tramiteTipoRadicado.webfile": "",
            "tramiteTipoRadicado.entrada": "",
            "tramiteTipoRadicado.modificarDiaTermino": "",
            "tramiteTipoRadicado.cof": "",
            "tramiteTipoRadicado.activo": "",
            "cantidad": ""
          },
          "state": "new"
        })
      }
    })
    return {
      "grd_plantillas": JSON.stringify({
        fields,
        features
      })
    };
  }

  buildJsonComunicacion() {
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
        "name": "claseDocumental.id",
        "type": "listbox",
        "required": false
      },
      {
        "name": "claseDocumental.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "claseDocumental.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "activo",
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
    this.tablaDocumentos.forEach(element => {
      if (element.state !== 'new') {
        features.push({
          "attributes": {
            "id": element.id,
            "codigo": element.codigo,
            "descripcion": element.descripcion,
            "claseDocumental.id": element.claseDocumental.id,
            "claseDocumental.descripcion": element.claseDocumental.descripcion,
            "claseDocumental.codigo": element.claseDocumental.codigo,
            "claseDocumental.codigoDescripcion": '',
            "codigoDescripcion": element.codigo + ' ' + element.descripcion,
            "activo": element.activo,
            "editable": element.editable
          },
          "state": element.state
        })
      } else {
        features.push({
          "attributes": {
            "id": '',
            "codigo": element.codigo,
            "descripcion": element.descripcion,
            "claseDocumental.id": element.claseDocumental.id,
            "claseDocumental.descripcion": '',
            "claseDocumental.codigo": '',
            "claseDocumental.codigoDescripcion": '',
            "codigoDescripcion": '',
            "activo": '1',
            "editable": '1'
          },
          "state": 'new'
        })
      }

    })
    return {
      "grd_tipoComunicacion": JSON.stringify({
        fields,
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

  prueba(rowIndex){
    console.log(rowIndex);
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

}

export interface Row {
  idRow: any;
  id: any;
  plantilla: {
    id: any;
    codigo: string;
  };
  tipoRadicado: {
    id: any;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    activo: number;
  };
  tramiteTipoRadicado: {
    id: any;
    descripcion: string;
    tipoRadicado: {
      id: any;
      codigo: string;
      descripcion: string;
      codigoDescripcion: string;
      activo: number;
    },
    modificarDiaTermino: number;
    activo: number;
    entrada: number;
    cof: number;
    webfile: number;
    verbal: number;
    anonimo: number;
  },
  tipoDocumental: {
    id: any;
    activo: number;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    codigoDescripcionGuion: string;
  },
  claseDocumental: {
    id: any;
    descripcion: string;
    codigo: string;
    codigoDescripcion: string;
  },
  tipoComunicacion: {
    id: any;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    codigoDescripcionGuion: string;
    editable: number;
    activo: number;
  },
  terminoRequerimiento: number;
  prorrogaEntidad: number;
  prorrogaPeticionario: number;
  diasRequerimiento: number;
  diasProrroga: number;
  cantidad: number;
  state: string;
}

export interface Documento {
  idRow: any;
  id: any;
  codigo: string;
  descripcion: string;
  codigoDescripcion: string;
  codigoDescripcionGuion: string;
  claseDocumental: {
    id: any;
    descripcion: string;
    codigo: string;
  },
  editable: number;
  activo: number;
  state: string;

}
