import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Cumco006Service } from './servicio/cumco006.service';
// import * as confJson from '../../assets/i18n/es.json';

@Component({
  selector: 'app-cumco006',
  templateUrl: './cumco006.component.html',
  styleUrls: ['./cumco006.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco006Component implements OnInit {
  respuestaGuardarHorarioRadicado: any;
  repetidos: any[];


  constructor(private cumco006Service: Cumco006Service,
    private messageService: MessageService) {
    this.cols = [
      { field: 'id', header: '' },
      { field: 'fecha_festivo', header: this.varText.default.TABLAS.fechaFestivo }
    ];
    this.hora = {};
    this.horaCof = {};
  }

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
        "identificacionRepetida": "El tipo de identificación, se encuentra repetido, por favor validar",
        "seleccioneTipoRadicado": "Por Favor Seleccione un tipo de radicado para la fila",
        "claseDocNoRequierePlantilla": "La clase documental Entrada no requiere una selección de plantilla, si continúa se borrará la plantilla seleccionada al inicio",
        "detalleClaseDocNoRequierePlantilla": "¿Desea continuar?",
        "repetidosPlantillaSubtipoTipo": "El registro con la plantilla, subtipo de radicado y tipo documental está repetido",
        "repetidosPlantillaSubtipoClase": "Para el registro con la plantilla, Subtipo de radicado, la clase documental no debe ser diferente.",
        "repetidosSubtipoClase": "El registro con el subtipo de radicado y tipo documental está repetido",
        "errorHora006": "La hora final seleccionada debe ser superior a la hora de inicio ingresada",
        "errorFecha": "La fecha Festivo se encuentra repetida por favor validar",
        "seleccionFiltro": "Seleccione un filtro"
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
        "descripcionRadicado": "Descripción Tipo Radicado",
        "categoria": "Categoría",
        "fechaFestivo": "Fecha Festivo"
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
      "CUMCO006": {
        "titulo": "Configurar Horario Ventanilla Entrada",
        "canalConfigurar": "Canal a Configurar",
        "horaInicio": "Hora Inicio:",
        "horaFin": "Hora Fin:",
        "tituloTablaFestivos": "Habilitar Festivos Para Radicación"

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
      "CUMCO014": {
        "pestana1": "Tipos de Radicaco",
        "titulo1": "Configurar Tipos de Radicado",
        "tituloAutoCompletarRadicado": "Filtar por Tipo Radicado",
        "titulo2": "Configurar Tipos de Radicado con Subtipos y Trámite",
        "tituloAutoCompletarSubRadicado": "Filtar por Descripción (Subtipo de Radicado)"

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

  es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Borrar'
  }

  idRow: number = 0;
  rowIndex = 0;

  cols: any[];


  seleccionFestivo: Festivo;
  listaFestivo: Festivo[];

  seleccionCanal: any;
  listaCanal: any[];

  hora: any;

  horaCof: any;

  ngOnInit() {
    this.subscribeRadicado();
    this.subscribeHoraCof();
    this.subscribeFestivo();
  }

  subscribeRadicado() {
    this.cumco006Service.getCanal().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaCanal = [];
        getRes.forEach(res => {

          this.listaCanal.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

      });
  }

  subscribeHora(idCanal: any) {
    this.cumco006Service.getHora(idCanal).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.hora = getRes[0];
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeHoraCof() {
    this.cumco006Service.getHoraCof().subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.horaCof = getRes[0];
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
      });
  }

  subscribeFestivo() {
    this.cumco006Service.getFestivo().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaFestivo = [];
        getRes.forEach(res => {

          this.listaFestivo.push({
            idRow: '',
            id: res.id,
            fechaHabilitada: res.fechaHabilitada,
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

  subcribeHorarioRadicacion(body: any) {
    this.cumco006Service.postGuardarHorarioRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarHorarioRadicado = getRes;
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
        if (!this.respuestaGuardarHorarioRadicado.status) {
          this.showMessage(this.respuestaGuardarHorarioRadicado.message, "error");
        }
        else {
          this.showMessage(this.respuestaGuardarHorarioRadicado.message, "success");
          this.subscribeRadicado();
          this.subscribeHoraCof();
          this.subscribeFestivo();
        }

      });
  }

  onClicAgregar() {
    let element = {
      idRow: this.idRow,
      id: '',
      fechaHabilitada: '',
      state: 'new'
    }
    this.listaFestivo = [...this.listaFestivo, element];
    this.idRow += 1;
  }

  onClicEliminar() {
    if (this.seleccionFestivo && this.seleccionFestivo.state !== 'new') {
      this.listaFestivo.find(row => row === this.seleccionFestivo).state = this.seleccionFestivo.state === 'delete' ? 'edit' : 'delete';
    } else if (this.seleccionFestivo && this.seleccionFestivo.state === 'new') {
      let index = this.listaFestivo.indexOf(this.seleccionFestivo);
      this.listaFestivo = this.listaFestivo.filter((val, i) => i !== index);
      this.seleccionFestivo = undefined;
    }
  }

  onClicGuardar() {
    if (!this.camposValidos()) {
      const error = this.varText.default.MENSAJES.errorGuardar;
      this.showMessage(error, "error");
    } else if (this.validarHora(this.hora.horaInicial, this.hora.horaFinal) || this.validarHora(this.horaCof.horaInicial, this.horaCof.horaFinal)) {
      const error = this.varText.default.MENSAJES.errorHora006;
      this.showMessage(error, "error");
    } else if (!this.validarRepetidos()) {
      const error = this.varText.default.MENSAJES.errorFecha + ' ' + this.repetidos[0];
      this.showMessage(error, "error");
    } else {
      this.subcribeHorarioRadicacion(this.buildJson());
    }
  }

  buildJson(): any {
    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "fechaHabilitada",
        "type": "date",
        "required": false
      }
    ];
    let features = [];
    this.listaFestivo.forEach(festivo => {
      features.push({
        "attributes": {
          "id": festivo.id,
          "fechaHabilitada": festivo.fechaHabilitada
        },
        "state": festivo.state
      })
    })
    return {
      "dat_cof_hora_fin": this.horaCof.horaFinal,
      "dat_cof_hora_ini": this.horaCof.horaInicial,
      "dat_ent_hora_fin": this.hora.horaFinal,
      "dat_ent_hora_ini": this.hora.horaInicial,
      "grd_festivos": JSON.stringify({
        fields,
        features
      }),
      "lst_canal": this.seleccionCanal.id.toString()
    };
  }

  camposValidos(): any {
    let valido = true;
    this.listaFestivo.forEach(festivo => {
      valido = valido && (festivo.fechaHabilitada === '' ? false : true
        && this.hora.horaInicial && this.hora.horaFinal);
    })
    return valido;
  };

  validarHora(horaInicial: string, horaFinal: string) {
    if (horaInicial && horaFinal) {
      let initialValue = horaInicial;
      let finalValue = horaFinal;
      let finalHour = parseInt(finalValue[0] + finalValue[1] + finalValue[3] + finalValue[4]);
      let initialHour = parseInt(initialValue[0] + initialValue[1] + initialValue[3] + initialValue[4]);
      return finalHour <= initialHour;
    } else {
      return true;
    }
  };

  validarRepetidos(): any {
    let couples: string[] = [];
    let counter = {};
    this.repetidos = [];
    this.listaFestivo.forEach(festivo => {
      couples.push(festivo.fechaHabilitada);
    })

    couples.forEach(function(couple) {
      if (!counter[couple]) {
        counter[couple] = 0;
      }
      counter[couple] += 1;
    })

    for (var prop in counter) {
      if (counter[prop] >= 2) {
        this.repetidos.push(prop);
      }
    }
    return this.repetidos.length === 0 ? true : false;
  }

  edited(rowIndex) {
    this.listaFestivo[rowIndex].state = this.listaFestivo[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  desSelectRow() {
    this.seleccionFestivo = undefined;
  }

  actualizarHora() {
    this.subscribeHora(this.seleccionCanal.id);
  }

  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
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

export interface Festivo {
  idRow;
  id;
  fechaHabilitada;
  state;
}
