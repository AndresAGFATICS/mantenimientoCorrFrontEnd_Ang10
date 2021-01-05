import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

// Importación de servicios
import { TerritorialActivaService } from './servicio/territorial-activa.service'
import { TranslateService } from '@ngx-translate/core';


// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';
import { ɵangular_packages_router_router_n } from '@angular/router';


@Component({
  selector: 'app-cumco012',
  templateUrl: './cumco012.component.html',
  styleUrls: ['./cumco012.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO012Component implements OnInit {

  // Variables para los mensajes
  msgs: Message[] = [];

  mensaje: string;
  // Variables de texto

  enableDelete = false;


  // Variable para habilitar botones
  buttonDisabled = true;
  // Formulario a Guardar


  // Variables de los autocompletables
  textAutoComlpeteOrganismoConfigurar: any;


  suggestionsAutoCompleteOrganismoConfigurar: string[];
  suggestionsAutoCompleteRecorridos: string[];

  // Variables de los srevicios
  responseTerritorial: any;
  responseRecorridos: any[];

  // Array que contiene las filas de la tabla
  rows: any[];

  // Headers de la tabla
  cols: any[];

  initialDataStateTable1 = true;
  initialData1: any[];
  //
  horaFinAnterior: string;
  horaInicioAnterio: string;

  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 15;

  //
  body: Body;

  rowIndex = 0;
  selectedRow: any;
  responsePost: any;
  pageTable1 = 0;

  Idindex = 0;
  loading1: boolean;

  constructor(
    private territorialActivaService: TerritorialActivaService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {

    this.textAutoComlpeteOrganismoConfigurar = '';
    this.suggestionsAutoCompleteOrganismoConfigurar = [];
    this.suggestionsAutoCompleteRecorridos = [];
    this.responseTerritorial = [];
    this.responseRecorridos = [];

    this.rows = [];

  }



  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    this.Idindex = 0;
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    // Obteniendo las opciones de Organismo a configurar
    this.subcribeServiceTiporadicado('');
  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'id', header: this.translate.instant('CUMCO012.TABLA1.headerTabla0') },
        { field: 'nombreRecorrido', header: this.translate.instant('CUMCO012.TABLA1.headerTabla1'), required: true },
        { field: 'horaInicio', header: this.translate.instant('CUMCO012.TABLA1.headerTabla2'), required: true },
        { field: 'horaFin', header: this.translate.instant('CUMCO012.TABLA1.headerTabla3'), required: true },
        { field: 'activo', header: this.translate.instant('CUMCO012.TABLA1.headerTabla4') },
      ];
    });
  }



  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES  

  // Metodos para Mostrar MENSAJES
  showMessage(sum: string, sev: string) {
    this.msgs = [];
    this.msgs.push({ severity: sev, summary: sum, detail: '' });

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

  subcribeServiceReparto(parameters) {
    this.loading1 = true;
    let getResponse: any[];
    this.territorialActivaService.getRecorridoRepartoFisico(parameters).subscribe(

        (getRes: any[]) => {     // Inicio del suscribe
          getResponse = getRes;
          return getRes;
        },
        getError => {           // Error del suscribe
          console.log('GET call in error', getError);
          this.loading1 = false;
        },
        () => {                // Fin del suscribe
          //this.updateTable(this.responseRecorridos);
          this.Idindex = 0;
          this.rows = [];
          for (const data of getResponse) {
            //const index = this.rows.indexOf(selectedRow);
            this.rows.push({ ... data, state: 'noedit'});
          }

          if (this.initialDataStateTable1) {
            this.initialData1 = [];
            for (const data of this.rows) {
              this.initialData1.push(JSON.parse(JSON.stringify(data)));
            }
            this.initialDataStateTable1 = false;
          }
          this.loading1 = false;

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
          this.suggestionsAutoCompleteOrganismoConfigurar.push(data);
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
        if (!this.responsePost.status) {
          this.showMessage(this.responsePost.message, "error");
        }
        else {
          this.showMessage(this.responsePost.message, "success");
          this.Idindex = 0;
          const exito = this.translate.instant('CUMCO012.MENSAJES.exito');
          this.showMessage(exito, "success");
          this.subcribeServiceTiporadicado('');
          this.initialDataStateTable1 = true;
          this.getTableInfo();
        }
      });
  }




  quitarNew() {
    for (var _i = 0; _i < this.rows.length; _i++) {
      if (this.rows[_i].state === 'new' || this.rows[_i].state === 'edited') {
        this.rows[_i].state = 'noedited'
      }

    }
  }




  search(event) {
    this.subcribeServiceTiporadicado('?codigoNombre=' + event.query);
  }

  getTableInfo() {
    this.initialDataStateTable1 = true;
    this.subcribeServiceReparto( String(this.textAutoComlpeteOrganismoConfigurar.id) );
    this.buttonDisabled = false;
  }

  onClicBorrarAutoComplete() {
    this.rows = [];
    this.textAutoComlpeteOrganismoConfigurar = '';
  }

  onClicAgregar() {
    let lastHour = '';
    if (this.rows.length !== 0) {
      if (!this.rows[this.rows.length - 1].horaFin) {
        const error = this.translate.instant('CUMCO012.MENSAJES.ingresarHoraFinal');
        this.showMessage(error, "error");
        return;
      }
      lastHour = this.rows[this.rows.length - 1].horaFin;
    }

    let rows = [...this.rows];

    rows.push({
      idIndex: this.Idindex,
      id: '',
      nombreRecorrido: '',
      horaInicio: this.addOneMinute(lastHour),
      horaFin: '',
      activo: '1',
      state: 'new'
    });

    this.Idindex = this.Idindex + 1;
    this.rows = rows;

    const newPage = Math.trunc(this.rows.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;
  }

  guardarHora(index: number) {
    //console.log(this.rows[index].horaInicio);
    this.horaInicioAnterio = this.rows[index].horaInicio
  }

  validarHora(index: number) {
    if( index > 0 ){
      const error = this.translate.instant('CUMCO012.MENSAJES.errorIngresoHoraInicial', {recorrido: this.rows[index].nombreRecorrido, horaInicio: this.horaInicioAnterio});
      this.showMessage(error, "error");
      this.rows[index].horaInicio = this.horaInicioAnterio;
    }

    this.edited('');
   
  }

  modificarHora(index: number){
    if( index !==  this.rows.length - 1){
      this.rows[index+1].horaInicio = this.addOneMinute(this.rows[index].horaFin);
    }
    this.edited('');
  }

  onClicEliminar() {

    if (this.selectedRow) {
      if (this.selectedRow.state === 'new') {
        let index = this.rows.indexOf(this.selectedRow);
        this.rows = this.rows.filter((val, i) => i !== index);
      } else if (this.enableDelete) {
        // mostar mensaje
        this.rows.find(row => row === this.selectedRow).state = this.selectedRow.state === 'delete' ? 'edit' : 'delete';
      this.edited('');
      }else{
        const error = this.translate.instant('CUMCO012.MENSAJES.eliminarFallido1') +
          this.selectedRow.nombreRecorrido + this.translate.instant('CUMCO012.MENSAJES.eliminarFallido2');
        this.showMessage(error, "error");
      }

    }


  }

  onGuardarColumna() {
    if(!this.validarVacio()){

    }
    else if (!this.validarNombres()) {
      return;
    }else if(!this.validarHoras()){
      return;
    } 
    else {
      let body = this.generateJsonBody();
      if (body) {
        this.subcribeRecorridoRepartoFisico(body);
      }
      else {
        return;
      }
    }

  }

  validarVacio(){

    for (var _i = 0; _i < this.rows.length;_i++){
      if (!this.rows[_i].nombreRecorrido || this.rows[_i].nombreRecorrido === ''){
        const error = this.translate.instant('CUMCO012.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO012.TABLA1.headerTabla1') });
        this.showMessage(error, "error");
        return false;
      }
      else if(!this.rows[_i].horaInicio || this.rows[_i].horaInicio === ''){
        const error = this.translate.instant('CUMCO012.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO012.TABLA1.headerTabla2') });
        this.showMessage(error, "error");
        return false;
      }
      else if(!this.rows[_i].horaFin || this.rows[_i].horaFin === ''){
        const error = this.translate.instant('CUMCO012.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO012.TABLA1.headerTabla3') });
        this.showMessage(error, "error");
        return false;
      }

    }

    return true;

  }

  generateJsonBody(): any {
    let fields = [
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
    
        features.push({
          "attributes": {
            "nombreRecorrido": row.nombreRecorrido,
            "horaInicio": row.horaInicio,
            "horaFin": row.horaFin,
            "activo": row.activo,
            "dependenciaTerritorial.codigo": this.textAutoComlpeteOrganismoConfigurar.id,
            "dependenciaTerritorial.dependenciasHijas": "",
            "dependenciaTerritorial.fechaFinVigencia": "",
            "dependenciaTerritorial.fechaInicioVigencia": "",
            "dependenciaTerritorial.id": "",
            "dependenciaTerritorial.listaFuncionarios": "",
            "dependenciaTerritorial.nombre": "",
            "dependenciaTerritorial.nombreCodigo": "",
            "id": row.id,
            "dependenciaTerritorial.codigoGestion": "",
            "dependenciaTerritorial.idTercero": "",
            "dependenciaTerritorial.nombreCodigoGuion": ""
          },
          "state": row.state

        })

      
    })

    if (features.length === 0) {
      return false;
    }
    else {
      return {
        grd_reparto_fisico: JSON.stringify({
          fields,
          features
        })
      }
    }

  }

  validarNombres(): boolean {
    for (var _i = 0; _i < this.rows.length; _i++){
      for (var _k = _i+1; _k < this.rows.length; _k++){
        if (this.rows[_k].nombreRecorrido.toLowerCase().trim() === this.rows[_i].nombreRecorrido.toLowerCase().trim()){
          const error = this.translate.instant('CUMCO012.MENSAJES.tipoNombreRecorridoRepetidosError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), recorrido: this.rows[_k].nombreRecorrido });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }
    return true;
  }

  validarHoras(): boolean {
    for (var _i = 0; _i < this.rows.length; _i++){
      let hora_ini = parseInt( this.rows[_i].horaInicio[0] + this.rows[_i].horaInicio[1] + this.rows[_i].horaInicio[3] + this.rows[_i].horaInicio[4]);
      let hora_fin = parseInt( this.rows[_i].horaFin[0] + this.rows[_i].horaFin[1] + this.rows[_i].horaFin[3] + this.rows[_i].horaFin[4]);
      if (hora_ini >= hora_fin){
          const error = this.translate.instant('CUMCO012.MENSAJES.horaMayorError', {filaRep1: _i + 1});
                      this.showMessage(error, "error");
        return false;
      }
    }
    return true;

  }

  edited(rowIndex) {
    //this.rows[rowIndex].state = 'edit';
    this.compareInitialData(this.rows, this.initialData1);
  }


  compareInitialData(currentData: any[], initialData: any[]){

    for (var _i = 0; _i < currentData.length; _i++){

      if (currentData[_i].state === "edit" || currentData[_i].state === "noedit")  {
        var keys = Object.keys(currentData[_i]);
        var initialDataValue = initialData.filter(obj => obj.id === currentData[_i].id);
        var areEqual = true;
        for (const key of keys){
          if (typeof currentData[_i][key] === "object"){

            if (currentData[_i][key].id !== initialDataValue[0][key].id){
              areEqual = false;
            }

          }
          else{
            if (currentData[_i][key] !== initialDataValue[0][key] && key !== "state" ) {
              areEqual = false;
            }
          }

        }
        if (areEqual){
          currentData[_i].state = "noedit";
        }
        else{
          currentData[_i].state = "edit";
        }

      }
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


// document.getElementsByName('groupname')[0].hidden = false