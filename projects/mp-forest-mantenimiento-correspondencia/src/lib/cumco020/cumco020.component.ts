import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

import { HostListener } from '@angular/core';

import { Cumco020Service } from './servicio/cumco020.service';

// Importacion Modulo de Para el Traslate
import { TranslateService } from '@ngx-translate/core';

import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-cumco020',
  templateUrl: './cumco020.component.html',
  styleUrls: ['./cumco020.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class Cumco020Component implements OnInit {
  responseGuardarPlantilla: any;


  constructor(private cumco020Service: Cumco020Service,
    private messageService: MessageService,
    private translate: TranslateService) {
  }


  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];


  //autocomplete 1 Proceso
  seleccionProcesoFilter: any;
  dataProcesoFilter: any[];
  suggestionsProcesoFilter: any[];

  //autocomplete 2 Procedimiento
  seleccionProcedimientoFilter: any;
  dataProcedimientoFilter: any[];
  suggestionsProcedimientoFilter: any[];

  //autocomplete 3 Procedimiento
  seleccionDependenciaFilter: any;
  dataDependenciFilter: any[];
  suggestionsDependenciaFilter: any[];


  //autocomplete 4 Procedimiento
  seleccionProcedimientoFilter2: any;
  dataProcedimientoFilter2: any[];
  suggestionsProcedimientoFilter2: any[];



  //TABLA 1
  cols: any[];
  dataTable1: any[];
  initialDataTable1: any[];
  initialStateDataTable1 = true;
  selectedRowTable1: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 5;
  idRow1 = 0;
  pageTable1 = 0;

  //TABLA 2
  cols2: any[];
  dataTable2: any[];
  initialDataTable2: any[];
  initialStateDataTable2 = true;
  selectedRowTable2: any;
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 5;
  idRow2 = 0;
  allProcedimientosRelacionados: any[];
  pageTable2 = 0;

  //TABLA 3
  cols3: any[];
  dataTable3: any[];
  initialDataTable3: any[];
  initialStateDataTable3 = true;
  selectedRowTable3: any;
  nRowsOptionsTable3 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable3 = 5;
  idRow3 = 0;
  pageTable3 = 0;

  //TABLA 4
  cols4: any[];
  dataTable4: any[];
  initialDataTable4: any[];
  initialStateDataTable4 = true;
  selectedRowTable4: any;
  nRowsOptionsTable4 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable4 = 5;
  idRow4 = 0;
  pageTable4 = 0;




  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');
    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumnsTraslations();

    this.subscribeGetProcesoSGS('');

    this.subscribeGetProcedimientoSGS2('');

    this.subcribeGetOrganismoDependencia('');


  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  // SUSCRIBIRSE para Obtener los valores de los headers de la tabla
  subcribeSetColumnsTraslations() {

    this.translate.get(['']).subscribe(translations => {
      this.cols = [
        { field: 'ID', header: this.translate.instant('CUMCO020.TABLA1.headerTabla0') },
        { field: 'plantilla.codigo', header: this.translate.instant('CUMCO020.TABLA1.headerTabla1') },
        { field: 'tipoRadicado.codigoDescripcion', header: this.translate.instant('CUMCO020.TABLA1.headerTabla2') },
        { field: 'tramiteTipoRadicado.descripcion', header: this.translate.instant('CUMCO020.TABLA1.headerTabla3') },
        { field: 'tipoDocumental.codigoDescripcion', header: this.translate.instant('CUMCO020.TABLA1.headerTabla4') },
      ];

      this.cols2 = [
        { field: 'RowIndex', header: '' },
        { field: 'codigo', header: this.translate.instant('CUMCO020.TABLA2.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO020.TABLA2.headerTabla2') },
        { field: 'claseDocumental.descripcion', header: this.translate.instant('CUMCO020.TABLA2.headerTabla3') },
        { field: 'claseDocumental.descripcion', header: this.translate.instant('CUMCO020.TABLA2.headerTabla4') },
        { field: 'claseDocumental.descripcion', header: this.translate.instant('CUMCO020.TABLA2.headerTabla5') }
      ];

      this.cols3 = [
        { field: 'RowIndex', header: '' },
        { field: 'codigoNombre', header: this.translate.instant('CUMCO020.TABLA3.headerTabla1') }
      ];

      this.cols4 = [
        { field: 'RowIndex', header: '' },
        { field: 'codigoNombre', header: this.translate.instant('CUMCO020.TABLA4.headerTabla1') }
      ];

    });

  }

  subscribeGetProcesoSGS(parameters: string) {

    let response: any[];
    this.cumco020Service.getProcesoSGS(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable1 = [];
        this.dataProcesoFilter = [];
        for (const data of response) {
          this.dataTable1.push({ ...data, state: 'noedit' });
          this.dataProcesoFilter.push({ ...data, codigoNombre: data.codigo + ' - ' + data.nombre });
        }

        if (this.initialStateDataTable1) {
          this.initialDataTable1 = [];
          for (const data of this.dataTable1) {
            this.initialDataTable1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable1 = false;
        }

      })

  }


  subscribeGetRelacionProcesoDependencia(parameters: string) {

    let response: any[];
    this.cumco020Service.getRelacionProcesoDependencia(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        if (response.length > 0) {
          var names = '';
          for (var resp of response) {
            names = names + resp.dependencia.nombre + ', ';
          }

          const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcesoDependenciaError',
            {
              proceso: this.selectedRowTable1.codigo + ' - ' + this.selectedRowTable1.nombre,
              nombresDependencia: names
            });
          this.showMessage("error", error, '');
          return;
        }
        else {
          this.dataTable1.find(row => row === this.selectedRowTable1).state = this.selectedRowTable1.state === 'delete' ? 'edit' : 'delete';
          this.editedTable1('');
        }

      })

  }

  subcribePostProcesoSGS(body: any) {
    var respuestaPost;
    this.cumco020Service.postProcesoSGS(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO020.MENSAJES.falloGuardar');
        this.showMessage("error", error, '');
      },
      () => {                 // Fin del suscribe
        this.onClicBorrarDependenciaFilter();
        this.seleccionProcesoFilter = undefined;
        this.suggestionsProcedimientoFilter = undefined;
        this.dataTable2 = [];
        this.initialStateDataTable1 = true,
          this.showMessage("success", this.translate.instant('CUMCO020.MENSAJES.exito'), '');
        this.subscribeGetProcesoSGS('');
      });

  }


  subscribeGetProcedimientoSGS(parameters: string) {

    let response: any[];
    this.cumco020Service.getProcedimientoSGS(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable2 = [];
        this.dataProcedimientoFilter = [];
        for (const data of response) {
          this.dataTable2.push({ ...data, state: 'noedit', codigoNombreProceso: this.selectedRowTable1.codigo + ' - ' + this.selectedRowTable1.nombre });
          this.dataProcedimientoFilter.push({ ...data, codigoNombre: data.codigo + ' - ' + data.nombre });
        }

        if (this.initialStateDataTable2) {
          this.initialDataTable2 = [];
          for (const data of this.dataTable2) {
            this.initialDataTable2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable2 = false;
        }

      })

  }


  subscribeGetProcedimientoSGS2(parameters: string) {

    this.cumco020Service.getProcedimientoSGS('').subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        this.allProcedimientosRelacionados = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
      })

  }


  subscribeGetRelacionProcedimientoDependencia(parameters: string) {

    let response: any[];
    this.cumco020Service.getRelacionProcedimientoDependencia(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        if (response.length > 0) {
          var names = '';
          for (var resp of response) {
            names = names + resp.dependencia.nombre + ', ';
          }

          const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcesoDependenciaError',
            {
              proceso: this.selectedRowTable2.codigo + ' - ' + this.selectedRowTable2.nombre,
              nombresDependencia: names
            });
          this.showMessage2("error", error, '');
          return;
        }
        else {
          if (this.selectedRowTable2.isRadicado || this.selectedRowTable2.isBorrador) {

            const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcedimientoRadicadoError',
              {
                procedimiento: this.selectedRowTable2.codigo + ' - ' + this.selectedRowTable2.nombre,
                proceso: this.selectedRowTable1.codigo + ' - ' + this.selectedRowTable1.nombre
              });
            this.showMessage2("error", error, '');
            return;

          }
          else {
            this.dataTable2.find(row => row === this.selectedRowTable2).state = this.selectedRowTable2.state === 'delete' ? 'edit' : 'delete';
            this.editedTable2('');
          }

        }

      })

  }

  subcribePostProcedimientoSGS(body: any) {
    var respuestaPost;
    this.cumco020Service.postProcedimientoSGS(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO020.MENSAJES.falloGuardar');
        this.showMessage2("error", error, '');
      },
      () => {                 // Fin del suscribe
        this.suggestionsProcedimientoFilter = undefined;
        this.initialStateDataTable2 = true,
          this.showMessage2("success", this.translate.instant('CUMCO020.MENSAJES.exito'), '');
        this.subscribeGetProcedimientoSGS2('');
        this.rowSelectTable1();
        this.onClicBorrarDependenciaFilter();
      });

  }


  subscribeGetRelacionProcesoDependencia3(parameters: string) {

    let response: any[];
    this.cumco020Service.getRelacionProcesoDependencia(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        this.dataTable3 = [];
        for (var resp of response) {
          var proceso = this.initialDataTable1.filter(data => data.id === resp.idProceso);
          this.dataTable3.push({ ...resp, state: 'noedit', proceso: { ...proceso[0], codigoNombre: proceso[0].codigo + ' - ' + proceso[0].nombre } });
        }

        if (this.initialStateDataTable3) {
          this.initialDataTable3 = [];
          for (const data of this.dataTable3) {
            this.initialDataTable3.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable3 = false;
        }

      })

  }


  subcribeGetOrganismoDependencia(getParameters: string) {
    this.cumco020Service.getOrganismoDependencia(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dataDependenciFilter = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.organismoDependenciaError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
      });
  }


  subscribeGetRelacionProcedimientoDependencia2(parameters: string) {

    let response: any[];
    this.cumco020Service.getRelacionProcedimientoDependencia(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        this.dataTable4 = [];
        this.dataProcedimientoFilter2 = [];
        for (var data of this.allProcedimientosRelacionados) {
          if (data.idProceso === this.selectedRowTable3.proceso.id) {
            this.dataTable4.push({ porcedimiento: { ...data, codigoNombre: data.codigo + ' - ' + data.nombre }, id: '', rel: 0, response: {}, state: 'noedit' });
            this.dataProcedimientoFilter2.push({ ...data, codigoNombre: data.codigo + ' - ' + data.nombre });
          }
        }

        for (var res of response) {
          for (var data4 of this.dataTable4) {
            if (data4.porcedimiento.id == res.idProcedimiento) {
              data4.rel = 1;
              data4.id = res.id;
              data4.response = res;
            }
          }
        }


        if (this.initialStateDataTable4) {
          this.initialDataTable4 = [];
          for (const data of this.dataTable4) {
            this.initialDataTable4.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable4 = false;
        }

      })

  }


  subcribePostRelacionProcesoDependencia(body: any) {
    var respuestaPost;
    this.cumco020Service.postRelacionProcesoDependencia(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO020.MENSAJES.falloGuardar');
        this.showMessage("error", error, '');
      },
      () => {                 // Fin del suscribe
        this.seleccionProcedimientoFilter2 = undefined;
        this.dataTable4 = [];
        this.initialStateDataTable3 = true,
          this.showMessage("success", this.translate.instant('CUMCO020.MENSAJES.exito'), '');
        this.selectDependenciaFilter('');
      });

  }

  subcribePostRelacionProcedimientoDependencia(body: any) {
    var respuestaPost;
    this.cumco020Service.postRelacionProcedimientoDependencia(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        respuestaPost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO020.MENSAJES.falloGuardar');
        this.showMessage("error", error, '');
      },
      () => {                 // Fin del suscribe
        this.seleccionProcedimientoFilter2 = undefined;
        this.initialStateDataTable4 = true,
          this.showMessage2("success", this.translate.instant('CUMCO020.MENSAJES.exito'), '');
        this.rowSelectTable3();
      });

  }



  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchProcesoFilter(event) {
    this.selectedRowTable3 = undefined;
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataProcesoFilter.length; i++) {
      let data = this.dataProcesoFilter[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsProcesoFilter = filtered;

  }

  searchProcedimientoFilter(event) {

    this.selectedRowTable4 = undefined;

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataProcedimientoFilter.length; i++) {
      let data = this.dataProcedimientoFilter[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsProcedimientoFilter = filtered;

  }

  searchDependenciaFilter(event) {

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataDependenciFilter.length; i++) {
      let data = this.dataDependenciFilter[i];
      if (data.nombreCodigoGuion.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsDependenciaFilter = filtered;

  }

  searchProcedimientoFilter2(event) {

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataProcedimientoFilter2.length; i++) {
      let data = this.dataProcedimientoFilter2[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsProcedimientoFilter2 = filtered;

  }


  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  selectProcesoFilter(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialDataTable1) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if (this.seleccionProcesoFilter) {
      if (this.seleccionProcesoFilter.id !== undefined && this.seleccionProcesoFilter.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.seleccionProcesoFilter.id);
      }
      else {
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else {
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.dataTable1 = filtered;

  }

  selectProcedimientoFilter(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialDataTable2) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if (this.seleccionProcedimientoFilter) {
      if (this.seleccionProcedimientoFilter.id !== undefined && this.seleccionProcedimientoFilter.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.seleccionProcedimientoFilter.id);
      }
      else {
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else {
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.dataTable2 = filtered;


  }

  selectDependenciaFilter(event) {


    this.dataTable4 = [];
    this.selectedRowTable3 = undefined;
    this.seleccionProcedimientoFilter2 = undefined;

    this.initialStateDataTable3 = true;
    this.subscribeGetRelacionProcesoDependencia3('?idDependencia=' + String(this.seleccionDependenciaFilter.id));

  }

  selectProcedimientoFilter2(event) {

    const copyInitialData: any[] = [];
    for (const data of this.initialDataTable4) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if (this.seleccionProcedimientoFilter2) {
      if (this.seleccionProcedimientoFilter2.id !== undefined && this.seleccionProcedimientoFilter2.id !== '') {
        filtered = copyInitialData.filter(data => data.porcedimiento.id === this.seleccionProcedimientoFilter2.id);
      }
      else {
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else {
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.dataTable4 = filtered;


  }

  selectProcesoTabla3(event) {

    this.editedTable3('');

  }



  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutProcesoFilter() {
    if (this.seleccionProcesoFilter) {
      if (this.seleccionProcesoFilter.id === undefined || this.seleccionProcesoFilter.id === '') {
        this.seleccionProcesoFilter = undefined;
        this.selectProcesoFilter('');
      }
    }
    else if (this.seleccionProcesoFilter === '') {
      this.seleccionProcesoFilter = undefined;
      this.selectProcesoFilter('');
    }
  }

  focusOutProcedimientoFilter() {
    if (this.seleccionProcedimientoFilter) {
      if (this.seleccionProcedimientoFilter.id === undefined || this.seleccionProcedimientoFilter.id === '') {
        this.seleccionProcedimientoFilter = undefined;
        this.selectProcedimientoFilter('');
      }
    }
    else if (this.seleccionProcedimientoFilter === '') {
      this.seleccionProcedimientoFilter = undefined;
      this.selectProcedimientoFilter('');
    }
  }


  focusOutDepenenciaFilter() {
    if (this.seleccionDependenciaFilter) {
      if (this.seleccionDependenciaFilter.id === undefined || this.seleccionDependenciaFilter.id === '') {
        this.seleccionDependenciaFilter = undefined;
        this.seleccionProcedimientoFilter = undefined;
        this.selectedRowTable3 = undefined;
        this.dataTable3 = [];
        this.dataTable4 = [];
      }
    }
    else if (this.seleccionDependenciaFilter === '') {
      this.seleccionDependenciaFilter = undefined;
      this.seleccionProcedimientoFilter = undefined;
      this.selectedRowTable3 = undefined;
      this.dataTable3 = [];
      this.dataTable4 = [];
    }
  }

  focusOutTablaProcesoTabla3(rowIndex) {
    if (this.dataTable3[rowIndex].proceso) {
      if (this.dataTable3[rowIndex].proceso.id === undefined || this.dataTable3[rowIndex].proceso.id === '') {
        this.dataTable3[rowIndex].proceso = { id: '' };
        this.editedTable3('');
      }
    }
    else if (this.dataTable3[rowIndex].proceso === '') {
      this.dataTable3[rowIndex].proceso = { id: '' };
      this.editedTable3('')
    }
  }

  focusOutProcedimientoFilter2() {
    if (this.seleccionProcedimientoFilter2) {
      if (this.seleccionProcedimientoFilter2.id === undefined || this.seleccionProcedimientoFilter2.id === '') {
        this.seleccionProcedimientoFilter2 = undefined;
        this.selectProcedimientoFilter2('');

      }
    }
    else if (this.seleccionProcedimientoFilter === '') {
      this.seleccionProcedimientoFilter2 = undefined;
      this.selectProcedimientoFilter2('');
    }

  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClickElminiarSelected3() {
    this.selectedRowTable3 = undefined;
  }

  onClicBorrarProcesoFilter() {
    this.seleccionProcesoFilter = undefined;
    this.selectProcesoFilter('');
  }

  onClicBorrarProcedimientoFilter() {
    this.seleccionProcedimientoFilter = undefined;
    this.selectProcedimientoFilter('');
  }

  onClicBorrarDependenciaFilter() {
    this.seleccionDependenciaFilter = undefined;
    this.selectedRowTable3 = undefined;
    this.dataTable3 = [];
    this.dataTable4 = [];
  }

  onClicBorrarProcedimientoFilter2() {
    this.seleccionProcedimientoFilter2 = undefined;
    this.selectProcedimientoFilter2('');
  }

  onClicAgregar1() {
    let newElement = {
      idRow1: this.idRow1,
      id: '',
      nombre: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable1 = [...this.dataTable1, newElement];
    this.idRow1 += 1;

    const newPage = Math.trunc(this.dataTable1.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;
  }

  onClicEliminar1() {
    if (this.selectedRowTable1 && this.initialDataTable2.length !== 0 && this.selectedRowTable1.state !== 'new') {
      const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcesoProcedimientoError',
        { proceso: this.selectedRowTable1.codigo + ' - ' + this.selectedRowTable1.nombre });
      this.showMessage("error", error, '');

      return;
    }
    else if (this.selectedRowTable1 && this.selectedRowTable1.state !== 'new') {
      this.subscribeGetRelacionProcesoDependencia('?idProceso=' + String(this.selectedRowTable1.id));

    } else if (this.selectedRowTable1 && this.selectedRowTable1.state === 'new') {
      let index = this.dataTable1.indexOf(this.selectedRowTable1);
      this.dataTable1 = this.dataTable1.filter((val, i) => i !== index);
      this.selectedRowTable1 = undefined;
    }
  }

  onClicGuardar1() {
    if (!this.validarCamposVacios1()) {
      return;
    }
    else if (!this.validarRepetidos1()) {
      return;
    }
    else {
      this.subcribePostProcesoSGS(this.buildJson1());
    }

  }



  onClicAgregar2() {
    let newElement = {
      idRow2: this.idRow2,
      id: '',
      codigoNombreProceso: this.selectedRowTable1.codigo + ' - ' + this.selectedRowTable1.nombre,
      idProceso: this.selectedRowTable1.id,
      nombre: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable2 = [...this.dataTable2, newElement];
    this.idRow2 += 1;

    const newPage = Math.trunc(this.dataTable2.length/this.nRowsTable2) * this.nRowsTable2;
    this.pageTable2 = newPage;
  }

  onClicEliminar2() {
    if (this.selectedRowTable1 && this.selectedRowTable2 && this.selectedRowTable2.state !== 'new') {
      this.subscribeGetRelacionProcedimientoDependencia('?idProcedimiento=' + String(this.selectedRowTable2.id));

    }
    else if (this.selectedRowTable2 && this.selectedRowTable2.state === 'new') {
      let index = this.dataTable2.indexOf(this.selectedRowTable2);
      this.dataTable2 = this.dataTable2.filter((val, i) => i !== index);
      this.selectedRowTable2 = undefined;
    }

  }

  onClicGuardar2() {
    if (!this.validarCamposVacios2()) {
      return;
    }
    else if (!this.validarRepetidos2()) {
      return;
    }
    else if (!this.validarRepetidosOtrosProcesos2()) {
      return;
    }
    else {
      this.subcribePostProcedimientoSGS(this.buildJson2());
    }
  }


  onClicAgregar3() {
    let newElement = {
      idRow3: this.idRow3,
      id: '',
      dependencia: this.seleccionDependenciaFilter,
      proceso: { id: '' },
      state: 'new',
    }
    this.dataTable3 = [...this.dataTable3, newElement];
    this.idRow3 += 1;

    const newPage = Math.trunc(this.dataTable3.length/this.nRowsTable3) * this.nRowsTable3;
    this.pageTable3 = newPage;

  }

  onClicEliminar3() {

    if (this.selectedRowTable3 && this.selectedRowTable3.state !== 'new') {

      var noEntro = true;
      for (var data4 of this.initialDataTable4) {
        if (data4.response.isDependenciaRadciado === 1 && data4.response.isProcedimientoRadciado === 1) {
          const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcesoDependenciaError2',
            {
              proceso: this.selectedRowTable3.proceso.codigoNombre,
              organismo: this.seleccionDependenciaFilter.nombreCodigoGuion
            })
          this.showMessage("error", error, '');
          noEntro = false;
          break;
        }
      }

      for (var data4 of this.initialDataTable4) {
        if (data4.rel === 1) {
          const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcesoDependenciaError3',
            {
              proceso: this.selectedRowTable3.proceso.codigoNombre,
              organismo: this.seleccionDependenciaFilter.nombreCodigoGuion
            })
          this.showMessage("error", error, '');
          noEntro = false;
          break;
        }
      }

      if (noEntro) {
        this.dataTable3.find(row => row === this.selectedRowTable3).state = this.selectedRowTable3.state === 'delete' ? 'edit' : 'delete';
      }



    }
    if (this.selectedRowTable3 && this.selectedRowTable3.state === 'new') {
      let index = this.dataTable3.indexOf(this.selectedRowTable3);
      this.dataTable3 = this.dataTable3.filter((val, i) => i !== index);
      this.selectedRowTable3 = undefined;
    }

  }

  onClicGuardar3() {

    if (!this.validarCamposVacios3()) {
      return;
    }
    else if (!this.validarRepetidos3()) {
      return;
    }
    else {
      this.subcribePostRelacionProcesoDependencia(this.buildJson3());
    }

  }


  onClicGuardar4() {

    this.subcribePostRelacionProcedimientoDependencia(this.buildJson4());
  }


  // Eventos Selecion Fila de la Tabla -- Eventos Selecion Fila de la Tabla
  // Eventos Selecion Fila de la Tabla -- Eventos Selecion Fila de la Tabla

  rowSelectTable1() {
    if (this.selectedRowTable1 && this.selectedRowTable1.state !== 'new') {
      this.seleccionProcedimientoFilter = undefined;
      this.initialStateDataTable2 = true;
      this.subscribeGetProcedimientoSGS('?idProceso=' + this.selectedRowTable1.id);
    } else {
      this.dataTable2 = [];
    }

  }

  rowSelectTable3() {
    if (this.selectedRowTable3.state === 'new') {

      const error = this.translate.instant('CUMCO020.MENSAJES.requerirGuardarRelacion',
        {
          proceso: this.selectedRowTable3.codigoNombre,
          organismo: this.seleccionDependenciaFilter.nombreCodigoGuion
        })
      this.showMessage("error", error, '');

    }
    if (this.selectedRowTable3 && this.selectedRowTable3.state !== 'new') {
      this.initialStateDataTable4 = true;
      this.subscribeGetRelacionProcedimientoDependencia2('?idDependencia=' + String(this.seleccionDependenciaFilter.id));
    } else {
      this.dataTable4 = [];
    }
  }

  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX
  // Eventos ONCHANGE en CHECKBOX -- Eventos ONCHANGE en CHECKBOX}

  checkboxActivoTable1(row) {
  }


  // Eventos KEYDOWN en INPUT -- Eventos KEYDOWN en INPUT
  // Eventos KEYDOWN en INPUT -- Eventos KEYDOWN en INPUT

  onChageAll(event) {

    if (event.checked) {
      for (var data of this.dataTable4) {
        data.rel = 1;
        if (data.id === '') {
          data.state = 'new';
        }
        else {
          data.state = 'noedit';
        }
      }
    }
    else {
      var names = ''
      for (var data of this.dataTable4) {
        if (data.response.isDependenciaRadciado === 1 && data.response.isProcedimientoRadciado === 1) {
          names = names + "\" " + data.porcedimiento.codigoNombre + "\", "
        }
        else {
          data.rel = 0;
          if (data.id === '') {
            data.state = 'noedit';
          }
          else {
            data.state = 'delete';
          }
        }
      }

      if (names !== '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcedimientoDependenciaError3',
          {
            procedimiento: names,
            organismo: this.seleccionDependenciaFilter.nombreCodigoGuion
          })
        this.showMessage2("error", error, '');
      }

    }
  }

  onChageProcesoRow(rowIndex) {
    if (this.dataTable4[rowIndex].response.isDependenciaRadciado === 1 && this.dataTable4[rowIndex].response.isProcedimientoRadciado === 1) {

      this.dataTable4[rowIndex].rel = 1;
      this.dataTable4[rowIndex].rel = true;
      this.dataTable4[rowIndex].state = 'noedit';
      const error = this.translate.instant('CUMCO020.MENSAJES.eliminarProcedimientoDependenciaError2',
        {
          procedimiento: this.dataTable4[rowIndex].porcedimiento.codigoNombre,
          organismo: this.seleccionDependenciaFilter.nombreCodigoGuion
        })
      this.showMessage2("error", error, '');

    }
    else if (this.dataTable4[rowIndex].rel === 1 && this.dataTable4[rowIndex].id == '') {
      this.dataTable4[rowIndex].state = 'new';
    }
    else if (this.dataTable4[rowIndex].rel === 0 && this.dataTable4[rowIndex].id == '') {
      this.dataTable4[rowIndex].state = 'noedit';
    }
    else if (this.dataTable4[rowIndex].rel === 0 && this.dataTable4[rowIndex].id !== '') {
      this.dataTable4[rowIndex].state = 'delete';
    }
    else if (this.dataTable4[rowIndex].rel === 1 && this.dataTable4[rowIndex].id !== '') {
      this.dataTable4[rowIndex].state = 'noedit';
    }

    //this.editedTable4('');
  }



  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarCamposVacios1(): any {

    for (var _i = 0; _i < this.dataTable1.length; _i++) {

      if (this.dataTable1[_i].codigo.trim() === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO020.TABLA1.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
      else if (this.dataTable1[_i].nombre.trim() === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO020.TABLA1.headerTabla2') });
        this.showMessage('error', error, '');
        return false;
      }

    }

    return true;

  }

  validarRepetidos1(): any {

    for (var _i = 0; _i < this.dataTable1.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable1.length; _k++) {
        if (this.dataTable1[_k].codigo.toLowerCase().trim() === this.dataTable1[_i].codigo.toLowerCase().trim() && this.dataTable1[_i].state !== 'delete' && this.dataTable1[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO020.MENSAJES.campoCodigoRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              codigoNombre: this.dataTable1[_k].codigo + ' - ' + this.dataTable1[_k].nombre
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }

    if (this.seleccionProcesoFilter) {

      var filteredInitialData = [];

      for (const iniData of this.initialDataTable1) {
        if (iniData.state !== 'new') {
          let isData = [];
          isData = this.dataTable1.filter(data => data.id === iniData.id);
          if (isData.length === 0) {
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.dataTable1.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {

          if (this.dataTable1[_i].state !== 'delete') {

            if (filteredInitialData[_k].codigo.toLowerCase().trim() === this.dataTable1[_i].codigo.toLowerCase().trim()) {

              const error = this.translate.instant('CUMCO020.MENSAJES.campoCodigoProcesoRepetidoFiltradoError',
                {
                  filaRep1: String(_i + 1),
                  codigoNombre: this.dataTable1[_i].codigo + ' - ' + this.dataTable1[_i].nombre
                });
              this.showMessage("error", error, '');
              return false;
            }

          }
        }
      }

    }

    return true;
  }


  validarCamposVacios2(): any {

    for (var _i = 0; _i < this.dataTable2.length; _i++) {

      if (this.dataTable2[_i].codigo.trim() === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO020.TABLA2.headerTabla2') });
        this.showMessage2('error', error, '');
        return false;
      }
      else if (this.dataTable2[_i].nombre.trim() === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO020.TABLA2.headerTabla3') });
        this.showMessage2('error', error, '');
        return false;
      }

    }

    return true;

  }

  validarRepetidos2(): any {

    for (var _i = 0; _i < this.dataTable2.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable2.length; _k++) {
        if (this.dataTable2[_k].codigo.toLowerCase().trim() === this.dataTable2[_i].codigo.toLowerCase().trim() && this.dataTable2[_i].state !== 'delete' && this.dataTable2[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO020.MENSAJES.campoCodigoProcedimientoRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              codigoNombre: this.dataTable2[_k].codigo + ' - ' + this.dataTable2[_k].nombre
            });
          this.showMessage2('error', error, '');
          return false;
        }
      }
    }


    if (this.seleccionProcedimientoFilter) {

      var filteredInitialData = [];

      for (const iniData of this.initialDataTable2) {
        if (iniData.state !== 'new') {
          let isData = [];
          isData = this.dataTable2.filter(data => data.id === iniData.id);
          if (isData.length === 0) {
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.dataTable2.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {

          if (this.dataTable2[_i].state !== 'delete') {

            if (filteredInitialData[_k].codigo.toLowerCase().trim() === this.dataTable2[_i].codigo.toLowerCase().trim()) {

              const error = this.translate.instant('CUMCO020.MENSAJES.campoCodigoProcedimientoRepetidoFiltradoError',
                {
                  filaRep1: String(_i + 1),
                  codigoNombre: this.dataTable2[_k].codigo + ' - ' + this.dataTable2[_i].nombre
                });
              this.showMessage2("error", error, '');
              return false;
            }

          }
        }
      }

    }

    return true;

  }

  validarRepetidosOtrosProcesos2() {

    for (var _i = 0; _i < this.dataTable2.length; _i++) {
      for (var _k = 0; _k < this.allProcedimientosRelacionados.length; _k++) {
        if (this.allProcedimientosRelacionados[_k].codigo.toLowerCase().trim() === this.dataTable2[_i].codigo.toLowerCase().trim() &&
          this.allProcedimientosRelacionados[_k].idProceso !== this.dataTable2[_i].idProceso &&
          this.dataTable2[_i].state !== 'delete') {

          let procesoName = this.initialDataTable1.filter(data => data.id === this.allProcedimientosRelacionados[_k].idProceso);

          const error = this.translate.instant('CUMCO020.MENSAJES.campoCodigoProcedimientoRepetidoProcesoError',
            {
              filaRep1: String(_i + 1),
              procedimiento: this.dataTable2[_i].codigo + ' - ' + this.dataTable2[_i].nombre,
              proceso: procesoName[0].codigo + ' - ' + procesoName[0].nombre
            });
          this.showMessage2('error', error, '');
          return false;
        }
      }
    }

    return true;

  }


  validarCamposVacios3(): any {

    for (var _i = 0; _i < this.dataTable3.length; _i++) {

      if (this.dataTable3[_i].proceso.id === undefined || this.dataTable3[_i].proceso.id === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO020.TABLA3.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }

    }

    return true;

  }

  validarRepetidos3(): any {

    for (var _i = 0; _i < this.dataTable3.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable3.length; _k++) {
        if (this.dataTable3[_k].proceso.id === this.dataTable3[_i].proceso.id && this.dataTable3[_i].state !== 'delete' && this.dataTable3[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO020.MENSAJES.campoCodigoRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              codigoNombre: this.dataTable3[_k].proceso.codigo + ' - ' + this.dataTable3[_k].proceso.nombre
            });
          this.showMessage('error', error, '');
          return false;
        }
      }

    }

    return true;

  }





  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  editedTable1(rowIndex) {
    this.compareInitialData(this.dataTable1, this.initialDataTable1);
  }

  editedTable2(rowIndex) {
    this.compareInitialData(this.dataTable2, this.initialDataTable2);
  }

  editedTable3(rowIndex) {
    this.compareInitialData(this.dataTable3, this.initialDataTable3);
  }

  editedTable4(rowIndex) {
    this.compareInitialData(this.dataTable4, this.initialDataTable4);
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


  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar
  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar

  buildJson1(): any {

    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "codigo",
        "type": "input",
        "required": "true"
      },
      {
        "name": "nombre",
        "type": "input",
        "required": "false"
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": "false"
      },
      {
        "name": "activo",
        "type": "input",
        "required": "false"
      }
    ];
    let features = [];

    this.dataTable1.forEach(data => {
      features.push({
        attributes: {
          "id": data.id,
          "codigo": data.codigo,
          "nombre": data.nombre,
          "descripcion": data.descripcion,
          "activo": data.activo
        },
        "state": data.state
      })

    })
    return {
      "grd_ProcesoSGS": JSON.stringify({
        fields,
        features
      })
    };


  }

  buildJson2(): any {

    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "idProceso",
        "type": "input",
        "required": "false"
      },
      {
        "name": "codigo",
        "type": "input",
        "required": "false"
      },
      {
        "name": "nombre",
        "type": "input",
        "required": "false"
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": "false"
      },
      {
        "name": "activo",
        "type": "input",
        "required": "false"
      }
    ];
    let features = [];

    this.dataTable2.forEach(data => {
      features.push({
        attributes: {
          "id": data.id,
          "idProceso": data.idProceso,
          "codigo": data.codigo,
          "nombre": data.nombre,
          "descripcion": data.descripcion,
          "activo": data.activo
        },
        "state": data.state
      })

    })
    return {
      "grd_ProcedimientoSGC": JSON.stringify({
        fields,
        features
      })
    };


  }

  buildJson3(): any {

    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "idProceso",
        "type": "input",
        "required": "false"
      },
      {
        "name": "idDependencia",
        "type": "input",
        "required": "false"
      }
    ];
    let features = [];

    this.dataTable3.forEach(data => {
      features.push({
        attributes: {
          "id": data.id,
          "idProceso": data.proceso.id,
          "idDependencia": this.seleccionDependenciaFilter.id
        },
        "state": data.state
      })

    })
    return {
      "grd_RelacionProcesoDependencia": JSON.stringify({
        fields,
        features
      })
    };


  }

  buildJson4(): any {

    var insertData = [];

    for (var data4 of this.dataTable4) {
      if (data4.state !== 'noedit') {
        insertData.push(data4);
      }
    }

    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": "false"
      },
      {
        "name": "idProceso",
        "type": "input",
        "required": "false"
      },
      {
        "name": "idDependencia",
        "type": "input",
        "required": "false"
      }
    ];
    let features = [];

    insertData.forEach(data => {
      features.push({
        attributes: {
          "id": data.id,
          "idProceso": data.porcedimiento.id, // se dejo como proceso
          "idDependencia": this.seleccionDependenciaFilter.id
        },
        "state": data.state
      })

    })
    return {
      "grd_RelacionProcedimientoDependencia": JSON.stringify({
        fields,
        features
      })
    };


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
  showMessage(sev: string, sum: string, det: string) {
    this.msgs = [];
    this.msgs.push({ severity: sev, summary: sum, detail: det });

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  showMessage2(sev: string, sum: string, det: string) {
    this.msgs2 = [];
    this.msgs2.push({ severity: sev, summary: sum, detail: det });

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



}

