import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Cumco014Service } from './servicio/cumco014.service';
import { MessageService } from 'primeng/api';
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
    private messageService: MessageService) {
    this.cols = [
      { field: 'id', header: '' },
      { field: 'codigo', header: this.varText.default.TABLAS.codigo },
      { field: 'nombre', header: this.varText.default.TABLAS.descripcionRadicado },
      { field: 'clase_documental', header: this.varText.default.TABLAS.categoria },
      { field: 'activo', header: this.varText.default.TABLAS.activo }
    ];
    this.cols2 = [
      { field: 'id', header: 'Código Tipo Radicado' },
      { field: 'codigo', header: 'Descripción (Subtipo de Radicado)' },
      { field: 'nombre', header: 'Tramite' },
      { field: 'clase_documental', header: 'Días Termino' },
      { field: 'item_4', header: 'Días Hábiles' },
      { field: 'item_5', header: 'Modificar Días' },
      { field: 'item_6', header: 'Activo' },
      { field: 'item_7', header: 'Ventanila de Entrada' },
      { field: 'item_8', header: 'Radicación Verval' },
      { field: 'item_9', header: 'Comunicaciones Oficiales' },
      { field: 'item_10', header: 'Ventanilla Virtual' },
      { field: 'item_11', header: 'Anónimo' }
    ];
    this.idRow = 0;
    this.suggestionsAutoCompleteSubTipoRadicado = [];
  }

  //varText: any = confJson;
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
        "diasRequerimiento": "Días Requerimiento",
        "descripcionRadicado": "Descripción Tipo de Radciado",
        "categoria": "Categoria"
      },
      "BOTON": {
        "agregar": "Agregar",
        "eliminar": "Eliminar",
        "guardar": "Guardar"

      },
      "CUMCO014": {
        "pestana1": "Tipos de Radicaco",
        "titulo1": "Configurar Tipos de Radicado",
        "tituloAutoCompletarRadicado": "Filtar por Tipo Radicado",
        "titulo2": "Configurar Tipos de Radicado con Subtipos y Trámite",
        "tituloAutoCompletarSubRadicado": "Filtar por Descripción (Subtipo de Radicado)"
  
      }

    }
  };

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
    this.subscribeRadicado('');
    this.subscribeTablaRadicado('');
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
        const error = this.varText.default.MENSAJES.falloGuardar;
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
       const error = this.varText.default.MENSAJES.errorGuardar;
       this.showMessage(error, "error");
    } else if (!this.validarRepetidosRadicado()) {
      const error = this.varText.default.MENSAJES.repetidos;
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
