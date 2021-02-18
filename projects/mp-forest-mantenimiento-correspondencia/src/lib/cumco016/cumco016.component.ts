import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TreeNode } from 'primeng/api';
import { EjeTematicoService } from './servicio/eje-tematico.service';
import { TranslateService } from '@ngx-translate/core';

import { LazyLoadEvent } from 'primeng/api';

import { SortEvent } from 'primeng/api';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco016',
  templateUrl: './cumco016.component.html',
  styleUrls: ['./cumco016.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Cumco016Component implements OnInit {

  // Variables de los srevicios
  confEjeTematico: any[];
  dependenciaLista: any[];
  ejetematicoDependenciaLista: any[];

  loading: boolean;


  rowId = 0;
  rows: any[];
  cols: any[];
  initialData1: any[];
  initialState1 = true;
  selectedRows: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 5;
  pageTable1 = 0;

  files: TreeNode[] = [];
  selectedFile: TreeNode;

  sourceRows: any[] = [];
  targetRows: any[] = [];

  initialData2: any[];
  initialState2 = true;
  sortEvent: SortEvent;


  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];

  page = 1;
  size = this.ejeTematicoService.generalSize;
  //size = 2;
  pageDep = 1;

  customers: any[];

  loading2: boolean;

  constructor(private ejeTematicoService: EjeTematicoService,
    private messageService: MessageService,
    private translate: TranslateService) {
  }


  ngOnInit() {

    this.rows = [];
    this.initialData1 = [];
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    this.page = 1;
    this.subcribeServiceEjeTematico('');
    this.subscribeDependenciaLista2('?page=' + String(this.pageDep) + '&size=' + String(this.size) +  "&activo=1");

    //this.subscribeEjesDisponiobles();
  }

  ngDoCheck() {
    //console.log(this.rows);
  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.cols = [
        { field: 'codigo', header: this.translate.instant('CUMCO016.TABLA1.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO016.TABLA1.headerTabla2'), required: true },
        { field: 'activo', header: this.translate.instant('CUMCO016.TABLA1.headerTabla3') }
      ];

    });
  }

  subscribeEjeTematicoDependencia(idDependencia: string) {
    this.loading2 = true;
    var response: any[];
    this.ejeTematicoService.getEjeTematicoDependencia(idDependencia).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading2 = false;
      },
      () => {                 // Fin del suscribe


        this.targetRows = [];
        for (const iniData of response) {
          let isData = [];
          isData = this.initialData1.filter(data => data.id === iniData.ejeTematico.id);
          if (isData.length !== 0) {
            this.targetRows.push({
              id: iniData.id,
              dependencia: { id: this.selectedFile.data },
              ejeTematico: isData[0],
              isEjeDependenciaRadicado: iniData.isEjeDependenciaRadicado,
              isEjeDependenciaBorrador: iniData.isEjeDependenciaBorrador
            }
            );
          }
        }


        this.sourceRows = [];
        for (const iniData of this.initialData1) {
          if (iniData.state !== 'new') {
            let isData = [];
            isData = this.targetRows.filter(data => data.ejeTematico.id === iniData.id);
            if (isData.length === 0) {
              this.sourceRows.push({
                id: '',
                dependencia: { id: this.selectedFile.data },
                ejeTematico: iniData
              });
            }
          }
        }



        if (this.initialState2) {
          this.initialData2 = [];
          for (const data of this.targetRows) {
            this.initialData2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialState2 = false;
        }

        this.loading2 = false;
        //this.subscribeEjesDisponiobles();

        //this.updateEjeTematicoDependencia(this.ejetematicoDependenciaLista);
      });
  }

  subscribeDependenciaLista(parameters: string): any {
    this.ejeTematicoService.getDependenciaLista(parameters).subscribe( // ?activo=" + activo + "&codigoNombre=" + codNombre

      (getRes: any[]) => {     // Inicio del suscribe
        this.dependenciaLista = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        var newLIst = this.createArray(this.dependenciaLista);
        //console.log(newLIst);
        this.files = this.createTree(newLIst);
        //console.log(this.files);
        //this.updateDependencias(this.dependenciaLista);
      });
  }


 

  subscribeDependenciaLista2(parameters) {
    if (this.pageDep === 1) {
      this.dependenciaLista = [];
    }
    let responseData: any[];
    this.ejeTematicoService.getDependenciaLista(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.organismoDependenciaError'), getError.error.message);
      },
      () => {                 // Fin del suscribe

        for (var respData of responseData) {
          this.dependenciaLista.push({ ...respData });
        }

        if (responseData.length >= this.size) {
          this.pageDep = this.pageDep + 1;
            this.subscribeDependenciaLista2('?page=' + String(this.pageDep) + '&size=' + String(this.size) +  "&activo=1");
        } else {
          this.dependenciaLista = [...this.dependenciaLista];
          this.pageDep = 1;
          var newLIst = this.createArray(this.dependenciaLista);
          //console.log(newLIst);
          this.files = this.createTree(newLIst);
          return;
        }


      });
  }



  subcribeServiceEjeTematico(parameters: string): any {
    if (this.page === 1) {
      this.rows = [];
      this.initialData1 = [];
    }
    this.loading = true;
    var responseData: any[];
    this.ejeTematicoService.getEjeTematico(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        this.loading = false
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => { // Fin del suscribe

        for (var respData of responseData) {
          this.rows.push({ ...respData, state: 'noedit' });
          this.initialData1.push({ ...respData, state: 'noedit' });
        }




        //this.loading = false;


        if (responseData.length >= this.size) {
          this.page = this.page + 1;
          //if (parameters === '') {
            this.subcribeServiceEjeTematico('?page=' + String(this.page) + '&size=' + String(this.size));
          //}
          //else {
          //  this.subcribeServiceEjeTematico(parameters + '&page=' + String(this.page) + '&size=' + String(this.size));
          //}
        } else {
          this.rows = [...this.rows];
          this.loading = false;
          this.page = 1;
          return;
        }


      });

  }

  subcribeGuardarEjes(body: any) {
    this.loading = true;
    let responseGuardar: any;
    this.ejeTematicoService.postEjeTematico(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        responseGuardar = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO016.MENSAJES.falloGuardar');
        this.showMessage('error', error, '');
        this.loading = false;
      },
      () => {                 // Fin del suscribe
        this.initialState1 = true;
        this.page = 1;
        this.subcribeServiceEjeTematico('');
        this.selectedFile = undefined;
        this.targetRows = [];
        this.sourceRows = [];
        //this.onNodeSelect('');
        this.showMessage('success', this.translate.instant('CUMCO016.MENSAJES.ejeTematicoGuardarExito'), '');
      });
  }

  subscribeEjesDisponiobles() {
    let response: any[];
    this.ejeTematicoService.getEjeTematicoDependencia('').subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        let newEje: any;
        this.sourceRows = [];
        for (const eje of this.initialData1) {
          newEje = response.find(rel => rel.ejeTematico.id === eje.id)
          if (!newEje) {
            this.sourceRows.push({
              id: '',
              dependencia: { id: this.selectedFile.data },
              ejeTematico: eje
            });
          }
        }



      });
  }


  subscribeEjesRelacionados(idEje: string) {
    let responseDependencias: any[];
    this.ejeTematicoService.getEjeTematicoRelacionados(idEje).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseDependencias = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if (responseDependencias.length === 0) {
          this.rows.find(row => row === this.selectedRows).state = this.selectedRows.state === 'delete' ? 'edit' : 'delete';
        }
        else {
          var nombresDependencias = '';

          for (var respDep of responseDependencias) {
            nombresDependencias = nombresDependencias + '\"' + respDep.dependencia.nombre + '\", ';
          }

          const error = this.translate.instant('CUMCO016.MENSAJES.ejeTematicoEliminarErrorDepe', {
            eje: responseDependencias[0].ejeTematico.descripcion,
            dependencias: nombresDependencias
          });
          this.showMessage('error', error, '');

        }

      });
  }

  subcribePostRelacionEjeTematicoDependencia(body: any) {
    let responseGuardar: any;
    this.ejeTematicoService.postRelacionEjeTematicoDependencia(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        responseGuardar = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO016.MENSAJES.falloGuardar');
        this.showMessage('error', error, '');
      },
      () => {                 // Fin del suscribe
        //this.initialState1 = true;
        this.onNodeSelect('');
        const meesage = this.translate.instant('CUMCO016.MENSAJES.guradarRelacionEjesDependenciaExito', { dependencia: this.selectedFile.label });
        this.showMessage2('success', meesage, '');
      });
  }

  // METODOS PARA CREAR TREEE -- METODOS PARA CREAR TREEE
  // METODOS PARA CREAR TREEE -- METODOS PARA CREAR TREEE

  createArray(data: any[]): any {


    var newData = [];


    data.forEach(dependencia => {
      var finder = [];
      var finder2 = [];
      if (dependencia.dependenciaPadre !== undefined) {
        finder = newData.filter(data => data.id === dependencia.dependenciaPadre.id);
        finder2 = data.filter(data => data.id === dependencia.dependenciaPadre.id);
        if (finder.length === 0 && finder2.length === 0) {
          newData.push({
            nombre: dependencia.dependenciaPadre.nombre,
            id: dependencia.dependenciaPadre.id,
            parentId: "0",
            collapsedIcon: 'fa-folder',
          });
        }
      }
      else {
        finder = newData.filter(data => data.id === dependencia.id);
        if (finder.length === 0) {
          newData.push({ nombre: dependencia.nombre, id: dependencia.id, parentId: "0" });
        }
      }
    })

    data.forEach(dependencia => {
      if (dependencia.dependenciaPadre !== undefined) {
        newData.push({ nombre: dependencia.nombre, id: dependencia.id, parentId: dependencia.dependenciaPadre.id });
      }
    });

    return newData;

  }

  createTree(list: any[]): any {
    var map = {}, node, roots: TreeNode[] = [], i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (var k = 0; k < list.length; k += 1) {
      node = list[k];
      //console.log(node)
      var insertData;
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        insertData = { label: node.nombre, data: node.id, expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder', children: node.children }
        list[map[node.parentId]].children.push(insertData);
      } else {
        insertData = { label: node.nombre, data: node.id, expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder', children: node.children }
        roots.push(insertData);
      }
    }
    return roots;
  }

  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClicAgregar() {
    const rows = [...this.rows];

    rows.push({
      rowId: this.rowId,
      id: '',
      codigo: this.generarCodigo2(),
      descripcion: '',
      activo: '1',
      state: 'new'
    });

    this.rows = rows;
    if (this.sortEvent){
      this.customSort(this.rows, this.sortEvent);
    }

    const index = this.rows.findIndex(x => x.rowId === this.rowId);
    this.rowId = this.rowId + 1;



    //const newPage = Math.trunc(this.rows.length/this.nRowsTable1) * this.nRowsTable1;
    const newPage = Math.trunc(index / this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;
  }

  onClicEliminar() {
    if (this.selectedRows.isRadicado || this.selectedRows.isBorrador) {
      const error = this.translate.instant('CUMCO016.MENSAJES.ejeAsociadoRadicadoError', { eje: this.selectedRows.descripcion });
      this.showMessage("error", error, '');
    }
    else if (this.selectedRows && this.selectedRows.state !== 'new') {
      this.subscribeEjesRelacionados(this.selectedRows.id);
    } else if (this.selectedRows && this.selectedRows.state === 'new') {
      let index = this.rows.indexOf(this.selectedRows);
      this.rows = this.rows.filter((val, i) => i !== index);
      this.selectedRows = undefined;
    }
  }


  onClicGuardar() {



    if (!this.validarCamposEjes()) {
      return
    }
    else if (!this.validarRepetidos()) {
      return
    }
    else {

      this.subcribeGuardarEjes(this.buildJsonEjeTematico());
    }
  }

  onClicGuarda2() {
    if (this.selectedFile) {
      if (this.selectedFile.data !== undefined) {
        this.subcribePostRelacionEjeTematicoDependencia(this.buildJsonRelacionEjeTematicoDependencia());
      }
    }
  }

  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas
  // Metodos VALIDACION Campos Tablas -- Metodos VALIDACION Campos Tablas

  validarCamposEjes(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {

      if (this.rows[_i].descripcion.trim() == '') {
        const error = this.translate.instant('CUMCO016.MENSAJES.campoFilaVacioError',
          {
            filaVacia: String(_i + 1),
            campoVacio: this.translate.instant('CUMCO016.TABLA1.headerTabla1')
          });
        this.showMessage("error", error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos(): any {

    for (var _i = 0; _i < this.rows.length; _i++) {
      for (var _k = _i + 1; _k < this.rows.length; _k++) {

        if (this.rows[_i].state !== 'delete' && this.rows[_k].state !== 'delete') {

          if (this.rows[_i].descripcion.trim() === this.rows[_k].descripcion.trim()) {

            const error = this.translate.instant('CUMCO016.MENSAJES.campoEjeRepetidoError',
              {
                filaRep1: String(_i + 1), filaRep2: String(_k + 1),
                eje: this.rows[_i].descripcion
              });
            this.showMessage("error", error, '');
            return false;
          }

        }
      }
    }

    return true;
  }


  // Eventos OnNODESELECT en Botones -- Eventos de OnNODESELECT en Botones
  // Eventos OnNODESELECT en Botones -- Eventos de OnNODESELECT en Botones

  onNodeSelect($event) {
    if (this.selectedFile) {
      this.initialState2 = true;
      this.subscribeEjeTematicoDependencia(this.selectedFile.data);
    }
  }

  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas
  // Metodos EDICION de Tablas -- Metodos EDICION de Tablas

  edited(rowIndex) {
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

  buildJsonEjeTematico(): any {

    var dataSend = [];
    for(var data of this.rows){
      if (data.state !== 'noedit'){
        dataSend.push( {
          id: data.id,
          descripcion: data.descripcion,
          codigo: data.codigo,
          activo: data.activo,
          state: data.state
        });

      }
    }

    return(dataSend);


  }

  buildJsonEjeTematico2(): any {

    let fields = [
      {
        "name": "descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "activo",
        "type": "input",
        "required": false
      },
      {
        "name": "codigo",
        "type": "input",
        "required": false
      }
    ];
    let features = [];

    this.rows.forEach(tipo => {
      if (tipo.state === 'edit' || tipo.state === 'new' || tipo.state === 'delete' ) {

        features.push({
          attributes: {
            "descripcion": tipo.descripcion,
            "id": tipo.id,
            "activo": tipo.activo,
            "codigo": tipo.codigo
          },
          "state": tipo.state
        })

      }

    })
    return {
      "grd_ejeTematico": JSON.stringify({
        fields,
        features
      })
    };


  }


  buildJsonRelacionEjeTematicoDependencia(): any {

    var dataSent = [];

    var filteredInitialData = [];

    for (const newData of this.targetRows) {
      let isData = [];
      isData = this.initialData2.filter(data => data.id === newData.id);
      if (isData.length === 0) {
        dataSent.push({ id: newData.id, 
                        ejeTematico: {id: newData.ejeTematico.id},
                        dependencia: { id: this.selectedFile.data},
                        state: 'new' });
      }
    }

    for (const delData of this.initialData2) {
      let isData = [];
      isData = this.targetRows.filter(data => data.id === delData.id);
      if (isData.length === 0) {
        dataSent.push({ id: delData.id, 
          ejeTematico: {id: delData.ejeTematico.id},
          dependencia: { id: this.selectedFile.data},
          state: 'delete' });
      }
    }


    return(dataSent);


  }


  // METODOS UPDATE -- METODOS UPDATE
  // METODOS UPDATE -- METODOS UPDATE


  generarCodigo(): any {
    var codigo = this.rows.length.toString();

    while (codigo.length < 5) {
      codigo = '0' + codigo;
    }

    return codigo;
  }


  generarCodigo2(): any {

    var arrayCod = [];
    for (let row of this.rows) {
      let codNum;
      codNum = parseInt(row.codigo);
      if (!isNaN(codNum)) {
        arrayCod.push(codNum);
      }
    }

    arrayCod = arrayCod.sort(function (a, b) {
      return a - b;
    });

    if (arrayCod.length === 0) {
      return '00001';
    }
    else if (arrayCod[0] !== 1) {
      return '00001';
    }
    else {

      var newCodeNum = undefined;
      for (var m = 0; m < arrayCod.length - 1; m++) {
        if (arrayCod[m + 1] - arrayCod[m] > 1) {
          newCodeNum = arrayCod[m] + 1;
          arrayCod.push(newCodeNum);
          arrayCod = arrayCod.sort();
          break;
        }
      }

      var codigoStr = '';
      if (newCodeNum) {
        codigoStr = newCodeNum.toString();
        while (codigoStr.length < 5) {
          codigoStr = '0' + codigoStr;
        }
      }
      else {
        // codigoStr = (arrayCod.length + 1).toString();
        codigoStr = (arrayCod[arrayCod.length - 1] + 1).toString();
        while (codigoStr.length < 5) {
          codigoStr = '0' + codigoStr;
        }
      }

      return codigoStr;

    }

  }

  onSourceSelect(event) {

    var buttons: HTMLCollection;
    var buttons = document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only");

    var entro = false;
    for (var item of event.items) {
      if (item.isEjeDependenciaRadicado || item.isEjeDependenciaBorrador) {
        entro = true;
        break;
      }
    }

    if (entro) {
      buttons[0].setAttribute('disabled', 'true');
    }
    else {
      buttons[0].removeAttribute('disabled');
    }


  }


  onTargetSelect(event) {

    var buttons: HTMLCollection;
    var buttons = document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only");

    var entro = false;
    for (var item of event.items) {
      if (item.isEjeDependenciaBorrador || item.isEjeDependenciaRadicado && item.id !== '') {
        entro = true;
        break;
      }
    }

    if (entro) {
      buttons[2].setAttribute('disabled', 'true');
    }
    else {
      buttons[2].removeAttribute('disabled');
    }


  }

  onMoveToTarget(event) {
    for (var item of event.items) {
      if (item.isEjeDependenciaBorrador || item.isEjeDependenciaRadicado) {
        this.sourceRows.push(item);
      }
    }
  }

  onMoveToSource(event) {
    for (var item of event.items) {
      var element = this.targetRows.find(data => data.ejeTematico.id === item.ejeTematico.id)

      if (!element) {
        if (item.id !== '' && (item.isEjeDependenciaBorrador == 1 || item.isEjeDependenciaRadicado == 1)) {
          this.targetRows.push(item);
          let index = this.sourceRows.indexOf(item);
          if (index !== -1) {
            this.sourceRows = this.sourceRows.filter((val, i) => i !== index);
          }
        }

      }
    }
  }


  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (this.rows) {
        this.customers = this.rows.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 5000);
  }


  customSort( data: any[], event ?: SortEvent){

    let sortData: any[];

    if ( event === undefined ){
      sortData = data.sort(function (a, b) {
      if ( a.id < b.id ) {
        return -1;
      }
      if ( a.id > b.id ){
        return 1;
      }
      return 0;
    });
    }
    else{
      sortData = data.sort(function (a, b) {
        if( a[event.field] < b[event.field] ) {
          return -1 * event.order;
        }
        if( a[event.field] > b[event.field] ){
          return 1 * event.order;
        }
        return 0;
      });
    }


    data = sortData;
    this.sortEvent = event;

  }

}

export interface Row {
  id;
  codigo;
  descripcion;
  activo;
}
