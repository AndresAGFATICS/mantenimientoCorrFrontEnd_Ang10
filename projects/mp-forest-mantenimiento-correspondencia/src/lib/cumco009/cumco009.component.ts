import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cumco009Service } from './servicio/cumco009.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';
import { of } from 'rxjs';

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

  tablaPersonas: any[];
  initialData1: any[];
  initialStateData1 = true;


  tablaIdentificacion: any[];
  seleccionPersona: any;
  initialData2: any[];
  initialStateData2 = true;

  rows: any[] = [];
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
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 10;
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 10;
  pageTable2 = 0;




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
    this.subscribeIdentficacion('');
  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.columnasAdjuntos = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO009.TABLA1.headerTabla0') },
        { field: 'codigo', header: this.translate.instant('CUMCO009.TABLA1.headerTabla1') },
        { field: 'nombreTipoPersona', header: this.translate.instant('CUMCO009.TABLA1.headerTabla2'), required: true },
        { field: 'descripcion', header: this.translate.instant('CUMCO009.TABLA1.headerTabla3') }
      ];
      this.columnasAdjuntosComunicacion = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO009.TABLA2.headerTabla0') },
        { field: 'tipoPersona.nombreTipoPersona', header: this.translate.instant('CUMCO009.TABLA2.headerTabla1') },
        { field: 'id', header: this.translate.instant('CUMCO009.TABLA2.headerTabla2') },
        { field: 'descripcion', header: this.translate.instant('CUMCO009.TABLA2.headerTabla3'), required: true }
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
        
        if (this.initialStateData1) {
          this.initialData1 = [];
          for (const data of this.tablaPersonas) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateData1 = false;
        }


      });
  }

  subscribeIdentficacion(parameters: string) {
    this.cumco009Service.getIdentificacion(parameters).subscribe(

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

  subscribeGet(parameters: string): any {
    let responseTerceros
    this.cumco009Service.getTerceros(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        responseTerceros = getRes
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.showMessage2(getError.error.message, "error");
      },
      () => {                 // Fin del suscribe
        
        if(responseTerceros.length > 0){
          const error = this.translate.instant('CUMCO009.MENSAJES.errorIdentificacionTercero', {tipoIdentificacion: this.seleccionConfiguracion.descripcion});
          this.showMessage2(error, "error");
          return false;
        }
        else{
          this.rows.find(row => row === this.seleccionConfiguracion).state = this.seleccionConfiguracion.state === 'delete' ? 'edit' : 'delete';
        }
        return true;

      });
  }


  subscribeConfigurarPersona(clase: any, tipo: any) {
    this.cumco009Service.getConfigurarPersona(clase, tipo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.rows = [];
        getRes.forEach(res => {

          const codigoIentif = this.tablaIdentificacion.filter(iden => iden.id === res.id )

          this.rows.push({
            idRow: '',
            id: res.id,
            descripcion: res.descripcion,
            editable: res.editable,
            codigo: codigoIentif[0].codigo,
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
        if (this.initialStateData2) {
          this.initialData2 = [];
          for (const data of this.rows) {
            this.initialData2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateData2 = false;
        }
      });
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
          this.filtroTipoPersona = undefined;
          this.initialStateData1 = true;
          this.showMessage(this.responseGuardar.message, "success");
          this.showMessage(exito, "success");
          this.subscribePersona();
          this.subscribeIdentficacion('');
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
          this.initialStateData2 = true;
          this.filtroTipoIdentificacion = undefined;
          this.subscribePersona();
          this.subscribeIdentficacion('');
          if (this.seleccionPersona) {
            this.subscribeConfigurarPersona(this.seleccionPersona ? this.seleccionPersona.id : '', '');
          }
          this.showMessage2(this.responseGuardar.message, "success");
          this.showMessage2(exito, "success");
        }
      });
  }

  // Eventos Selecion Fila de la Tabla -- Eventos Selecion Fila de la Tabla
  // Eventos Selecion Fila de la Tabla -- Eventos Selecion Fila de la Tabla

  rowSelect() {
    if (this.seleccionPersona) {
      this.filtroTipoIdentificacion = undefined;
      this.initialStateData2 = true;
      this.subscribeConfigurarPersona(this.seleccionPersona ? this.seleccionPersona.id : '', '');
    } else {
      this.rows = [];
    }

  }

  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

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

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectTipoPersonaFilter(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialData1) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if(this.filtroTipoPersona){
      if (this.filtroTipoPersona.id !== undefined && this.filtroTipoPersona.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.filtroTipoPersona.id);
      }
      else{
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else{
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.tablaPersonas = filtered;

  }

  selectIdetnfificacionFilter(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialData2) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if(this.filtroTipoIdentificacion){
      if (this.filtroTipoIdentificacion.id !== undefined && this.filtroTipoIdentificacion.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.filtroTipoIdentificacion.id);
      }
      else{
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else{
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.rows = filtered;

  }

  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroPersona(){
    if(this.filtroTipoPersona){
      if (this.filtroTipoPersona.id === undefined || this.filtroTipoPersona.id === ''){
        this.filtroTipoPersona = undefined;
        this.selectTipoPersonaFilter('');
      }
    }
    else if (this.filtroTipoPersona === ''){
      this.filtroTipoPersona = undefined;
      this.selectTipoPersonaFilter('');
    }
  }

  focusOutFiltroTipoIdentificacion(){
    if(this.filtroTipoIdentificacion){
      if (this.filtroTipoIdentificacion.id === undefined || this.filtroTipoIdentificacion.id === ''){
        this.filtroTipoIdentificacion = undefined;
        this.selectIdetnfificacionFilter('');
      }
    }
    else if (this.filtroTipoIdentificacion === ''){
      this.filtroTipoIdentificacion = undefined;
      this.selectIdetnfificacionFilter('');
    }
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

 
  agregarClick() {
    if (this.seleccionPersona !== undefined) {
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
      this.rows = [...this.rows];

      const newPage = Math.trunc(this.rows.length/this.nRowsTable2) * this.nRowsTable2;
      this.pageTable2 = newPage;

    }
    
  }

  eliminarClick() {
    if(this.seleccionConfiguracion && this.seleccionConfiguracion.editable === 0){
      const error = this.translate.instant('CUMCO009.MENSAJES.errorEliminarFijo',
                    {tipoIdentificacion: this.seleccionConfiguracion.descripcion,
                     tipoPersona: this.seleccionConfiguracion.tipoPersona.nombreTipoPersona } );
      this.showMessage2(error, "error");
    }
    else if (this.seleccionConfiguracion && this.seleccionConfiguracion.state !== 'new') {
      this.subscribeGet('?page=1&size=1&idIdentificacion=' + this.seleccionConfiguracion.id.toString() );
    } else if (this.seleccionConfiguracion && this.seleccionConfiguracion.state === 'new') {
      let index = this.rows.indexOf(this.seleccionConfiguracion);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.seleccionConfiguracion = '';
    }
  }

  onGuardarColumna() {
    this.subcribeGuardarPersonas(this.buildJson());
  }

  onGuardarConfiguracion() {
    if(this.rows == undefined && this.rows.length == 0){
      return;
    }
    else if (this.seleccionPersona !== undefined) {
      if (!this.validarCampos()) {
        return;
      }
      else if (!this.validarTipoIndentificacionRepetida()) {
          return;
      } 
      else {
        this.subcribeGuardarIdentificacion(this.buildJsonConfiguracion());
      }
    }

  }

  onClickBorrarAutoComplete() {
    this.text = '';
  }

  onClicBorrarAutoCompletePersona() {
    this.filtroTipoPersona = undefined;
    this.selectTipoPersonaFilter('');
  }

  onClicBorrarAutoCompleteIdentificacion() {
    this.filtroTipoIdentificacion = undefined;
    this.selectIdetnfificacionFilter('');
  }

  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarCampos(): boolean {

    if(this.seleccionPersona.codigo === 'ANO'){

      let datos : any[];
      datos = [];
      for(var data of this.rows){
        if (data.state !== 'delete'){
          datos.push(data);
        }
      }

      if(datos.length > 1){
        const error = this.translate.instant('CUMCO009.MENSAJES.errorPersonaAnonima')
        this.showMessage2(error, "error");
        return false;
      }
      else if(datos[0].codigo !== 'ANO'){
        const error = this.translate.instant('CUMCO009.MENSAJES.errorPersonaAnonima')
        this.showMessage2(error, "error");
        return false;
      }
    }

    for (var _i = 0; _i < this.rows.length; _i++) {

      if (this.rows[_i].descripcion === '') {
        const error = this.translate.instant('CUMCO009.MENSAJES.errorCampoVacio',
          {
            filaVacia: String(_i + 1),
            campoVacio: this.translate.instant('CUMCO009.TABLA2.headerTabla3')
          });
        this.showMessage2(error, "error");
        return false;
      }
    }
    return true;
  }

  validarTipoIndentificacionRepetida(): boolean {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {
        if (this.rows[_k].descripcion.toLowerCase().trim() === this.rows[_i].descripcion.toLowerCase().trim() && this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO009.MENSAJES.identificacionRepetida2', 
                              {filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                               tipoIdentificacion: this.rows[_k].tipoIdentificacion})
          this.showMessage2(error, "error");
          return false;
        }
      }
    }

    for (var _i = 0; _i < this.rows.length; _i++) {

      for (var _k = 0; _k < this.tablaIdentificacion.length; _k++) {
        if(this.tablaIdentificacion[_k].descripcion.toLowerCase().trim() === this.rows[_i].descripcion.toLowerCase().trim() &&
            this.tablaIdentificacion[_k].id != this.rows[_i].id){
            const error = this.translate.instant('CUMCO009.MENSAJES.identificacionRepetida',
                          {tipoIdentificacion: this.tablaIdentificacion[_k].descripcion, 
                           tipoPersona: this.tablaIdentificacion[_k].tipoPersona.nombreTipoPersona });
            this.showMessage2(error, "error");
            return false;
        }
      }
    }
    return true;

  }


  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  editedPerson(rowIndex) {
    //this.tablaPersonas[rowIndex].state = 'edit';
    this.compareInitialData(this.tablaPersonas, this.initialData1);
  }

  editedIdentification(rowIndex, event) {

    //for (var _i = 0; _i < this.tablaIdentificacion.length; _i++) {
    //  if(this.tablaIdentificacion[_i].descripcion.toLowerCase().trim() === this.rows[rowIndex].descripcion.toLowerCase().trim() &&
    //     this.tablaIdentificacion[_i].id != this.rows[rowIndex].id){
    //      const error = this.translate.instant('CUMCO009.MENSAJES.identificacionRepetida',
    //                    {tipoIdentificacion: this.tablaIdentificacion[_i].descripcion, tipoPersona: this.tablaIdentificacion[_i].tipoPersona.nombreTipoPersona });
    //      this.showMessage2(error, "error");
    //      this.rows[rowIndex].descripcion = '';
    //      break;
    //  }
   // }
    this.compareInitialData(this.rows, this.initialData2);
  }

  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL
  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL

  compareInitialData(currentData: any[], initialData: any[]) {

    for (var _i = 0; _i < currentData.length; _i++) {

      if (currentData[_i].state === "edit" || currentData[_i].state === "noedit") {
        var keys = Object.keys(currentData[_i]);
        var initialDataValue = initialData.filter(obj => obj.id === currentData[_i].id);
        var areEqual = true;
        for (const key of keys) {
          if (typeof currentData[_i][key] === "object") {

            if (currentData[_i][key].id !== initialDataValue[0][key].id) {
              areEqual = false;
            }

          }
          else {
            if (currentData[_i][key] !== initialDataValue[0][key] && key !== "state") {
              areEqual = false;
            }
          }

        }
        if (areEqual) {
          currentData[_i].state = "noedit";
        }
        else {
          currentData[_i].state = "edit";
        }

      }
    }
  }

  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado
  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado

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

  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
   
  // Metodos para Mostrar MENSAJES
  showMessage(sum: string, sev: string) {
    this.msgs = [];
    this.msgs.push({severity: sev, summary: sum, detail: ''});

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  showMessage2(sum: string, sev: string) {
    this.msgs2 = [];
    this.msgs2.push({severity: sev, summary: sum, detail: ''});

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


  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar
  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar

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

  // Metodos para Generar el campo CODIGO para Guardar -- Metodos para Generar el campo CODIGO para Guardar
  // Metodos para Generar el campo CODIGO para Guardar -- Metodos para Generar el campo CODIGO para Guardar

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
  codigo: any;
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
