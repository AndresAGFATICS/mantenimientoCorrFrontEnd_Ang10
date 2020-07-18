import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cumco010Service } from '../cumco010/servicio/cumco010.service';
import { MessageService } from 'primeng/api';
//import * as confJson from '../../assets/i18n/es.json';

@Component({
  selector: 'app-cumco010',
  templateUrl: './cumco010.component.html',
  styleUrls: ['./cumco010.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO010Component implements OnInit {

  tablaDevolucion: any[];
  filtroDevolucion: any[];
  seleccionFiltro: any;
  seleccionDevolucion: any;

  responseGuardar: any;
  rows: Row[];

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

  columnasAdjuntos: any[];
  idRow: number;

  constructor(private cumco010Service: Cumco010Service,
    private messageService: MessageService) {
      this.columnasAdjuntos = [
        { field: 'id', header: '' },
        { field: 'mdd', header: this.varText.default.TABLAS.motivoDevolucion },
        { field: 'act', header: this.varText.default.TABLAS.activo }
      ];
      this.idRow = 0;
    }

  ngOnInit() {
    this.subscribePersona();

  }

  subscribePersona() {
    this.cumco010Service.getMotivoDevolucion().subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaDevolucion = [];
        getRes.forEach(res => {
          this.tablaDevolucion.push({
            id: res.id,
            activo: res.activo,
            descripcion: res.descripcion,
            state: 'noedit'
          });
        this.rows = this.tablaDevolucion;
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

  searchDevolucion(event) {
    event = event===undefined || event === ''?'':event;
    this.filtroDevolucion = [];
        for(let i = 0; i < this.tablaDevolucion.length; i++) {
            let persona = this.tablaDevolucion[i];
            if (persona.descripcion.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filtroDevolucion.push(persona);
            }
        }
  }

  subcribeGuardarPersonas(body: any) {
    this.cumco010Service.postGuardarPersonas(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
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
        this.showMessage(this.responseGuardar.message, "success");
        this.subscribePersona();
      });
  }

  borrarFiltro() {
    this.seleccionFiltro = undefined;
  }

  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
  }

  editedDevolucion(rowIndex) {

    if(!this.rows.some(row => row.descripcion.toLowerCase() ===  this.rows[rowIndex].descripcion.toLowerCase())) {
      this.rows[rowIndex].descripcion ='';
      const error = this.varText.default.MENSAJES.identificacionRepetida;
      this.showMessage(error, "error");
    }
    // let count = 0;
    // this.tablaDevolucion.forEach(row => {
    //     count =count + (row.descripcion.toLowerCase() ===  this.rows[rowIndex].descripcion.toLowerCase()?1:0);
    // })
    // if(count > 1)
    // {
    //   this.rows[rowIndex].descripcion ='';
    //   const error = this.varText.default.MENSAJES.identificacionRepetida;
    //   this.showMessage(error, "error");
    // }
    this.rows[rowIndex].state = this.rows[rowIndex].state === 'new'? 'new': 'edit';
  }

  agregarClick() {
      this.rows.push({
        idRow: this.idRow,
        id: '',
        activo: 1,
        descripcion: '',
        state: 'new'
      });
      this.idRow +=1;
  }
  onGuardarConfiguracion() {
    if(this.validForm()) {
      this.subcribeGuardarPersonas(this.buildJson());
    } else {
      //const error = this.varText.default.MENSAJES.errorGuardar;
      //this.showMessage(error, "error");
    }

  }
  validForm(): any {
    //if(!this.rows.some(row => row.descripcion.toLowerCase() ===  this.rows[rowIndex].descripcion.toLowerCase())) {
    //  this.rows[rowIndex].descripcion ='';
    //  const error = this.varText.default.MENSAJES.identificacionRepetida;
    //  this.showMessage(error, "error");
    //}
    for(var _i = 0; _i < this.rows.length; _i++){
      let errIndex = _i + 1
      for (var _x = errIndex; _x < this.rows.length; _x++){
        if(this.rows[_i].descripcion.toLowerCase() === this.rows[_x].descripcion.toLowerCase()){
          this.showMessage('El Motivo de devolución [' + this.rows[_i].descripcion + '] se encuentra repetido, por favor validar', "error");
          return false;
        }
      }
    }

    if(this.rows.some(row => row.descripcion === '')){
      this.showMessage('El campo "motivo de devolución" no puede estar vacío', "error");
      return false;
    }
    return true;
  }
  buildJson() {
    let fields = [
      {
        "name": "descripcion",
        "type": "input",
        "required": true
      },
      {
        "name": "activo",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "id",
        "type": "input",
        "required": false
      }
    ];
    let features = [];
    this.rows.forEach(row => {
      features.push({
        "attributes": {
          "descripcion": row.descripcion,
          "activo": row.activo,
          "id": row.id
        },
        "state": row.state
      })
    });
    return {
      "grd_motivos": JSON.stringify({
        fields,
        features
      })
    };
  }

  eliminarClick() {
    if(this.seleccionDevolucion && this.seleccionDevolucion.state!=='new') {
      this.rows.find(row => row === this.seleccionDevolucion).state = this.seleccionDevolucion.state=== 'delete'?'edit':'delete';
    } else if(this.seleccionDevolucion && this.seleccionDevolucion.state ==='new') {
      let index = this.rows.indexOf(this.seleccionDevolucion);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.seleccionDevolucion = '';
    }
  }

  onChangeActivo(rowIndex){
    console.log(this.rows[rowIndex].activo)
    this.rows[rowIndex].state = this.rows[rowIndex].state === 'new'? 'new': 'edit';

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
  idRow: number;
  id: any;
  activo: number;
  descripcion: string;
  state: string;
}
