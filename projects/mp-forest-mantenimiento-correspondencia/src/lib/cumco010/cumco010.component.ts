import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cumco010Service } from '../cumco010/servicio/cumco010.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco010',
  templateUrl: './cumco010.component.html',
  styleUrls: ['./cumco010.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO010Component implements OnInit {

  // Variables para los mensajes
  msgs: Message[] = [];

  tablaDevolucion: any[];
  filtroDevolucion: any[];
  seleccionFiltro: any;
  seleccionDevolucion: any;

  responseGuardar: any;
  rows: any[];
  initialData1: any[];
  initialStateData1 = true;


  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 15;
  pageTable1 = 0;

  columnasAdjuntos: any[];
  idRow: number;

  loading1: boolean;

  constructor(private cumco010Service: Cumco010Service,
    private messageService: MessageService,
    private translate: TranslateService) {

      this.idRow = 0;
    }

  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribePersona();

  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {


      this.columnasAdjuntos = [
        { field: 'rowIndex', header: this.translate.instant('CUMCO010.TABLA1.headerTabla0') },
        { field: 'descripcion', header:this.translate.instant('CUMCO010.TABLA1.headerTabla1'), required: true },
        { field: 'activo', header:this.translate.instant('CUMCO010.TABLA1.headerTabla2') }
      ];
    });
  }

  subscribePersona() {
    this.loading1 = true;
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
        this.loading1 = false;
      },
      () => {                 // Fin del suscribe

        if (this.initialStateData1) {
          this.initialData1 = [];
          for (const data of this.rows) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateData1 = false;
        }
        this.loading1 = false;
      });
  }

  subcribeGuardarPersonas(body: any) {
    this.cumco010Service.postGuardarPersonas(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.responseGuardar = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        
        let deleteData: any;
        for (var data of this.rows){
          if( data.state == 'delete'){
            deleteData = data;
            break;
          }

        }
        const error = 'El motivo de devolución \"' + deleteData.descripcion  + ' ,\" no puede ser eliminado ya que actualmente este se encuentra asociado a una o mas gestiones de devolución'
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.translate.instant('CUMCO010.MENSAJES.exito');
        this.showMessage(this.responseGuardar.message, "success");
        this.initialStateData1 = true;
        this.seleccionFiltro = undefined;
        this.subscribePersona();
      });
  }

  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

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

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectDevolucionFiltro(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialData1) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if(this.seleccionFiltro){
      if (this.seleccionFiltro.id !== undefined && this.seleccionFiltro.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.seleccionFiltro.id);
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

  focusOutFiltroDevolucion(){
    if(this.seleccionFiltro){
      if (this.seleccionFiltro.id === undefined || this.seleccionFiltro.id === ''){
        this.seleccionFiltro = undefined;
        this.selectDevolucionFiltro('');
      }
    }
    else if (this.seleccionFiltro === ''){
      this.seleccionFiltro = undefined;
      this.selectDevolucionFiltro('');
    }
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  agregarClick() {
    this.idRow += 1;

    let newElement = {
      idRow: this.idRow,
      id: '',
      activo: 1,
      descripcion: '',
      state: 'new'
    }
    this.rows = [...this.rows, newElement];
    this.idRow += 1;

    const newPage = Math.trunc(this.rows.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;

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

  onGuardarConfiguracion() {
    if(this.validForm()) {
      this.subcribeGuardarPersonas(this.buildJson());
    } 
    else {
      return;
    }

  }

  borrarFiltro() {
    this.seleccionFiltro = undefined;
    this.selectDevolucionFiltro('');
  }

  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  editedDevolucion(rowIndex) {
    this.compareInitialData(this.rows, this.initialData1);
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
 

  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validForm(): any {
    
    if(this.rows.some(row => row.descripcion === '')){
      this.showMessage('El campo "motivo de devolución" no puede estar vacío', "error");
      return false;
    }


    for(var _i = 0; _i < this.rows.length; _i++){
      let errIndex = _i + 1
      for (var _x = errIndex; _x < this.rows.length; _x++){
        if(this.rows[_i].descripcion.toLowerCase().trim() === this.rows[_x].descripcion.toLowerCase().trim()){
          const error = this.translate.instant('CUMCO010.MENSAJES.motivoDevolucionRepetidoError',
                        { filaRep1: String(_i + 1 ), filaRep2: String(_x + 1 ),
                          motivoDevolucion: this.rows[_i].descripcion
                        });
          this.showMessage(error, "error");
          return false;
        }
      }
    }


    if (this.seleccionFiltro) {

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
  
            if(this.rows[_i].descripcion.toLowerCase().trim() === filteredInitialData[_k].descripcion.toLowerCase().trim()){
              const error = this.translate.instant('CUMCO010.MENSAJES.tipoDevolucionRepetida',
                            { filaRep1: String(_i + 1 ),
                              motivoDevolucion: filteredInitialData[_k].descripcion
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

  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar
  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar

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

  
  // Metodos CHECKBOX  -- Metodos CHECKBOX
  // Metodos CHECKBOX  -- Metodos CHECKBOX

  onChangeActivo(rowIndex){
    this.compareInitialData(this.rows, this.initialData1);
  }


  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado
  // Metodos DETERMIANR COLOR FILA deacuerdo al estado -- Metodos DETERMIANR COLOR FILA deacuerdo al estado

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
