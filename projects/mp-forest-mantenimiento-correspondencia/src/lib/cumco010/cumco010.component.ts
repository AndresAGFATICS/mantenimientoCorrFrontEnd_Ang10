import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cumco010Service } from '../cumco010/servicio/cumco010.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
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

  columnasAdjuntos: any[];
  idRow: number;

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
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {


      this.columnasAdjuntos = [
        { field: 'id', header: this.translate.instant('CUMCO010.TABLA1.headerTabla0') },
        { field: 'mdd', header:this.translate.instant('CUMCO010.TABLA1.headerTabla1') },
        { field: 'act', header:this.translate.instant('CUMCO010.TABLA1.headerTabla2') }
      ];
    });
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
        const error = this.translate.instant('CUMCO010.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        const exito = this.translate.instant('CUMCO010.MENSAJES.exito');
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

      this.showMessage('error', this.translate.instant('CUMCO010.MENSAJES.identificacionRepetida',
                        {motivoDevolucion: this.rows[rowIndex].descripcion } ));
      this.rows[rowIndex].descripcion ='';

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
