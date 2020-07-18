import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AnexosFisicosClaseService } from './servicio/anexos-fisicos-clase.service';
import { MessageService } from 'primeng/api';
// import * as confJson from '../../assets/i18n/es.json';

@Component({
  selector: 'app-cumco005',
  templateUrl: './cumco005.component.html',
  styleUrls: ['./cumco005.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco005Component implements OnInit {

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
      "BOTON": {
        "agregar": "Agregar",
        "eliminar": "Eliminar",
        "guardar": "Guardar"

      },
      "CUMCO005": {

      }
    }
  };

  // Variables de texto
  //varText: any = confJson;
  anexosFisicos: any[];

  tipoAnexoFisicos: any[];

  tablaTemp: any[];

  buttonDisabled: boolean;


  seleccionAnexoFisicos: any;


  seleccionTipoAnexoFisicos: any;

  filtroAnexo: string = '';

  filtroTipoAnexo: string = '';
  responseGuardar: any;
  idRow: number;


  constructor(private anexosFisicosClaseService: AnexosFisicosClaseService,
    private messageService: MessageService) {
    this.cols = [
      { field: 'id', header: '' },
      { field: 'claseAnexo.descripcion', header: 'Tipo de Anexo Físico' },
      { field: 'tipoAnexoFisico.descripcion', header: 'Anexo Físico' },
      { field: 'observacion', header: 'Descripción' },
      { field: 'isCarpeta', header: 'Ubicar Folios en Carpetas' }
    ];
    this.rows = [];
    // this.anexosFisicos = [];
    // this.tipoAnexoFisicos = [];
    this.buttonDisabled = false;
    this.idRow = 0;

  }



  rowIndex = 0;

  rows: Row[];

  cols: any[];

  selectedRow: any;

  tipoDeRadicado: any[];

  ngOnInit() {
    this.subscribeCodigoDescripcion('', '');
    this.subscribeAnexosFisicos();
    this.subscribeTipoAnexoFisico();

  }

  onClickElminiarSelected(){
    this.selectedRow = undefined;
  }

  subscribeAnexosFisicos() {

    this.anexosFisicosClaseService.getAnexosFisicos().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.anexosFisicos = getRes;
        // this.anexosFisicos = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if (this.filtroAnexo !== '') {
          this.anexosFisicos = this.anexosFisicos.filter(val => val.descripcion.toLowerCase().includes(this.filtroAnexo));
        }
      });
  }

  subcribeRecorridoRepartoFisico(body: string) {
    this.anexosFisicosClaseService.postGuardarAccionTipoDocumental(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardar = getRes;
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
        this.showMessage(this.responseGuardar.message, "success");
        this.subscribeCodigoDescripcion('', '');
      });
  }

  subscribeTipoAnexoFisico() {
    this.anexosFisicosClaseService.getTipoAnexoFisico().subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tipoAnexoFisicos = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if (this.filtroTipoAnexo !== '') {
          this.tipoAnexoFisicos = this.tipoAnexoFisicos.filter(val => val.descripcion.toLowerCase().includes(this.filtroTipoAnexo));
        }
      });
  }

  subscribeCodigoDescripcion(clase: any, tipo: any) {
    this.anexosFisicosClaseService.getCodigoDescripcion(clase, tipo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaTemp = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.updateTable();
      });
  }
  updateTable(): any {
    this.rows = [];
    this.tablaTemp.forEach(row => {

      this.rows.push({
        idRow: '',
        id: row.id,
        tipoAnexoFisico: {
          id: row.tipoAnexoFisico.id,
          descripcion: row.tipoAnexoFisico.descripcion,
          codigo: row.tipoAnexoFisico.codigo
        },
        claseAnexo: {
          id: row.claseAnexo.id,
          descripcion: row.claseAnexo.descripcion
        },
        observacion: row.observacion,
        state: 'noedit',
        isCarpeta: row.tipoAnexoFisico.isCarpeta,
        idDescripcion: ''
      })

    })
  }

  searchTipoanexo(event) {
    this.filtroTipoAnexo = event.query;
    this.subscribeTipoAnexoFisico();
  }

  checkBox(index) {
    this.rows[index].isCarpeta = this.rows[index].claseAnexo.id === 2 ? 0 : this.rows[index].isCarpeta;
  }

  searchAnexo(event) {
    this.filtroAnexo = event.query;
    this.subscribeAnexosFisicos();

  }

  onClicBorrarAutoCompleteTipo() {
    this.seleccionTipoAnexoFisicos = undefined;
  }

  onClicBorrarAutoCompleteAnexo() {
    this.seleccionAnexoFisicos = undefined
  }

  onClicAgregar() {
    let idNum = 0;

    this.rows.forEach(row => {
      idNum = row.id > idNum ? row.id : idNum;
    })
    const newData = {
      idRow: this.idRow,
      id: '',
      tipoAnexoFisico: {
        id: 0,
        descripcion: '',
        codigo: ''
      },
      claseAnexo: {
        id: 0,
        descripcion: ''
      },
      observacion: '',
      state: 'new',
      isCarpeta: 0,
      idDescripcion: ''
    }

    this.rows = [...this.rows, newData];
    this.idRow += 1;
  }



  onClicEliminar() {
    if (this.selectedRow && this.selectedRow.state !== 'new') {
      this.rows.find(row => row === this.selectedRow).state = this.selectedRow.state === 'delete' ? 'edit' : 'delete';
    } else if (this.selectedRow && this.selectedRow.state === 'new') {
      let index = this.rows.indexOf(this.selectedRow);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.selectedRow = '';
    }


  }

  edited(rowIndex) {
    this.rows[rowIndex].state = this.rows[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
  }

  onGuardarColumna() {
    if (!this.camposValidos()) {
      const error = this.varText.default.MENSAJES.errorGuardar;
      this.showMessage(error, "error");
    } else if (!this.validarRepetidos()) {
      const error = this.varText.default.MENSAJES.repetidos;
      this.showMessage(error, "error");
    } else if (!this.validarAnexoRepetidoTipo()) {
      const error = this.varText.default.MENSAJES.repetidosAnexoTipo;
      this.showMessage(error, "error");
    } else {
      this.subcribeRecorridoRepartoFisico(this.buildJson());
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
        "name": "claseAnexo.id",
        "type": "listbox",
        "required": true
      },
      {
        "name": "claseAnexo.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoAnexoFisico.id",
        "type": "listbox",
        "required": true
      },
      {
        "name": "tipoAnexoFisico.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoAnexoFisico.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "observacion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoAnexoFisico.idDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoAnexoFisico.isCarpeta",
        "type": "checkbox",
        "required": false
      }
    ];
    let features = [];
    this.rows.forEach(row => {
      if (row.state !== 'new') {
        features.push({
          "attributes": {
            "id": row.id,
            "claseAnexo.id": row.claseAnexo.id,
            "claseAnexo.descripcion": row.claseAnexo.descripcion,
            "tipoAnexoFisico.id": row.tipoAnexoFisico.id,
            "tipoAnexoFisico.codigo": row.tipoAnexoFisico.codigo,
            "tipoAnexoFisico.descripcion": row.tipoAnexoFisico.descripcion,
            "observacion": row.observacion,
            "tipoAnexoFisico.idDescripcion": row.idDescripcion,
            "tipoAnexoFisico.isCarpeta": row.isCarpeta
          },
          "state": row.state
        })
      } else {
        features.push({
          "attributes": {
            "id": '',
            "claseAnexo.id": row.claseAnexo.id.toString(),
            "claseAnexo.descripcion": '',
            "tipoAnexoFisico.id": row.tipoAnexoFisico.id.toString(),
            "tipoAnexoFisico.codigo": '',
            "tipoAnexoFisico.descripcion": '',
            "observacion": row.observacion,
            "tipoAnexoFisico.idDescripcion": '',
            "tipoAnexoFisico.isCarpeta": row.isCarpeta
          },
          "state": row.state
        })
      }

    })

    return {
      "grd_anexos": JSON.stringify({
        fields,
        features
      })
    };
  }
  validarAnexoRepetidoTipo(): any {
    let counter = {};
    var result = [];
    this.rows.forEach(function(couple) {
      if (!counter[couple.tipoAnexoFisico.id]) {
        counter[couple.tipoAnexoFisico.id] = 0;
      }
      counter[couple.tipoAnexoFisico.id] += 1;
    })

    for (var prop in counter) {
      if (counter[prop] >= 2) {
        result.push(prop);
      }
    }
    return result.length === 0 ? true : false;
  }
  validarRepetidos(): any {
    let couples: string[] = [];
    let counter = {};
    var result = [];
    this.rows.forEach(row => {
      couples.push(row.claseAnexo.id.toString() + row.tipoAnexoFisico.id.toString());
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
    this.rows.forEach(row => {
      valido = valido && (row.claseAnexo.descripcion === '' ? false : true
        && row.tipoAnexoFisico.descripcion === '' ? false : true
          && row.observacion === '' ? false : true);
    })
    return valido;
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
  idRow: any;
  id: any;
  tipoAnexoFisico: {
    id: number;
    descripcion: string;
    codigo: string;
  };
  claseAnexo: {
    id: number;
    descripcion: string;
  };
  observacion: string;
  state: string;
  isCarpeta: number;
  idDescripcion: string;
}
