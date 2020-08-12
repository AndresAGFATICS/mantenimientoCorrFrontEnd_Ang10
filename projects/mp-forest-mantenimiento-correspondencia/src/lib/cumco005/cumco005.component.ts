import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AnexosFisicosClaseService } from './servicio/anexos-fisicos-clase.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco005',
  templateUrl: './cumco005.component.html',
  styleUrls: ['./cumco005.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco005Component implements OnInit {

  // Variables para los mensajes
  msgs: Message[] = [];

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

  rowIndex = 0;

  rows: any[];
  initialData1: any[];
  initialStateData1 = true;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 15;

  cols: any[];

  selectedRow: any;

  tipoDeRadicado: any[];


  constructor(private anexosFisicosClaseService: AnexosFisicosClaseService,
    private messageService: MessageService,
    private translate: TranslateService) {
    this.cols = [
      { field: 'id', header: '' },
      { field: 'claseAnexo.descripcion', header: 'Tipo de Anexo Físico' },
      { field: 'tipoAnexoFisico.descripcion', header: 'Anexo Físico' },
      { field: 'observacion', header: 'Descripción' },
      { field: 'isCarpeta', header: 'Ubicar Folios en Carpetas' }
    ];

  }

  ngOnInit() {
    this.rows = [];
    // this.anexosFisicos = [];
    // this.tipoAnexoFisicos = [];
    this.buttonDisabled = false;
    this.idRow = 0;

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribeCodigoDescripcion('', '');
    this.subscribeAnexosFisicos();
    this.subscribeTipoAnexoFisico();

  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.cols = [
        { field: 'id', header: this.translate.instant('CUMCO005.TABLA1.headerTabla0') },
        { field: 'claseAnexo.descripcion', header: this.translate.instant('CUMCO005.TABLA1.headerTabla1') },
        { field: 'tipoAnexoFisico.descripcion', header: this.translate.instant('CUMCO005.TABLA1.headerTabla2') },
        { field: 'observacion', header: this.translate.instant('CUMCO005.TABLA1.headerTabla3') },
        { field: 'isCarpeta', header: this.translate.instant('CUMCO005.TABLA1.headerTabla4') }
      ];
    });
  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

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
          this.anexosFisicos = this.anexosFisicos.filter(val => val.descripcion.toLowerCase().includes(this.filtroAnexo.toLowerCase()));
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

        const error = this.translate.instant('CUMCO005.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        if( this.responseGuardar.message.search("repetidos para diferentes Tipos de Anexos") !== -1 ) {
          this.showMessage(this.responseGuardar.message, "error");
        }
        else if( this.responseGuardar.message.search("no puede ser eliminado: Se encuentra asociado") !== -1 ){
          this.showMessage(this.responseGuardar.message, "error");
        }
        else{
          this.showMessage(this.responseGuardar.message, "success");
          this.initialStateData1 = true;
          this.subscribeCodigoDescripcion('', '');
        }

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
          this.tipoAnexoFisicos = this.tipoAnexoFisicos.filter(val => val.descripcion.toLowerCase().includes(this.filtroTipoAnexo.toLowerCase()));
        }
      });
  }

  subscribeCodigoDescripcion(clase: any, tipo: any) {
    let response: any[];
    this.anexosFisicosClaseService.getCodigoDescripcion(clase, tipo).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {   // Fin del suscribe
        this.rows = [];
        for (const data of response) {
          data.isCarpeta = data.tipoAnexoFisico.isCarpeta;
          this.rows.push({ ...data, state: 'noedit'} );
        }

        if (this.initialStateData1) {
          this.initialData1 = [];
          for (const data of this.rows) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateData1 = false;
        }

      });

  }


  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchTipoanexo(event) {
    this.selectedRow = undefined;
    this.filtroTipoAnexo = event.query;
    this.subscribeTipoAnexoFisico();
  }

  searchAnexo(event) {
    this.selectedRow = undefined;
    this.filtroAnexo = event.query;
    this.subscribeAnexosFisicos();

  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectFilter(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialData1) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if(this.seleccionTipoAnexoFisicos){
      if (this.seleccionTipoAnexoFisicos.id !== undefined && this.seleccionTipoAnexoFisicos.id !== '') {
        filtered = copyInitialData.filter(data => data.claseAnexo.id === this.seleccionTipoAnexoFisicos.id);
      }
      else{
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else{
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    let filtered2: any[] = [];
    if(this.seleccionAnexoFisicos){
      if (this.seleccionAnexoFisicos.id !== undefined && this.seleccionAnexoFisicos.id !== '') {
        filtered2 = filtered.filter(data => data.tipoAnexoFisico.id === this.seleccionAnexoFisicos.id);
      }
      else{
        filtered2 = filtered;
      }
    }
    else{
      filtered2 = filtered;
    }

    this.rows = filtered2;

  }

  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroTipoAnexo(){
    if(this.seleccionTipoAnexoFisicos){
      if (this.seleccionTipoAnexoFisicos.id === undefined || this.seleccionTipoAnexoFisicos.id === ''){
        this.seleccionTipoAnexoFisicos = undefined;
        this.selectFilter('');
      }
    }
    else if (this.seleccionTipoAnexoFisicos === ''){
      this.seleccionTipoAnexoFisicos = undefined;
      this.selectFilter('');
    }
  }

  focusOutFiltroAnexoFisico(){
    if(this.seleccionAnexoFisicos){
      if (this.seleccionAnexoFisicos.id === undefined || this.seleccionAnexoFisicos.id === ''){
        this.seleccionAnexoFisicos = undefined;
        this.selectFilter('');
      }
    }
    else if (this.seleccionAnexoFisicos === ''){
      this.seleccionAnexoFisicos = undefined;
      this.selectFilter('');
    }
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClickElminiarSelected(){
    this.selectedRow = undefined;
  }

  onClicBorrarAutoCompleteTipo() {
    this.seleccionTipoAnexoFisicos = undefined;
    this.selectFilter('');
  }

  onClicBorrarAutoCompleteAnexo() {
    this.seleccionAnexoFisicos = undefined;
    this.selectFilter('');
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
        id: '',
        descripcion: '',
        codigo: ''
      },
      claseAnexo: {
        id: '',
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

  onGuardarColumna() {
    if (!this.camposValidos()) {
      return;
    } 
    else if (!this.validarAnexoRepetidoTipo()) {
      return;
    }
    else if (!this.validarAnexoFisicoRepetidos()) {
        return;
    } 
    else {
      this.subcribeRecorridoRepartoFisico(this.buildJson());
    }
  }
  

  // Eventos CHECHBOX de los CHECHBOX -- Eventos CHECHBOX de los CHECHBOX
  // Eventos CHECHBOX de los CHECHBOX -- Eventos CHECHBOX de los CHECHBOX


  checkBox(index) {
    this.rows[index].isCarpeta = this.rows[index].claseAnexo.id === 2 ? 0 : this.rows[index].isCarpeta;
  }




  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas


  camposValidos(): any {
    let valido = true;

    for(var _i = 0; _i < this.rows.length; _i++){
      let errIndex = _i + 1;

      if (this.rows[_i].claseAnexo.descripcion === ''){
        const error = this.translate.instant('CUMCO005.MENSAJES.campoFilaVacioError',
        { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO005.TABLA1.headerTabla1') } );
        this.showMessage(error ,'error');
        valido = false;
      }
      else if (this.rows[_i].tipoAnexoFisico.descripcion === ''){
        const error = this.translate.instant('CUMCO005.MENSAJES.campoFilaVacioError',
        { filaVacia: errIndex, campoVacio: this.translate.instant('CUMCO005.TABLA1.headerTabla2') } );
        this.showMessage(error ,'error');
        valido = false;
      }
    }

    return valido;
  }

  validarAnexoRepetidoTipo(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {

        if (this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {

          if (this.rows[_k].claseAnexo.id == this.rows[_i].claseAnexo.id &&
            this.rows[_k].tipoAnexoFisico.id == this.rows[_i].tipoAnexoFisico.id) {
            const error = this.translate.instant('CUMCO005.MENSAJES.repetidosTipoAnexoFisicoError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                tipoAnexo: this.rows[_k].claseAnexo.descripcion,
                anexoFisico: this.rows[_k].tipoAnexoFisico.descripcion
              });
            this.showMessage(error,"error");
            return false;
          }

        }

      }
    }


    if (this.seleccionTipoAnexoFisicos || this.seleccionAnexoFisicos) {

      var filteredInitialData = [];

      for (const iniData of this.initialData1) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.rows.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.rows.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.rows[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].claseAnexo.id == this.rows[_i].claseAnexo.id &&
              filteredInitialData[_k].tipoAnexoFisico.id == this.rows[_i].tipoAnexoFisico.id) {
  
              const error = this.translate.instant('CUMCO005.MENSAJES.repetidosTipoAnexoFisicoFiltradoError',
                {
                  filaRep1: String(_i + 1),
                  tipoAnexo: filteredInitialData[_k].claseAnexo.descripcion,
                  anexoFisico: filteredInitialData[_k].tipoAnexoFisico.descripcion
                });
              this.showMessage(error, "error");
              return false;
            }
  
          }
        }
      }

    }


    return true;

  }

  validarAnexoFisicoRepetidos(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {

        if (this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {

          if (this.rows[_k].claseAnexo.id !== this.rows[_i].claseAnexo.id &&
            this.rows[_k].tipoAnexoFisico.id == this.rows[_i].tipoAnexoFisico.id) {
            const error = this.translate.instant('CUMCO005.MENSAJES.repetidosAnexoFisicoError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                anexoFisico: this.rows[_k].tipoAnexoFisico.descripcion
              });
            this.showMessage(error,"error");
            return false;
          }

        }

      }
    }


    if (this.seleccionTipoAnexoFisicos || this.seleccionAnexoFisicos) {

      var filteredInitialData = [];

      for (const iniData of this.initialData1) {
        if(iniData.state !== 'new'){
          let isData = [];
          isData =  this.rows.filter(data => data.id === iniData.id);
          if(isData.length === 0){
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.rows.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {
  
          if (this.rows[_i].state !== 'delete' && filteredInitialData[_k].state !== 'delete') {
  
            if (filteredInitialData[_k].claseAnexo.id !== this.rows[_i].claseAnexo.id &&
              filteredInitialData[_k].tipoAnexoFisico.id == this.rows[_i].tipoAnexoFisico.id) {
  
              const error = this.translate.instant('CUMCO005.MENSAJES.repetidosAnexoFisicoFiltroError',
                {
                  filaRep1: String(_i + 1),
                  anexoFisico: filteredInitialData[_k].tipoAnexoFisico.descripcion
                });
              this.showMessage(error, "error");
              return false;
            }
  
          }
        }
      }

    }

    return true;

  }

  


  // Metodos EDICION de Tablas -- Metodos EDICION de Tablass
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  edited(rowIndex) {
    //this.rows[rowIndex].state = this.rows[rowIndex].state === 'new' ? 'new' : 'edit';
    this.compareInitialData(this.rows, this.initialData1);
  }


  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL
  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL

  compareInitialData(currentData: any[], initialData: any[]){
    console.log(currentData);
    console.log(initialData);
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
        "name": "UBICARPETA",
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
            "UBICARPETA": row.isCarpeta
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
            "UBICARPETA": row.isCarpeta
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