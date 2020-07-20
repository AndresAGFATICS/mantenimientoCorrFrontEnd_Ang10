import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

// Importación de servicios
import { TerritorialActivaService } from './servicio/territorial-activa.service'
// import * as confJson from '../../assets/i18n/es.json';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';


//const confJson = require('../../assets/i18n/es.json');
//const confJson = 'nada';


@Component({
  selector: 'app-cumco012',
  templateUrl: './cumco012.component.html',
  styleUrls: ['./cumco012.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO012Component implements OnInit {

  mensaje: string;
  // Variables de texto



  // Variable para habilitar botones
  buttonDisabled: boolean = true;
  // Formulario a Guardar

  nombre_recorrido: string;
  hora_inicio: string;
  hora_fin: string;
  activo: boolean = false;

  // Variables de los autocompletables
  textAutoComlpeteOrganismoConfigurar: string;
  textAutoCompleteRecorridos: string;

  suggestionsAutoCompleteOrganismoConfigurar: string[];
  suggestionsAutoCompleteRecorridos: string[];

  // Variables de los srevicios
  responseTerritorial: any;
  responseRecorridos: any[];

  // Array que contiene las filas de la tabla
  rows: Row[];

  // Headers de la tabla
  cols: any[];

  //
  horaFinAnterior: string;
  horaInicioAnterio: string;

  //
  body: Body;

  rowIndex = 0;
  selectedRow: Row;
  responsePost: any;

  constructor(
    private territorialActivaService: TerritorialActivaService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {

    this.textAutoComlpeteOrganismoConfigurar = '';
    this.textAutoCompleteRecorridos = '';
    this.suggestionsAutoCompleteOrganismoConfigurar = [];
    this.suggestionsAutoCompleteRecorridos = [];
    this.responseTerritorial = [];
    this.responseRecorridos = [];

    this.rows = [];

  }



  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    // Obteniendo las opciones de Organismo a configurar
    this.subcribeServiceTiporadicado('');
  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'id', header: this.translate.instant('CUMCO012.TABLA1.headerTabla0') },
        { field: 'nombre_recorrido', header:this.translate.instant('CUMCO012.TABLA1.headerTabla1') },
        { field: 'hora_inicio', header: this.translate.instant('CUMCO012.TABLA1.headerTabla2') },
        { field: 'hora_fin', header: this.translate.instant('CUMCO012.TABLA1.headerTabla3') },
        { field: 'activo', header: this.translate.instant('CUMCO012.TABLA1.headerTabla4')},
      ];
    });
  }



  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
  }

  addOneMinute(value: string) {
    let units = '';
    let decimals = '';
    let hours = '';
    if (value) {

      if (value[4] !== '9') {
        units = (parseInt(value[4], 10) + 1).toString();
        decimals = value[3];
        hours = value[0] + value[1];
      } else {
        units = '0';
        if (value[3] !== '5') {
          decimals = (parseInt(value[3], 10) + 1).toString();
          hours = value[0] + value[1];
        } else {
          decimals = '0';
          if (value[0] + value[1] !== '23') {
            hours = (parseInt(value[0] + value[1], 10) + 101).toString().substring(1, 3);
          } else {
            hours = '00';
          }

        }
      }
      return hours + ':' + decimals + units;

    }
    return '';
  }

  subcribeServiceReparto() {
    this.territorialActivaService.getRecorridoRepartoFisico(
      this.findOrganismByName(this.textAutoComlpeteOrganismoConfigurar)).subscribe(

        (getRes: any[]) => {     // Inicio del suscribe
          this.responseRecorridos = getRes;
          return getRes;
        },
        getError => {           // Error del suscribe
          console.log('GET call in error', getError);
        },
        () => {
          console.log('HOLA')                 // Fin del suscribe
          this.updateTable(this.responseRecorridos);
        });
  }

  subcribeServiceTiporadicado(getParameters: string) {
    this.territorialActivaService.getTerritorialActivaConsultaService(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.responseTerritorial = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.showMessage(getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteOrganismoConfigurar = [];
        for (const data of this.responseTerritorial) {
          //const index = this.rows.indexOf(selectedRow);
          this.suggestionsAutoCompleteOrganismoConfigurar.push(data.nombreCodigo);
        }

      });
  }

  subcribeRecorridoRepartoFisico(body: string) {
    this.territorialActivaService.postRecorridoRepartoFisico(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO012.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        this.quitarNew();
        if (!this.responsePost.status) {
          this.showMessage(this.responsePost.message, "error");
        }
        else {
          this.showMessage(this.responsePost.message, "success");
          const exito = this.translate.instant('CUMCO012.MENSAJES.exito');
          this.showMessage(exito, "success");
          this.subcribeServiceTiporadicado('');
        }
      });
  }

  // Metodo para actualizar los datos de la tabla
  updateTable(dataArray: any[]) {


    this.rows = [];
    for (const data of dataArray) {
      //const index = this.rows.indexOf(selectedRow);
      this.rows.push({
        id: '',
        nombre_recorrido: data.nombreRecorrido,
        hora_inicio: data.horaInicio,
        hora_fin: data.horaFin,
        activo: data.activo,
        state: 'noedit'
      });


    }

  }

  quitarNew() {
    for (var _i = 0; _i < this.rows.length; _i++) {
      if (this.rows[_i].state === 'new' || this.rows[_i].state === 'edited') {
        this.rows[_i].state = 'noedited'
      }

    }
  }

  findOrganismByName(name: string): string {
    const organism = this.responseTerritorial.find(element => element.nombreCodigo === name);
    return organism ? organism.id.toString() : '';
  }


  search(event) {
    this.subcribeServiceTiporadicado('?codigoNombre=' + event.query);
  }

  getTableInfo() {
    this.subcribeServiceReparto();
    this.buttonDisabled = false;
  }

  onClicBorrarAutoComplete() {
    this.textAutoComlpeteOrganismoConfigurar = '';
  }

  onClicAgregar() {
    let lastHour = '';
    if (this.rows.length !== 0) {
      if (!this.rows[this.rows.length - 1].hora_fin) {
        const error = this.translate.instant('CUMCO012.MENSAJES.errorHoraInicio');
        this.showMessage(error, "error");
        return;
      }
      lastHour = this.rows[this.rows.length - 1].hora_fin;
    }

    let rows = [...this.rows];

    rows.push({
      id: '',
      nombre_recorrido: '',
      hora_inicio: this.addOneMinute(lastHour),
      hora_fin: '',
      activo: '1',
      state: 'new'
    });

    this.rows = rows;
  }

  guardarHora(index: number) {
    this.horaFinAnterior = this.rows[index].hora_fin;
    this.horaInicioAnterio = this.rows[index].hora_inicio;
  }

  validarHora(index: number) {
    let finalValue = this.rows[index].hora_fin;
    let initialValue = this.rows[index].hora_inicio;
    let finalHour = parseInt(finalValue[0] + finalValue[1] + finalValue[3] + finalValue[4]);
    let initialHour = parseInt(initialValue[0] + initialValue[1] + initialValue[3] + initialValue[4]);


    if (finalValue && initialValue && finalHour <= initialHour) {
      this.rows[index].hora_fin = this.horaFinAnterior;
      this.rows[index].hora_inicio = this.horaInicioAnterio;
      const error = this.translate.instant('CUMCO012.MENSAJES.errorHoraInicio');
      this.showMessage(error, "error");
    }



  }

  onClicEliminar() {

    if (this.selectedRow) {
      if (this.selectedRow.state === 'new') {
        let index = this.rows.indexOf(this.selectedRow);
        this.rows = this.rows.filter((val, i) => i !== index);
      } else {
        // mostar mensaje
        const error = this.translate.instant('CUMCO012.MENSAJES.eliminarFallido1') +
          this.selectedRow.nombre_recorrido + this.translate.instant('CUMCO012.MENSAJES.eliminarFallido2');
        this.showMessage(error, "error");
      }

    }


  }




  onGuardarColumna() {
    if (this.validarNombres()) {
      let body = this.generateJsonBody();
      this.subcribeRecorridoRepartoFisico(body);

    } else {
      const error = this.translate.instant('CUMCO012.MENSAJES.guardarError');
      this.showMessage(error, "succes");
    }
  }

  generateJsonBody(): any {
    let fields= [
      {
        "name": "nombreRecorrido",
        "type": "input",
        "required": true
      },
      {
        "name": "horaInicio",
        "type": "time",
        "required": true
      },
      {
        "name": "horaFin",
        "type": "time",
        "required": true
      },
      {
        "name": "activo",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.dependenciasHijas",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.fechaFinVigencia",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.fechaInicioVigencia",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.id",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.listaFuncionarios",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.nombre",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.nombreCodigo",
        "type": "input",
        "required": false
      },
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.codigoGestion",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.idTercero",
        "type": "input",
        "required": false
      },
      {
        "name": "dependenciaTerritorial.nombreCodigoGuion",
        "type": "input",
        "required": false
      }];
    let features = []

    this.rows.forEach(row => {
      if (row.state === 'new') {

        features.push({
          "attributes": {
            "nombreRecorrido": row.nombre_recorrido,
            "horaInicio": row.hora_inicio,
            "horaFin": row.hora_fin,
            "activo": row.activo === 1 ? true : false,
            "dependenciaTerritorial.codigo": this.findOrganismByName(this.textAutoComlpeteOrganismoConfigurar),
            "dependenciaTerritorial.dependenciasHijas": "",
            "dependenciaTerritorial.fechaFinVigencia": "",
            "dependenciaTerritorial.fechaInicioVigencia": "",
            "dependenciaTerritorial.id": "",
            "dependenciaTerritorial.listaFuncionarios": "",
            "dependenciaTerritorial.nombre": "",
            "dependenciaTerritorial.nombreCodigo": "",
            "id": "",
            "dependenciaTerritorial.codigoGestion": "",
            "dependenciaTerritorial.idTercero": "",
            "dependenciaTerritorial.nombreCodigoGuion": ""
          },
          "state": row.state

        })

      }
    })

    return {
      grd_reparto_fisico: JSON.stringify({
        fields,
        features
      })
    }



  }
  validarNombres(): boolean {
    let resp = true;
    if (this.rows.length !== 0) {
      this.rows.forEach(row => {
        if (row.nombre_recorrido === '' || row.hora_inicio === '' || row.hora_fin === '') {
          resp = false;
        }
      })
      return resp;
    }
    return !resp;
  }

  edited(rowIndex) {
    this.rows[rowIndex].state = 'edit';
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
  id;
  nombre_recorrido;
  hora_inicio;
  hora_fin;
  activo;
  state;
}
