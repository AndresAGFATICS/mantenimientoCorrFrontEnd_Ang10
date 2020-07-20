import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Cumco006Service } from './servicio/cumco006.service';
import { TranslateService } from '@ngx-translate/core';
// import * as confJson from '../../assets/i18n/es.json';

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


  seleccionFestivo: Festivo;
  listaFestivo: Festivo[];

  seleccionCanal: any;
  listaCanal: any[];

  hora: any;

  horaCof: any;

  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumnsTraslations();
    this.subscribeRadicado();
    this.subscribeHoraCof();
    this.subscribeFestivo();
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
        // this.updateTablePersona();
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
      () => {                 // Fin del suscribe
        // this.updateTablePersona();
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
          this.subscribeRadicado();
          this.subscribeHoraCof();
          this.subscribeFestivo();
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
      const error = this.translate.instant('CUMCO006.MENSAJES.errorGuardar');
      this.showMessage(error, "error");
    } else if (this.validarHora(this.hora.horaInicial, this.hora.horaFinal) || this.validarHora(this.horaCof.horaInicial, this.horaCof.horaFinal)) {
      const error = this.translate.instant('CUMCO006.MENSAJES.errorHora');
      this.showMessage(error, "error");
    } else if (!this.validarRepetidos()) {
      const error = this.translate.instant('CUMCO006.MENSAJES.errorFecha') + ' ' + this.repetidos[0];
      this.showMessage(error, "error");
    } else {
      this.subcribeHorarioRadicacion(this.buildJson());
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
      "dat_ent_hora_fin": this.hora.horaFinal,
      "dat_ent_hora_ini": this.hora.horaInicial,
      "grd_festivos": JSON.stringify({
        fields,
        features
      }),
      "lst_canal": this.seleccionCanal.id.toString()
    };
  }

  camposValidos(): any {
    let valido = true;
    this.listaFestivo.forEach(festivo => {
      valido = valido && (festivo.fechaHabilitada === '' ? false : true
        && this.hora.horaInicial && this.hora.horaFinal);
    })
    return valido;
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
    let couples: string[] = [];
    let counter = {};
    this.repetidos = [];
    this.listaFestivo.forEach(festivo => {
      couples.push(festivo.fechaHabilitada);
    })

    couples.forEach(function(couple) {
      if (!counter[couple]) {
        counter[couple] = 0;
      }
      counter[couple] += 1;
    })

    for (var prop in counter) {
      if (counter[prop] >= 2) {
        this.repetidos.push(prop);
      }
    }
    return this.repetidos.length === 0 ? true : false;
  }

  edited(rowIndex) {
    this.listaFestivo[rowIndex].state = this.listaFestivo[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  desSelectRow() {
    this.seleccionFestivo = undefined;
  }

  actualizarHora() {
    this.subscribeHora(this.seleccionCanal.id);
  }

  showMessage(mensaje: string, severity: string) {
    window.scroll(0, 0);
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: mensaje });
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

export interface Festivo {
  idRow;
  id;
  fechaHabilitada;
  state;
}
