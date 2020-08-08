import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cumco009Service } from './servicio/cumco009.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco009',
  templateUrl: './cumco009.component.html',
  styleUrls: ['./cumco009.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO009Component implements OnInit {

  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];

  tablaPersonas: Persona[];
  tablaIdentificacion: any[];
  seleccionPersona: any;

  rows: Row[] = [];
  seleccionConfiguracion: any;
  // varText: any = confJson;

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
    private messageService: MessageService,
    private translate: TranslateService) {
    this.idRow = 0;

    this.tablaPersonas = [];
    this.tablaIdentificacion = [];
  }

  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribePersona();
    this.subscribeIdentficacion();
  }

  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.columnasAdjuntos = [
        { field: 'id', header: this.translate.instant('CUMCO009.TABLA1.headerTabla0') },
        { field: 'codPer', header: this.translate.instant('CUMCO009.TABLA1.headerTabla1') },
        { field: 'tipPer', header: this.translate.instant('CUMCO009.TABLA1.headerTabla2') },
        { field: 'des', header: this.translate.instant('CUMCO009.TABLA1.headerTabla3') }
      ];
      this.columnasAdjuntosComunicacion = [
        { field: 'id', header: this.translate.instant('CUMCO009.TABLA2.headerTabla0') },
        { field: 'tipPer', header: this.translate.instant('CUMCO009.TABLA2.headerTabla1') },
        { field: 'codId', header: this.translate.instant('CUMCO009.TABLA2.headerTabla2') },
        { field: 'tipId', header: this.translate.instant('CUMCO009.TABLA2.headerTabla3') }
      ];

    });
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
      if(row.descripcion.toLowerCase() === this.rows[rowIndex].descripcion.toLowerCase() && row.id != this.rows[rowIndex].id){
        count = count + 1;
      }
      //count = count + (row.descripcion.toLowerCase() === this.rows[rowIndex].descripcion.toLowerCase() ? 1 : 0);
    })
    console.log(count);
    if (count >= 1) {
      this.rows[rowIndex].descripcion = '';
      const error = this.translate.instant('CUMCO009.MENSAJES.identificacionRepetida');
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
      if (persona.idDescripcion.toLowerCase().search(event.query.toLowerCase()) !== -1){
        this.tablaPersonasFiltro.push(persona);
      }
    }
  }

  searchTipoIdentificacion(event) {
    event = event === undefined || event === '' ? '' : event;
    this.tablaIdentificacionFiltro = [];
    for (let i = 0; i < this.tablaIdentificacion.length; i++) {
      let persona = this.tablaIdentificacion[i];
      if (persona.idDescripcion.toLowerCase().search(event.query.toLowerCase()) !== -1) {
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
        const error = this.translate.instant('CUMCO009.MENSAJES.falloGuardar');
        this.showMessage(error + ' ' + getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.translate.instant('CUMCO009.MENSAJES.exito');

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
        const error = this.translate.instant('CUMCO009.MENSAJES.falloGuardar');
        this.showMessage2(error + ' ' + getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.translate.instant('CUMCO009.MENSAJES.exito');
        if (!this.responseGuardar.status) {
          this.showMessage2(this.responseGuardar.message, "error");
        }
        else {
          this.subscribePersona();
          this.subscribeIdentficacion();
          if (this.seleccionPersona) {
            this.subscribeConfigurarPersona(this.seleccionPersona ? this.seleccionPersona.id : '', '');
          }
          this.showMessage2(this.responseGuardar.message, "success");
          this.showMessage2(exito, "success");
        }
      });
  }


  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
   
  // Metodos para Mostrar MENSAJES
  showMessage(det: string, sev: string) {
    this.msgs = [];
    this.msgs.push({severity: sev, summary: '', detail: det});

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  showMessage2(det: string, sev: string) {
    this.msgs2 = [];
    this.msgs2.push({severity: sev, summary: '', detail: det});

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  // Metodos para Ocultar MENSAJES
  hideMessage() {
    this.msgs = [];
    this.msgs2 = [];
  }

  // Metodos para Ocultar MENSAJES despues de un tiempo
  messageTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Metodos para Ocultar MENSAJES al hacer click (mousedouwn) en cualquier lado
  @HostListener('document:mousedown') clickDOM() {
    this.hideMessage();
  };


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
        const error = this.translate.instant('CUMCO009.MENSAJES.errorGuardar');
        this.showMessage2(error, "error");
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
      },
      {
        "name":"codigo",
        "type":"input",
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
          "editable": row.state === 'new' ? row.editable.toString() : row.editable,
          "codigo": this.generateCodigo(row.descripcion)
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

  generateCodigo(stringName: string): string {
    var codigo: string;
    const upperCase = stringName.toLocaleUpperCase();
    var splitted = upperCase.split(" ");
    if (splitted.length >= 4){
      codigo = splitted[0] + splitted[1] + splitted[2] + splitted[3];
    }
    else if (splitted.length === 3){
      if (splitted[0].length >= 2){
        codigo = splitted[0].substr(0, 2) + splitted[1] + splitted[2];
      }
      else{
        codigo = splitted[0] + splitted[1] + splitted[2];
      }
    }
    else if (splitted.length === 2){
      if (splitted[0].length >= 2 && splitted[1].length >= 2){
        codigo = splitted[0].substr(0, 2) + splitted[1].substr(0, 2);
      }
      else if(splitted[0].length >= 3){
        codigo = splitted[0].substr(0, 3) + splitted[1];
      }
      else{
        codigo = splitted[0] + splitted[1];
      }
    }
    else{
      if (splitted[0].length >= 4){
        codigo = splitted[0].substr(0, 4);
      }
      else{
        codigo = splitted[0];
      }
    }
    return codigo;

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
