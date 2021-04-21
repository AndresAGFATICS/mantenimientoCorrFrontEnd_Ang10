import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Cumco018Service } from './servicio/cumco018.service';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco018',
  templateUrl: './cumco018.component.html',
  styleUrls: ['./cumco018.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO018Component implements OnInit {

  msgs: Message[] = []; 

  //autocomplete 1 Ruta
  seleccionRutaFilter: any;
  dataRutaFilter: any[];
  suggestionsRutaFilter: any[];

  //autocomplete 2 Mensajería
  seleccionMensajeriaFilter: any;
  dataMensajeriaFilter: any[];
  suggestionsMensajeriaFilter: any[];

  //autocomplete 3 Empresa de Mensajería
  seleccionEmpresaFilter: any;
  dataEmpresaFilter: any[];
  suggestionsEmpresaFilter: any[];

  size = this.cumco018Service.generalSize;
  //size = 10;
  pageDep = 1;

  
  
  //TABLA 1
  cols1: any[];
  dataTable1: any[];
  initialDataTable1: any[];
  initialStateDataTable1 = true;
  selectedRowTable1: any;
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 20;
  idRow1 = 0;
  pageTable1 = 0;
  loading1: boolean;

  //TABLA 2
  cols2: any[];
  dataTable2: any[];
  initialDataTable2: any[];
  initialStateDataTable2 = true;
  selectedRowTable2: any;
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 20;
  idRow2 = 0;
  dataDependenciaTabla2: any[];
  suggestionsDependenciaTabla2: any[];
  suggestionsFuncionarioTabla2: any[];
  pageTable2 = 0;
  loading2: boolean;

  //TABLA 3
  cols3: any[];
  dataTable3: any[];
  initialDataTable3: any[];
  initialStateDataTable3 = true;
  selectedRowTable3: any;
  nRowsOptionsTable3 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable3 = 20;
  idRow3 = 0;
  pageTable3 = 0;
  loading3: boolean;

  constructor(private translate: TranslateService,
              private cumco018Service: Cumco018Service,
              private messageService: MessageService) { }

  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    this.subscribeGetRutas('');

    this.subscribeGetMensajero('');

    //this.subscribeGetDependencias('');

    this.subcribeGetOrganismoDependencia2('?page=' + String(this.pageDep) + '&size=' + String(this.size));

    this.subscribeGetEmpresaMensajeria('');

  }

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {
      this.translate.get(['']).subscribe(translations => {
      this.cols1 = [
        { field: 'rowIndex', header: '' },
        { field: 'codigo', header: this.translate.instant('CUMCO018.TABLA1.headerTabla1'), required: true },
        { field: 'descripcion', header: this.translate.instant('CUMCO018.TABLA1.headerTabla2'), required: true },
        { field: 'activo', header: this.translate.instant('CUMCO018.TABLA1.headerTabla3') }
      ];
      this.cols2 = [
        { field: 'rowIndex', header: '' },
        { field: 'codigo', header: this.translate.instant('CUMCO018.TABLA2.headerTabla1'), required: true},
        { field: 'dependencia.nombreCodigoGuion', header: this.translate.instant('CUMCO018.TABLA2.headerTabla2'), required: true },
        { field: 'funcionario.codigoNombre', header: this.translate.instant('CUMCO018.TABLA2.headerTabla3'), required: true },
        { field: 'activo', header: this.translate.instant('CUMCO018.TABLA2.headerTabla4') }
      ];
      this.cols3 = [
        { field: 'rowIndex', header: '' },
        { field: 'codigo', header: this.translate.instant('CUMCO018.TABLA3.headerTabla1'), required: true },
        { field: 'descripcion', header: this.translate.instant('CUMCO018.TABLA3.headerTabla2'), required: true },
        { field: 'activo', header: this.translate.instant('CUMCO018.TABLA3.headerTabla3') }
      ];
    });
  
  }


  subscribeGetRutas(parameters: string) {
    this.loading1 = true;
    let response: any[];
    this.cumco018Service.getRutas(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading1 = false;
      },
      () => {                 // Fin del suscribe
        this.dataTable1 = [];
        this.dataRutaFilter = [];
        for (const data of response) {
          this.dataTable1.push({ ...data, state: 'noedit' });
          this.dataRutaFilter.push({ ...data, codigoNombre: data.codigo + ' - ' + data.descripcion });
        }

        if (this.initialStateDataTable1) {
          this.initialDataTable1 = [];
          for (const data of this.dataTable1) {
            this.initialDataTable1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable1 = false;
        }
        this.loading1 = false;
      })

  }


  subscribePostRutas(body) {

    let responsePost: any;
    this.cumco018Service.postRutas(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable1 = true;
        this.seleccionRutaFilter = undefined;
        //this.showMessage('success', responsePost.message, ''); 
        this.showMessage('success', this.translate.instant('CUMCO018.MENSAJES.exitoGuardar'), '');
        this.subscribeGetRutas('');
      })

  }



  subscribeGetMensajero(parameters: string) {
    this.loading2 = true;
    let response: any[];
    this.cumco018Service.getMensajero(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading2 = false;
      },
      () => {                 // Fin del suscribe
        this.dataTable2 = [];
        this.dataMensajeriaFilter = [];
        for (const data of response) {
          data.dependencia.nombreCodigoGuion = data.dependencia.codigo + ' - ' + data.dependencia.nombre;
          this.dataTable2.push({ ...data, state: 'noedit'});
          this.dataMensajeriaFilter.push({ ...data, codigoNombre: data.codigo + ' ' + data.funcionario.codigoNombre });
        }

        if (this.initialStateDataTable2) {
          this.initialDataTable2 = [];
          for (const data of this.dataTable2) {
            this.initialDataTable2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable2 = false;
        }
        this.loading2 = false;
      })

  }

  subscribeGetDependencias(parameters: string){

    let response: any[];
    this.cumco018Service.getOrganismoDependencia(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataDependenciaTabla2 = [];
        for (const data of response) {
          this.dataDependenciaTabla2.push(data);
        }
      });

  }


  subcribeGetOrganismoDependencia2(getParameters: string) {
    if (this.pageDep === 1) {
      this.dataDependenciaTabla2 = [];
    }
    let responseData: any[];
    this.cumco018Service.getOrganismoDependencia(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.organismoDependenciaError'), getError.error.message);
      },
      () => {                 // Fin del suscribe

        for (var respData of responseData) {
          this.dataDependenciaTabla2.push({ ...respData });
        }

        if (responseData.length >= this.size) {
          this.pageDep = this.pageDep + 1;
          this.subcribeGetOrganismoDependencia2('?page=' + String(this.pageDep) + '&size=' + String(this.size));
        } else {
          this.dataDependenciaTabla2 = [...this.dataDependenciaTabla2];
          this.pageDep = 1;
          return;
        }


      });
  }

  subcribeServiceFuncionarioSuplente(getParameters: string) {
    this.cumco018Service.getFuncionarioSuplente(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.suggestionsFuncionarioTabla2 = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          this.showMessage('error', this.translate.instant('CUMCO001.MENSAJES.FuncionarioSuplenteError'), getError.error.message);
      },
      () => {                 // Fin del suscribe
    });
  }


  subscribePostMensajero(body) {

    let responsePost: any;
    this.cumco018Service.postMensajero(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable2 = true;
        this.seleccionMensajeriaFilter = undefined;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetMensajero('');
      })

  }


  subscribeGetEmpresaMensajeria(parameters: string) {
    this.loading3 = true;
    let response: any[];
    this.cumco018Service.getEmpresaMensajeria(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading3 = false;
      },
      () => {                 // Fin del suscribe
        this.dataTable3 = [];
        this.dataEmpresaFilter = [];
        for (const data of response) {
          this.dataTable3.push({ ...data, state: 'noedit'});
          this.dataEmpresaFilter.push({ ...data, codigoNombre: data.codigo + ' - ' + data.descripcion });
        }

        if (this.initialStateDataTable3) {
          this.initialDataTable3 = [];
          for (const data of this.dataTable3) {
            this.initialDataTable3.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable3 = false;
        }
        this.loading3 = false;
      })

  }

  subscribePostEmpresaMensajeria(body) {

    let responsePost: any;
    this.cumco018Service.postEmpresaMensajeria(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable3 = true;
        this.seleccionEmpresaFilter = undefined;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetEmpresaMensajeria('');
      })

  }




  // Metodos para Autocomplete Filtro 1 Rutas a los SERVICIOS -- Metodos para Autocomplete Filtro 1 Rutas a los SERVICIOS
  // Metodos para Autocomplete Filtro 1 Rutas a los SERVICIOS -- Metodos para Autocomplete Filtro 1 Rutas a los SERVICIOS
  

  onClickBorrarFiltroRuta() {
      this.seleccionRutaFilter = undefined;
      this.selectFiltroRuta();
  }

  focusOutFiltroRuta(){
    if (this.seleccionRutaFilter) {
      if (this.seleccionRutaFilter.id === undefined || this.seleccionRutaFilter.id === '') {
        this.seleccionRutaFilter = undefined;
        this.selectFiltroRuta();
      }
    }
    else if (this.seleccionRutaFilter === '') {
      this.seleccionRutaFilter = undefined;
      this.selectFiltroRuta();
    }
  }

  searchFiltroRuta(event){

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataRutaFilter.length; i++) {
      let data = this.dataRutaFilter[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsRutaFilter = filtered;

  }

  selectFiltroRuta(){

    const copyInitialData: any[] = [];
    for (const data of this.initialDataTable1) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if (this.seleccionRutaFilter) {
      if (this.seleccionRutaFilter.id !== undefined && this.seleccionRutaFilter.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.seleccionRutaFilter.id);
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

  // Metodos BOTONES TABLA 1 -- Metodos BOTONES TABLA 1
  // Metodos BOTONES TABLA 1 -- Metodos BOTONES TABLA 1

  onClickAgregar1(){

    let newElement = {
      idRow1: this.idRow1,
      id: '',
      codigo: this.generarCodigo1(),
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable1 = [...this.dataTable1, newElement];
    this.initialDataTable1 = [...this.initialDataTable1, newElement];
    this.idRow1 += 1;

    const newPage = Math.trunc(this.dataTable1.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;

  }

  onClickEliminar1(){

    if (this.selectedRowTable1 && this.selectedRowTable1.isRadicado === 1) {
      const error = this.translate.instant('CUMCO018.MENSAJES.eliminarRutaError',
        { ruta: this.selectedRowTable1.descripcion });
      this.showMessage("error", error, '');

      return;
    }
    else if (this.selectedRowTable1.state !== 'new'){
      this.dataTable1.find(row => row === this.selectedRowTable1).state = this.selectedRowTable1.state === 'delete' ? 'edit' : 'delete';
      this.editedTable1('');
    }
    else if (this.selectedRowTable1 && this.selectedRowTable1.state === 'new') {
      let index = this.dataTable1.indexOf(this.selectedRowTable1);
      this.dataTable1 = this.dataTable1.filter((val, i) => i !== index);
      this.initialDataTable1 = this.initialDataTable1.filter((val, i) => i !== index);
      
      this.selectedRowTable1 = undefined;
    }

  }

  onClickGuardar1(){

    if (!this.validarCamposVacios1()) {
      return
    }
    else if (!this.validarRepetidos1()) {
      return
    }
    else {
      this.subscribePostRutas(this.buildJsonRutas1());
    }

  }


  // Métodos para Autocomplete Filtro 2 Mensajería  -- Métodos para Autocomplete Filtro 2 Mensajería 
  // Métodos para Autocomplete Filtro 2 Mensajería --  Métodos para Autocomplete Filtro 2 Mensajería 
  

  onClickBorrarFiltroMensajeria() {
    this.seleccionMensajeriaFilter = undefined;
    this.selectFiltroMensajeria();
  }

  searchMensajeriaFilter(event){

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataMensajeriaFilter.length; i++) {
      let data = this.dataMensajeriaFilter[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsMensajeriaFilter = filtered;

  }

  selectFiltroMensajeria(){

    
    const copyInitialData: any[] = [];
    for (const data of this.initialDataTable2) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if (this.seleccionMensajeriaFilter) {
      if (this.seleccionMensajeriaFilter.id !== undefined && this.seleccionMensajeriaFilter.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.seleccionMensajeriaFilter.id);
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


  focusOutFiltroMensajeria(){
    if (this.seleccionMensajeriaFilter) {
      if (this.seleccionMensajeriaFilter.id === undefined || this.seleccionMensajeriaFilter.id === '') {
        this.seleccionMensajeriaFilter = undefined;
        this.selectFiltroMensajeria();
      }
    }
    else if (this.seleccionMensajeriaFilter === '') {
      this.seleccionMensajeriaFilter = undefined;
      this.selectFiltroMensajeria();
    }
  }

  // Métodos para Autocomplete TABLA 2 Mensajería  -- Métodos para Autocomplete TABLA 2 Mensajería 
  // Métodos para Autocomplete TABLA 2 Mensajería --  Métodos para Autocomplete TABLA 2 Mensajería 

  onClickElminiarSelected2(){
    this.selectedRowTable2 = undefined;
  }

  searchDependencia2(event){
    this.selectedRowTable2 = undefined;

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataDependenciaTabla2.length; i++) {
      let data = this.dataDependenciaTabla2[i];
      if (data.nombreCodigoGuion.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsDependenciaTabla2 = filtered;
  }
  

  selectDependenciaTable2(rowIndex, $event){
    this.dataTable2[rowIndex].funcionario = {id: ''};
    this.editedTable2('');
  }

  focusOutTablaDependencia2(rowIndex){
    if (this.dataTable2[rowIndex].dependencia) {
      if (this.dataTable2[rowIndex].dependencia.id === undefined) {
        this.dataTable2[rowIndex].dependencia = {id: ''};
        this.dataTable2[rowIndex].funcionario = {id: ''};
      }
    }
    else if (this.dataTable2[rowIndex].dependencia === '') {
      this.dataTable2[rowIndex].dependencia = {id: ''};
      this.dataTable2[rowIndex].funcionario = {id: ''};
    }
    this.editedTable2('');

  }


  searchFuncionario2(event, row){
    this.selectedRowTable2 = undefined;
    if (row.dependencia.id !== '' || row.dependencia.id !== undefined){
      this.subcribeServiceFuncionarioSuplente('?activo=1&ausente=0&idDependencia=' +  String(row.dependencia.id)  + '&codigoNombre=' + event.query );
    }
  }

  focusOutFuncionarioTable2(rowIndex){
    if (this.dataTable2[rowIndex].funcionario) {
      if (this.dataTable2[rowIndex].funcionario.id === undefined) {
        this.dataTable2[rowIndex].funcionario = {id: ''};
      }
    }
    else if (this.dataTable2[rowIndex].funcionario === '') {
      this.dataTable2[rowIndex].funcionario = {id: ''};
    }
    this.editedTable2('');

  }


  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2
  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2


  onClickAgregar2(){

    let newElement = {
      idRow2: this.idRow2,
      id: '',
      dependencia: {id: '', nombreCodigoGuion: ''},
      codigo: this.generarCodigo2(),
      funcionario: {id: ''},
      activo: 1,
      state: 'new',
    }
    this.dataTable2 = [...this.dataTable2, newElement];
    this.initialDataTable2 = [...this.initialDataTable2, newElement];
    this.idRow2 += 1;

    const newPage = Math.trunc(this.dataTable2.length/this.nRowsTable2) * this.nRowsTable2;
    this.pageTable2 = newPage;

  }

  onClickEliminar2(){

    if (this.selectedRowTable2 && this.selectedRowTable2.isRadicado === 1) {
      const error = this.translate.instant('CUMCO018.MENSAJES.eliminarMensajeroError',
        { mensajero: this.selectedRowTable2.codigo + ' ' + this.selectedRowTable2.funcionario.nombre });
      this.showMessage("error", error, '');

      return;
    }
    else if (this.selectedRowTable2.state !== 'new'){
      this.dataTable2.find(row => row === this.selectedRowTable2).state = this.selectedRowTable2.state === 'delete' ? 'edit' : 'delete';
      this.editedTable2('');
    }
    else if (this.selectedRowTable2 && this.selectedRowTable2.state === 'new') {
      let index = this.dataTable2.indexOf(this.selectedRowTable2);
      this.dataTable2 = this.dataTable2.filter((val, i) => i !== index);
      this.initialDataTable2 = this.initialDataTable2.filter((val, i) => i !== index);
      this.selectedRowTable2 = undefined;
    }

  }

  onClickGuardar2(){

    if (!this.validarCamposVacios2()) {
      return;
    }
    else if (!this.validarRepetidos2()) {
      return;
    }
    else {  
      this.subscribePostMensajero(this.buildJsonRutas2());
    }

  }



  // Métodos para Autocomplete Filtro 3 Empresa  -- Métodos para Autocomplete Filtro 3 Empresa  
  // Métodos para Autocomplete Filtro 3 Empresa  -- Métodos para Autocomplete Filtro 3 Empresa  
  

  onClickBorrarFiltroEmpresa() {
    this.seleccionEmpresaFilter = undefined;
    this.selectEmpresaFilter();
  }

  searchEmpresaFilter(event){

    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataEmpresaFilter.length; i++) {
      let data = this.dataEmpresaFilter[i];
      if (data.codigoNombre.toLowerCase().search(query.toLowerCase()) !== -1) {
        filtered.push(data);
      }
    }

    this.suggestionsEmpresaFilter = filtered;

  }

  selectEmpresaFilter(){

    const copyInitialData: any[] = [];
    for (const data of this.initialDataTable3) {
      copyInitialData.push(JSON.parse(JSON.stringify(data)));
    }

    let filtered: any[] = [];
    if (this.seleccionEmpresaFilter) {
      if (this.seleccionEmpresaFilter.id !== undefined && this.seleccionEmpresaFilter.id !== '') {
        filtered = copyInitialData.filter(data => data.id === this.seleccionEmpresaFilter.id);
      }
      else {
        copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
      }
    }
    else {
      copyInitialData.forEach(data => filtered.push(JSON.parse(JSON.stringify(data))));
    }

    this.dataTable3 = filtered;
  }


  focusOutFiltroEmpresa(){
    if (this.seleccionEmpresaFilter) {
      if (this.seleccionEmpresaFilter.id === undefined || this.seleccionEmpresaFilter.id === '') {
        this.seleccionEmpresaFilter = undefined;
        this.selectEmpresaFilter();
      }
    }
    else if (this.seleccionEmpresaFilter === '') {
      this.seleccionEmpresaFilter = undefined;
      this.selectEmpresaFilter();
    }
  }



  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2
  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2


  onClickAgregar3(){

    let newElement = {
      idRow3: this.idRow3,
      id: '',
      codigo: this.generarCodigo3(),
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable3 = [...this.dataTable3, newElement];
    this.initialDataTable3 = [...this.initialDataTable3, newElement];
    this.idRow3 += 1;

    const newPage = Math.trunc(this.dataTable3.length/this.nRowsTable3) * this.nRowsTable3;
    this.pageTable3 = newPage;

  }

  onClickEliminar3(){

    if (this.selectedRowTable3 && this.selectedRowTable3.isRadicado === 1) {
      const error = this.translate.instant('CUMCO018.MENSAJES.eliminarEmpresaError',
        { empresa: this.selectedRowTable3.descripcion });
      this.showMessage("error", error, '');
      return;
    }
    else if (this.selectedRowTable3.state !== 'new'){
      this.dataTable3.find(row => row === this.selectedRowTable3).state = this.selectedRowTable3.state === 'delete' ? 'edit' : 'delete';
      this.editedTable3('');
    }
    else if (this.selectedRowTable3 && this.selectedRowTable3.state === 'new') {
      let index = this.dataTable3.indexOf(this.selectedRowTable3);
      this.dataTable3 = this.dataTable3.filter((val, i) => i !== index);
      this.initialDataTable3 = this.initialDataTable3.filter((val, i) => i !== index);
      this.selectedRowTable3 = undefined;
    }

  }

  onClickGuardar3(){

    if (!this.validarCamposVacios3()) {
      return;
    }
    else if (!this.validarRepetidos3()) {
      return;
    }
    else {  
      this.subscribePostEmpresaMensajeria(this.buildJsonRutas3());
    }

  }
 


  // Metodos VALIDACION Campos Tabla1 -- Metodos VALIDACION Campos Tabla1
  // Metodos VALIDACION Campos Tabla1 -- Metodos VALIDACION Campos Tabla1

  validarCamposVacios1(): any {
    for (var _i = 0; _i < this.dataTable1.length; _i++) {
      if (this.dataTable1[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO018.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO018.TABLA1.headerTabla2') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos1(): any {

    for (var _i = 0; _i < this.dataTable1.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable1.length; _k++) {
        if (this.dataTable1[_k].descripcion.toLowerCase().trim() === this.dataTable1[_i].descripcion.toLowerCase().trim() && 
            this.dataTable1[_i].state !== 'delete' && this.dataTable1[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO018.MENSAJES.campoRutaRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              ruta: this.dataTable1[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }

    if (this.seleccionRutaFilter) {

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

            if (filteredInitialData[_k].descripcion.toLowerCase().trim() === this.dataTable1[_i].descripcion.toLowerCase().trim()) {

              const error = this.translate.instant('CUMCO018.MENSAJES.campoRutaRepetidoFiltroError',
                {
                  filaRep1: String(_i + 1),
                  ruta: this.dataTable1[_i].descripcion
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
      if (this.dataTable2[_i].dependencia.id === '' || this.dataTable2[_i].dependencia.id === undefined){
        const error = this.translate.instant('CUMCO018.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO018.TABLA2.headerTabla2') });
        this.showMessage('error', error, '');
        return false;
      }
      else if (this.dataTable2[_i].funcionario.id === '' || this.dataTable2[_i].funcionario.id === undefined) {
        const error = this.translate.instant('CUMCO018.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO018.TABLA2.headerTabla3') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos2(): any {

    for (var _i = 0; _i < this.dataTable2.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable2.length; _k++) {
        if (this.dataTable2[_k].funcionario.id === this.dataTable2[_i].funcionario.id && 
            this.dataTable2[_i].state !== 'delete' && this.dataTable2[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO018.MENSAJES.campoMensajeroRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              mensajero: this.dataTable2[_k].funcionario.codigoNombre
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }

    if (this.seleccionMensajeriaFilter) {

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

            if (filteredInitialData[_k].funcionario.id  === this.dataTable2[_i].funcionario.id ) {

              const error = this.translate.instant('CUMCO018.MENSAJES.campoMensajeroRepetidoFiltroError',
                {
                  filaRep1: String(_i + 1),
                  mensajero: this.dataTable2[_i].funcionario.codigoNombre
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


  validarCamposVacios3(): any {
    for (var _i = 0; _i < this.dataTable3.length; _i++) {
      if (this.dataTable3[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO018.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO018.TABLA3.headerTabla2') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos3(): any {

    for (var _i = 0; _i < this.dataTable3.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable3.length; _k++) {
        if (this.dataTable3[_k].descripcion.toLowerCase().trim() === this.dataTable3[_i].descripcion.toLowerCase().trim() && 
            this.dataTable3[_i].state !== 'delete' && this.dataTable3[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO018.MENSAJES.campoEmpresaRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              empresa: this.dataTable3[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }

    if (this.seleccionEmpresaFilter) {

      var filteredInitialData = [];

      for (const iniData of this.initialDataTable3) {
        if (iniData.state !== 'new') {
          let isData = [];
          isData = this.dataTable3.filter(data => data.id === iniData.id);
          if (isData.length === 0) {
            filteredInitialData.push(iniData);
          }
        }
      }


      for (var _i = 0; _i < this.dataTable3.length; _i++) {
        for (var _k = 0; _k < filteredInitialData.length; _k++) {

          if (this.dataTable1[_i].state !== 'delete') {

            if (filteredInitialData[_k].descripcion.toLowerCase().trim() === this.dataTable3[_i].descripcion.toLowerCase().trim()) {

              const error = this.translate.instant('CUMCO018.MENSAJES.campoEmpresaRepetidoFiltroError',
                {
                  filaRep1: String(_i + 1),
                  empresa: this.dataTable3[_i].descripcion
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

  buildJsonRutas1(){
    var dataSend = [];
    for(var data1 of this.dataTable1){
      if (data1.state !== 'noedit'){
        dataSend.push( {
          id: data1.id,
          descripcion: data1.descripcion,
          codigo: data1.codigo,
          activo: data1.activo,
          isRadicado: data1.isRadicado,
          state: data1.state
        });

      }
    }

    return(dataSend);
  }

  buildJsonRutas2(){
    var dataSend = [];
    for(var data2 of this.dataTable2){
      if (data2.state !== 'noedit'){
        dataSend.push( {
          id: data2.id,
          funcionario: {id: data2.funcionario.id} ,
          dependencia: data2.dependencia,
          codigo: data2.codigo,
          activo: data2.activo,
          isRadicado: data2.isRadicado,
          state: data2.state
        });

      }
    }

    return(dataSend);
  }

  buildJsonRutas3(){
    var dataSend = [];
    for(var data3 of this.dataTable3){
      if (data3.state !== 'noedit'){
        dataSend.push( {
          id: data3.id,
          descripcion: data3.descripcion,
          codigo: data3.codigo,
          activo: data3.activo,
          isRadicado: data3.isRadicado,
          state: data3.state
        });

      }
    }

    return(dataSend);
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




  generarCodigo1(): any {

    var arrayCod = [];
    for (let data of this.initialDataTable1) {
      let codNum;
      codNum = parseInt(data.codigo);
      if (!isNaN(codNum)) {
        arrayCod.push(codNum);
      }
    }

    arrayCod = arrayCod.sort(function (a, b) {
      return a - b;
    });

    if (arrayCod.length === 0) {
      return '001';
    }
    else if (arrayCod[0] !== 1) {
      return '001';
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
        while (codigoStr.length < 3) {
          codigoStr = '0' + codigoStr;
        }
      }
      else {
        codigoStr = (arrayCod.length + 1).toString();
        while (codigoStr.length < 3) {
          codigoStr = '0' + codigoStr;
        }
      }

      return codigoStr;

    }

  }

  generarCodigo2(): any {

    var arrayCod = [];
    for (let data of this.initialDataTable2) {
      let codNum;
      codNum = parseInt(data.codigo);
      if (!isNaN(codNum)) {
        arrayCod.push(codNum);
      }
    }

    arrayCod = arrayCod.sort(function (a, b) {
      return a - b;
    });

    if (arrayCod.length === 0) {
      return '001';
    }
    else if (arrayCod[0] !== 1) {
      return '001';
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
        while (codigoStr.length < 3) {
          codigoStr = '0' + codigoStr;
        }
      }
      else {
        codigoStr = (arrayCod.length + 1).toString();
        while (codigoStr.length < 3) {
          codigoStr = '0' + codigoStr;
        }
      }

      return codigoStr;

    }

  }

  generarCodigo3(): any {

    var arrayCod = [];
    for (let data of this.initialDataTable3) {
      let codNum;
      codNum = parseInt(data.codigo);
      if (!isNaN(codNum)) {
        arrayCod.push(codNum);
      }
    }

    arrayCod = arrayCod.sort(function (a, b) {
      return a - b;
    });

    if (arrayCod.length === 0) {
      return '001';
    }
    else if (arrayCod[0] !== 1) {
      return '001';
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
        while (codigoStr.length < 3) {
          codigoStr = '0' + codigoStr;
        }
      }
      else {
        codigoStr = (arrayCod.length + 1).toString();
        while (codigoStr.length < 3) {
          codigoStr = '0' + codigoStr;
        }
      }

      return codigoStr;

    }

  }
  




}
