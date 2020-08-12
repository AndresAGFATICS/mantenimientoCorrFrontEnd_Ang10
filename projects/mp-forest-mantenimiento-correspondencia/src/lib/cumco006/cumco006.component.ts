import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Cumco006Service } from './servicio/cumco006.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

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
    private messageService: MessageService,
    private translate: TranslateService) {
    this.hora = {};
    this.horaCof = {};
  }
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

  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 10;


  seleccionFestivo: any;
  listaFestivo: any[];

  initialData1: any[];
  initialDataState = true;

  initialCanalHoraInicio: any;
  initialCanalHoraFin: any;
  initialCanalState = true;

  initialCOFHoraInicio: any;
  initialCOFHoraFin: any
  initialCOFaState = true;

  seleccionCanal: any;
  listaCanal: any[];

  hora: any;

  horaCof: any;

   // Variables para los mensajes
   msgs: Message[] = [];

  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    this.initialDataState = true;
    this.initialCanalState = true;
    this.initialCOFaState = true;
    this.seleccionCanal = undefined;


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumnsTraslations();
    this.subscribeRadicado();
    this.subscribeHoraCof();
    this.subscribeFestivo();
    this.actualizarHora();
  }

  subcribeSetColumnsTraslations() {
    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'id', header: this.translate.instant('CUMCO006.TABLA1.headerTabla0') },
        { field: 'fecha_festivo', header: this.translate.instant('CUMCO006.TABLA1.headerTabla1') }
      ];
    });
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
        this.listaCanal.push(undefined);
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
        if (this.initialCanalHoraFin){
          this.initialCanalHoraInicio = String(this.hora.horaInicial);
          this.initialCanalHoraFin = String(this.hora.horaFinal);
        }
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
      () => {         
                // Fin del suscribe
         if (this.initialDataState) {
          this.initialData1 = [];
          for (const data of this.listaFestivo) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialDataState = false;
        }
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

        const error = this.translate.instant('CUMCO006.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        if (!this.respuestaGuardarHorarioRadicado.status) {
          this.showMessage(this.respuestaGuardarHorarioRadicado.message, "error");
        }
        else {
          this.showMessage(this.respuestaGuardarHorarioRadicado.message, "success");
          this.ngOnInit();
          //this.subscribeRadicado();
          //this.subscribeHoraCof();
          //this.subscribeFestivo();
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
      return;
    } else if (this.seleccionCanal && this.validarHora(this.hora.horaInicial, this.hora.horaFinal) ) {
      const error = this.translate.instant('CUMCO006.MENSAJES.errorHoraCanal');
      this.showMessage(error, "error");
    }else if (this.validarHora(this.horaCof.horaInicial, this.horaCof.horaFinal)) {
      const error = this.translate.instant('CUMCO006.MENSAJES.errorHoraCOF');
      this.showMessage(error, "error");
    } else if (!this.validarRepetidos()) {
      return;
    } else {
      this.subcribeHorarioRadicacion(this.buildJson());
    }
  }

  buildJson(): any {
      let canalID;
      let horaInicial;
      let horaFinal;
      if (this.seleccionCanal){
        canalID = this.seleccionCanal.id.toString();
        horaInicial = this.hora.horaInicial;
        horaFinal = this.hora.horaFinal;
      }
      else{
        canalID = '';
        horaInicial = '';
        horaFinal = '';
      }



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
      "dat_ent_hora_fin": horaFinal,
      "dat_ent_hora_ini": horaInicial,
      "grd_festivos": JSON.stringify({
        fields,
        features
      }),
      "lst_canal": canalID
    };
  }

  camposValidos(): any {

    console.log(this.horaCof.horaInicial);
    if(this.seleccionCanal !== undefined){
      if(this.hora.horaInicial == undefined || this.hora.horaInicial == '' || this.hora.horaInicial == null){
        const error = this.translate.instant('CUMCO006.MENSAJES.errorHoraInicialCanal');
        this.showMessage(error, "error");
        return false;
      }
      else if (this.hora.horaFinal == undefined || this.hora.horaFinal == '' || this.hora.horaInicial == null){
        const error = this.translate.instant('CUMCO006.MENSAJES.errorHoraFinCanal');
        this.showMessage(error, "error");
        return false;
      }
    }
    else if(this.horaCof.horaInicial == null || this.horaCof.horaInicial == '' || this.horaCof.horaInicial == undefined ){
      const error = this.translate.instant('CUMCO006.MENSAJES.errorHoraInicialCOF');
      this.showMessage(error, "error");
      return false;
    }
    else if(this.horaCof.horaFinal == null || this.horaCof.horaFinal == '' || this.horaCof.horaFinal == undefined ){
      const error = this.translate.instant('CUMCO006.MENSAJES.errorHoraFinlCOF');
      this.showMessage(error, "error");
      return false;
    }
    else{
      for (var _i = 0; _i < this.listaFestivo.length; _i++) {

        if (this.listaFestivo[_i].fechaHabilitada === '' || !this.listaFestivo[_i].fechaHabilitada) {
          const error = this.translate.instant('CUMCO006.MENSAJES.campoFechaVacioErro',
            {
              filaVacia: String(_i + 1),
            });
          this.showMessage(error, "error");
          return false;
        }
  
      }
    }

    return true;
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

    for (var _i = 0; _i < this.listaFestivo.length; _i++) {
      for (var _k = _i + 1; _k < this.listaFestivo.length; _k++) {

        if (this.listaFestivo[_i].state !== 'delete' && this.listaFestivo[_k].state !== 'delete') {

          if (this.listaFestivo[_k].fechaHabilitada == this.listaFestivo[_i].fechaHabilitada) {
            const error = this.translate.instant('CUMCO006.MENSAJES.repetidosFechaError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                fecha: this.listaFestivo[_k].fechaHabilitada
              });
            this.showMessage(error, "error");
            return false;
          }

        }

      }
    }
    return true;
  }

  edited(rowIndex) {
    //this.listaFestivo[rowIndex].state = this.listaFestivo[rowIndex].state === 'new' ? 'new' : 'edit';
    this.compareInitialData(this.listaFestivo,this.initialData1);
  }

  desSelectRow() {
    this.seleccionFestivo = undefined;
  }

  actualizarHora() {
    if(this.seleccionCanal){
      this.initialCanalHoraInicio = true;
      this.subscribeHora(this.seleccionCanal.id);
    }
    else{
      this.hora.horaInicial = '';
      this.hora.horaFinal = '';
    }
    
  }

  getColorCanalIni(){
    if(this.initialCanalHoraInicio !== this.hora.horaInicial){
      return { 'background-color': '#E3B778' };
    }
    else{
      return { };
    }
  }

  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL
  // Metodos COMPARACION ESTADO INICIAL y ACTUAL -- Metodos COMPARACION ESTADO INICIAL y ACTUAL

  compareInitialData(currentData: any[], initialData: any[]) {

    console.log(currentData);
    console.log(initialData);

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
