import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TreeNode } from 'primeng/api';
import { EjeTematicoService } from './servicio/eje-tematico.service';
import { TranslateService } from '@ngx-translate/core';


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


  rowId = 0;
  rows: any[];
  cols: any[];
  initialData1: any[];
  initialState1 = true;
  selectedRows: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 5;

  files: TreeNode[] = [];
  selectedFile: TreeNode;

  sourceRows: any[] = [];
  targetRows: any[] = [];

  initialData2: any[];
  initialState2 = true;


  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];

  constructor(private ejeTematicoService: EjeTematicoService,
    private messageService: MessageService,
    private translate: TranslateService) {
  }



  ngOnInit() {

    this.rows = [];
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subcribeServiceEjeTematico('', '');
    this.subscribeDependenciaLista('', '1');

    //this.subscribeEjesDisponiobles();
  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.cols = [
        { field: 'codigo', header: this.translate.instant('CUMCO016.TABLA1.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO016.TABLA1.headerTabla2') },
        { field: 'activo', header: this.translate.instant('CUMCO016.TABLA1.headerTabla3') }
      ];

    });
  }

  subscribeEjeTematicoDependencia(idDependencia: string) {
    var response: any[];
    this.ejeTematicoService.getEjeTematicoDependencia(idDependencia).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
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
              ejeTematico: isData[0]
            }
          );
        }
        }

        console.log(this.targetRows);

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

        console.log(this.sourceRows);


        if (this.initialState2) {
          this.initialData2 = [];
          for (const data of this.targetRows) {
            this.initialData2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialState2 = false;
        }

        //this.subscribeEjesDisponiobles();

        //this.updateEjeTematicoDependencia(this.ejetematicoDependenciaLista);
      });
  }

  subscribeDependenciaLista(descripcion: string, activo: string): any {
    this.ejeTematicoService.getDependenciaLista(descripcion, activo).subscribe(

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



  subcribeServiceEjeTematico(descripcion: string, activo: string): any {
    this.ejeTematicoService.getEjeTematico(descripcion, activo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.rows = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.rows.forEach(row =>
          row.state = 'noedit')

        if (this.initialState1) {
          this.initialData1 = [];
          for (const data of this.rows) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialState1 = false;
        }
      });
  }

  subcribeGuardarEjes(body: any) {
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
      },
      () => {                 // Fin del suscribe
        this.initialState1 = true;
        this.subcribeServiceEjeTematico('', '');
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
      console.log(responseDependencias);
      if(responseDependencias.length === 0){
        this.rows.find(row => row === this.selectedRows).state = this.selectedRows.state === 'delete' ? 'edit' : 'delete';
      }
      else{
        var nombresDependencias = '';

        for(var respDep of responseDependencias){
          nombresDependencias = nombresDependencias + '\"' + respDep.dependencia.nombre + '\", ';
        }

        console.log(nombresDependencias);

        const error = this.translate.instant('CUMCO016.MENSAJES.ejeTematicoEliminarErrorDepe', { 
                                              eje: responseDependencias[0].ejeTematico.descripcion,
                                              dependencias: nombresDependencias});
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
    let rows = [...this.rows];

    rows.push({
      rowId: this.rowId,
      id: '',
      codigo: '',
      codigo2: '',
      descripcion: '',
      activo: '1',
      state: 'new'
    })

    this.rows = rows;
    this.rowId = this.rowId + 1;
  }

  onClicEliminar() {
    if(this.selectedRows.isRadicado || this.selectedRows.isBorrador){
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

      for (let row of this.rows) {
        if (row.codigo == '' || row.state == 'new') {
          row.codigo2 = this.generarCodigo2();
        }
      }
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
    if(this.selectedFile){
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
      features.push({
        attributes: {
          "descripcion": tipo.descripcion,
          "id": tipo.id,
          "activo": tipo.activo,
          "codigo": tipo.codigo2 ? tipo.codigo2 : tipo.codigo
        },
        "state": tipo.state
      })

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
        dataSent.push({ id: newData.id, idEje: newData.ejeTematico.id, idDependencia: this.selectedFile.data, state: 'new' });
      }
      else {
        dataSent.push({ id: newData.id, idEje: newData.ejeTematico.id, idDependencia: this.selectedFile.data, state: 'noedit' });
      }
    }

    for (const delData of this.initialData2) {
      let isData = [];
      isData = this.targetRows.filter(data => data.id === delData.id);
      if (isData.length === 0) {
        dataSent.push({ id: delData.id, idEje: delData.ejeTematico.id, idDependencia: this.selectedFile.data, state: 'delete' });
      }
    }

    //console.log(dataSent);


    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "ejeTematico.id",
        "type": "input",
        "required": false
      },
      {
        "name": "dependencia.id",
        "type": "input",
        "required": false
      }
    ];
    let features = [];

    dataSent.forEach(tipo => {
      features.push({
        attributes: {
          "id": tipo.id,
          "ejeTematico.id": tipo.idEje,
          "dependencia.id": tipo.idDependencia
        },
        "state": tipo.state
      })

    })
    return {
      "grd_RelacionEjeTematicoDependencia": JSON.stringify({
        fields,
        features
      })
    };


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
      if (row.codigo2 !== '' && row.codigo2 !== undefined) {
        codNum = parseInt(row.codigo2);
      }
      else {
        codNum = parseInt(row.codigo);
      }
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
        codigoStr = (arrayCod.length + 1).toString();
        while (codigoStr.length < 5) {
          codigoStr = '0' + codigoStr;
        }
      }

      return codigoStr;

    }

  }

  onSourceSelect(event){
    console.log(event)

    var buttons: HTMLCollection;
    var buttons = document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only");

    var entro = false;
    for(var item of event.items){
      if(item.ejeTematico.isBorrador || item.ejeTematico.isRadicado){
        entro = true;
        break;
      }
    }

    if(entro){
      console.log('entro');
      buttons[0].setAttribute('disabled', 'true');
    }
    else{
      console.log('NO entro');
      buttons[0].removeAttribute('disabled');
    }


  }


  onTargetSelect(event){

    var buttons: HTMLCollection;
    var buttons = document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only");

    var entro = false;
    for(var item of event.items){
      if(item.ejeTematico.isBorrador || item.ejeTematico.isRadicado && item.id !== ''){
        entro = true;
        break;
      }
    }

    if(entro){
      buttons[2].setAttribute('disabled', 'true');
    }
    else{
      buttons[2].removeAttribute('disabled');
    }


  }

  onMoveToTarget(event){
    for(var item of event.items){
      if(item.ejeTematico.isBorrador || item.ejeTematico.isRadicado){
        this.sourceRows.push(item);
      }
    }
  }

  onMoveToSource(event){
    console.log(this.targetRows);
    console.log(this.sourceRows);
    console.log(event);
    for(var item of event.items){
      var element = this.targetRows.find(data => data.ejeTematico.id === item.ejeTematico.id)
      console.log(element);
      if (!element){
        if(item.id !== '' && (item.ejeTematico.isBorrador==1 || item.ejeTematico.isRadicado==1)){
          console.log('hola')
          this.targetRows.push(item);
          let index = this.sourceRows.indexOf(item);
          if(index !== -1){
            this.sourceRows = this.sourceRows.filter((val, i) => i !== index);
          }
        }
        
      }
    }
  }


}

export interface Row {
  id;
  codigo;
  descripcion;
  activo;
}
