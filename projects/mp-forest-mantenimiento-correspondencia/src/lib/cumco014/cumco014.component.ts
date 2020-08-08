import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Cumco014Service } from './servicio/cumco014.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-cumco014',
  templateUrl: './cumco014.component.html',
  styleUrls: ['./cumco014.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO014Component implements OnInit {
  respuestaGuardarRadicado: any;
  responseGetSubcribe: any[];


  constructor(private cumco014Service: Cumco014Service,
    private messageService: MessageService,
    private translate: TranslateService) {

    this.idRow = 0;
    this.idRow2 = 0;
    this.idRow3 = 0;
    this.suggestionsAutoCompleteSubTipoRadicado = [];
  }

  // Variables para los mensajes
  msgs: Message[] = [];
  msgs2: Message[] = [];


  cols: any[];
  seleccionRadicado: any;
  listaRadicado: any[];

  cols2: any[];
  seleccionSubRadicado: any;
  listaSubRadicado: any[];

  seleccionCategoria: any;
  listadoCategoria: any[];

  tablaTipoRadicado: Radicado[];
  seleccionTablaRadicado: any;
  idRow: number;
  idRow2: number;

  suggestionsAutoCompleteSubTipoRadicado: any[];
  respSubtipoRadicado: any[];

  tableTextAutoCompleteTramite: string;
  suggestionsAutoCompleteTramite: any[];
  response: any[];

  seleccionTablaSubRadicado: any;


  //Variables Tabla 3
  dataTable3: any[] = [];
  selectionTable3: any;
  initialDataTable3: any[];
  initialStateTablae3 = true;
  cols3: any[];
  idRow3: number;

  //Variables Tabla 4
  dataTable4: any[] = [];
  selectionTable4: any;
  initialDataTable4: any[];
  initialStateTablae4 = true;
  cols4: any[];
  idRow4: number;


  //Variables Tabla 4
  seleccionSubRadicado5: any;
  seleccionRadicado5: any;
  dataTable5: any[] = [];
  selectionTable5: any;
  initialDataTable5: any[];
  initialStateTablae5 = true;
  cols5: any[];
  idRow5: number;
  suggestionsAutoCompleteSubTipoRadicado5: any[];
  suggestionsRequisito5: any[];




  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subscribeRadicado('');
    this.subscribeTablaRadicado('');

    this.subcribeSetColumns();

    this.subscribeCategoria2('');

    this.subscribeGetRequisito('');
  }

  

  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS
  // Metodos para SUSCRIBIRSE a los SERVICIOS -- Metodo para SUSCRIBIRSE a los SERVICIOS

  subcribeSetColumns() {

    this.translate.get(['']).subscribe(translations => {
    this.cols = [
      { field: 'id', header: this.translate.instant('CUMCO014.TABLA1.headerTabla0') },
      { field: 'codigo', header: this.translate.instant('CUMCO014.TABLA1.headerTabla1') },
      { field: 'descripcion', header: this.translate.instant('CUMCO014.TABLA1.headerTabla2') },
      { field: 'categoria.codigoDescripcion', header: this.translate.instant('CUMCO014.TABLA1.headerTabla3') },
      { field: 'activo', header: this.translate.instant('CUMCO014.TABLA1.headerTabla4') }
    ];
    this.cols2 = [
      { field: 'id', header: this.translate.instant('CUMCO014.TABLA2.headerTabla1') },
      { field: 'codigo', header: this.translate.instant('CUMCO014.TABLA2.headerTabla2') },
      { field: 'nombre', header: this.translate.instant('CUMCO014.TABLA2.headerTabla3') },
      { field: 'clase_documental', header: this.translate.instant('CUMCO014.TABLA2.headerTabla4') },
      { field: 'item_4', header: this.translate.instant('CUMCO014.TABLA2.headerTabla5') },
      { field: 'item_5', header: this.translate.instant('CUMCO014.TABLA2.headerTabla6') },
      { field: 'item_6', header: this.translate.instant('CUMCO014.TABLA2.headerTabla7') },
      { field: 'item_7', header: this.translate.instant('CUMCO014.TABLA2.headerTabla8') },
      { field: 'item_8', header: this.translate.instant('CUMCO014.TABLA2.headerTabla9') },
      { field: 'item_9', header: this.translate.instant('CUMCO014.TABLA2.headerTabla10') },
      { field: 'item_10', header: this.translate.instant('CUMCO014.TABLA2.headerTabla11') },
      { field: 'item_11', header: this.translate.instant('CUMCO014.TABLA2.headerTabla12') }
    ];
    this.cols3 = [
      { field: 'rowIndex', header: this.translate.instant('CUMCO014.TABLA3.headerTabla0')},
      { field: 'codigo', header: this.translate.instant('CUMCO014.TABLA3.headerTabla1') },
      { field: 'nombre', header: this.translate.instant('CUMCO014.TABLA3.headerTabla2') },
      { field: 'clase_documental', header: this.translate.instant('CUMCO014.TABLA3.headerTabla3') }
    ];
    this.cols4 = [
      { field: 'codigo', header: this.translate.instant('CUMCO014.TABLA4.headerTabla0')},
      { field: 'nombre', header: this.translate.instant('CUMCO014.TABLA4.headerTabla1') },
      { field: 'descripcion', header: this.translate.instant('CUMCO014.TABLA4.headerTabla2') },
      { field: 'activo', header: this.translate.instant('CUMCO014.TABLA4.headerTabla3') },
      { field: 'requerido', header: this.translate.instant('CUMCO014.TABLA4.headerTabla4') },
      { field: 'idArchivo', header: this.translate.instant('CUMCO014.TABLA4.headerTabla5') }
    ];
    this.cols5 = [
      { field: 'requisito.nombre', header: this.translate.instant('CUMCO014.TABLA5.headerTabla0')}
    ];

    });

  }

  subscribeRadicado(codigo: any) {
    this.cumco014Service.getTipoRadicado(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaRadicado = [];
        getRes.forEach(res => {

          this.listaRadicado.push(res);
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

  subscribeCategoria(codigo: any) {
    this.cumco014Service.getCategoriaradicado(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.listadoCategoria = [];
        getRes.forEach(res => {
          this.listadoCategoria.push(res);
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

  subscribeTablaRadicado(codigo: any) {
    this.cumco014Service.getTablaTipoRadicado(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.tablaTipoRadicado = [];
        getRes.forEach(res => {

          this.tablaTipoRadicado.push({
              idRow: '',
              id: res.id,
              codigo: res.codigo,
              descripcion: res.descripcion,
              codigoDescripcion: res.codigoDescripcion,
              codigoDescripcionGuion: res.codigoDescripcionGuion,
              categoria: {
                id: res.categoria.id,
                codigo: res.categoria.codigo,
                descripcion: res.categoria.descripcion,
                codigoDescripcion: res.categoria.codigoDescripcion,
                codigoDescripcionGuion: res.categoria.codigoDescripcionGuion,
                requisitos: res.categoria.requisitos,
                editable: res.categoria.editable,
                activo: res.categoria.activo
              },
              activo: res.activo,
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

  subcribeRecorridoRepartoFisico(body: any) {
    this.cumco014Service.postGuardarRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarRadicado = getRes;
        this.showMessage(getRes.message, "error");
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        this.showMessage(this.respuestaGuardarRadicado.message, "success");
        this.actualizarTablaRadicado();
      });
  }

  subscribeSubRadicado(parameters: any) {
    this.cumco014Service.getSubTipoRadicado(parameters).subscribe( //?idTipo=81&codigoTramiteDescripcion=&activo=1

      (getRes: any[]) => {     // Inicio del suscribe
        this.listaSubRadicado = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.listaSubRadicado.forEach(data => data.state = 'noedit');
        this.suggestionsAutoCompleteSubTipoRadicado = [];
        for (var subRad of this.listaSubRadicado){
          this.suggestionsAutoCompleteSubTipoRadicado.push(subRad.descripcion);
        }
       
      });
  }

  subcribeServiceSubTipoRadicado(getParameters: string) {
    this.cumco014Service.getSubTipoRadicado(getParameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.respSubtipoRadicado = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
          console.log('GET call in subcribeServiceSubTipoRadicado: ', getError);
          this.messageService.add({key: 'topMessage', severity:'error', summary: 'Error al obtener Subtipos de Radicados', detail: getError.error.message});
      },
      () => {                 // Fin del suscribe
        console.log(this.respSubtipoRadicado);
        this.suggestionsAutoCompleteSubTipoRadicado = [];
        for (var subRad of this.respSubtipoRadicado){
          this.suggestionsAutoCompleteSubTipoRadicado.push(subRad.descripcion);
        }
    });
  }

  subscribeGetTramite(parameters: any) {
    this.cumco014Service.getTramiteActivo(parameters).subscribe( 
      (getRes: any[]) => {     // Inicio del suscribe
        this.response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.suggestionsAutoCompleteTramite = [];
        for (var data of this.response){
          this.suggestionsAutoCompleteTramite.push(data);
        }
        console.log(this.suggestionsAutoCompleteTramite);
       
      });
  }

  subcribePostSubtipoRadicado(body: any) {
    this.cumco014Service.postGuardarSubtipoRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarRadicado = getRes;
        this.showMessage2(getRes.message, "error");
        console.log(getRes);
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage2(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        if (this.respuestaGuardarRadicado.message === 'La descripció  no puede eliminarse porque tiene radicados asociados'){
          const eliminarSubRadicado = this.listaSubRadicado.filter(data => data.state === 'delete')
          const error = this.translate.instant('CUMCO014.MENSAJES.elminarSubtipoRadicadoError', 
                                                {descripcion: eliminarSubRadicado[0].descripcion});
          this.showMessage2(error, "error");
        }
        else{
          this.subscribeSubRadicado('?idTipo=' + this.seleccionTablaRadicado.id);
          this.showMessage2(this.respuestaGuardarRadicado.message, "success");
        }
        
        
      });
  }


  subscribeCategoria2(codigo: any) {
    this.cumco014Service.getCategoriaRadicado2(codigo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.dataTable3 = [];
        getRes.forEach(res => {
          this.dataTable3.push(res);
        })
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable3.forEach(data => data.state = 'noedit' );

        if (this.initialStateTablae3){
          this.initialDataTable3 = [];
          for (const data of this.dataTable3) {
            this.initialDataTable3.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTablae3 = false;
        }
      });
  } 

  subscribeRevisarRelacionCategoriaTipoRadicado(): any{
    var reviRelacionCargoriaTiporadicago: any[];
    var notRelated = true;
    this.cumco014Service.getTipoRadicado('').subscribe(
      (getRes: any) => {     // Inicio del suscribe
        reviRelacionCargoriaTiporadicago = getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage2(error, "error");
      },
      () => {                 // Fin del suscribe
        for(var _i = 0; _i < reviRelacionCargoriaTiporadicago.length; _i++){
          if(reviRelacionCargoriaTiporadicago[_i].categoria.id === this.selectionTable3.id){
            notRelated = false;
            const error = this.translate.instant('CUMCO014.MENSAJES.elminarCategoriaError',
                                        {descripcion: this.selectionTable3.codigoDescripcionGuion });
            this.showMessage(error, "error");
            return;
          }
        }

        if(notRelated){
          if (this.selectionTable3 && this.selectionTable3.state !== 'new') {
            this.dataTable3.find(row => row === this.selectionTable3).state = this.selectionTable3.state === 'delete' ? 'edit' : 'delete';
          } else if (this.selectionTable3 && this.selectionTable3.state === 'new') {
            let index = this.dataTable3.indexOf(this.selectionTable3);
            this.dataTable3 = this.dataTable3.filter((val, i) => i !== index);
            this.selectionTable3 = undefined;
          }
        }
        
      });
    return notRelated;
  }

  subcribePostCategoriaRadicado(body: any){
    
    this.cumco014Service.postCategoriaRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarRadicado = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        if (this.respuestaGuardarRadicado.message === 'La descripció  no puede eliminarse porque tiene radicados asociados'){
          const eliminarSubRadicado = this.listaSubRadicado.filter(data => data.state === 'delete')
          const error = this.translate.instant('CUMCO014.MENSAJES.elminarSubtipoRadicadoError', 
                                                {descripcion: eliminarSubRadicado[0].descripcion});
          this.showMessage(error, "error");
        }
        else{
          this.initialStateTablae3 = true,
          this.subscribeCategoria2('');
          this.showMessage(this.respuestaGuardarRadicado.message, "success");
        }
        
        
      });

  }



  subscribeGetRequisito(parameters: any) {
    var responseData: any[]; 
    this.cumco014Service.getRequisitos(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        //for (var data of this.response){
        //  this.suggestionsAutoCompleteTramite.push(data);
        //}
        this.dataTable4 = responseData;
        console.log(this.dataTable4);
      });
  }

  subscribeGetRequisitosAsociadoRadicado(parameters: any) {
    var responseData: any[]; 
    this.cumco014Service.getRequisitosAsociadoRadicado(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        //for (var data of this.response){
        //  this.suggestionsAutoCompleteTramite.push(data);
        //}
        this.dataTable5 = responseData;
      });
  }


  subscribeSubRadicado5(parameters: any) {
    this.cumco014Service.getSubTipoRadicado(parameters).subscribe( //?idTipo=81&codigoTramiteDescripcion=&activo=1

      (getRes: any[]) => {     // Inicio del suscribe
        this.suggestionsAutoCompleteSubTipoRadicado5 = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
      });
  }

  subscribeGetRequisito5(parameters: any) {
    var responseData: any[]; 
    this.cumco014Service.getRequisitos(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        //for (var data of this.response){
        //  this.suggestionsAutoCompleteTramite.push(data);
        //}
        this.suggestionsRequisito5 = responseData;
        console.log(this.suggestionsRequisito5)
      });
  }


  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchRadicado(event) {
    this.subscribeRadicado(event.query ? event.query : '');
    console.log(this.listadoCategoria);
  }

  searchSubRadicado(event) {
    this.subcribeServiceSubTipoRadicado('?idTipo=' + this.seleccionTablaRadicado.id + '&descripcion=' + event.query); 
    console.log(this.suggestionsAutoCompleteSubTipoRadicado);
    console.log(event);
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.codigo); //?codigoDescripcion=' + event.query
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchCategoria(event) {
    this.subscribeCategoria(event.query ? event.query : '')
  }


  searchFilterTramite(event) {
    this.subscribeGetTramite('?activo=1' + '&codigoDescripcion=' + event.query);
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchSubRadicado5(event) {
    this.subscribeSubRadicado5('?idTipo=' + this.seleccionRadicado5.id + '&descripcion=' + event.query); 
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.codigo); //?codigoDescripcion=' + event.query
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchRquisistos5(event) {
    this.subscribeGetRequisito5('?nombreDescripcion=' + event.query + '&activo=1') //?nombreDescripcion= =pru
  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  onSelectSubtipoRadicado(){
    this.subscribeSubRadicado('?idTipo=' + this.seleccionTablaRadicado.id + '&descripcion=' + this.seleccionSubRadicado5);
    //this.subscribeSubRadicado('?idTipo=' + this.seleccionTablaRadicado.codigo + '&idTramite=' + this.seleccionSubRadicado.id ); // idTipo=2&idTramite=102
  }


  onSelectTipoRadicado5(){
    this.seleccionSubRadicado5 = undefined;
  }

  onSelectSubtipoRadicado5(){
    this.subscribeGetRequisitosAsociadoRadicado('?idTramiteTipoRadicado=' + this.seleccionSubRadicado5.id); // ?idTramiteTipoRadicado=281
  }

  onSelectTramite(rowData: any, rowIndex : any){
    this.editedSubTipoRadicado(rowIndex);
  }


  // Eventos CLICK en Botones -- Eventos de CLICK en Botones
  // Eventos CLICK en Botones -- Eventos de CLICK en Botones

  onClicBorrarAutoCompleteRadicado() {
    this.seleccionRadicado = undefined;
    this.actualizarTablaRadicado();
  }

  onClicAgregarRadicado() {
    let element = {
      idRow: this.idRow,
      id: '',
      codigo: '',
      descripcion: '',
      codigoDescripcion: '',
      codigoDescripcionGuion: '',
      categoria: {
        id: '',
        codigo: '',
        descripcion: '',
        codigoDescripcion: '',
        codigoDescripcionGuion: '',
        requisitos: 0,
        editable: 1,
        activo: 1
      },
      activo: 1,
      state: 'new'
    }
    this.tablaTipoRadicado = [...this.tablaTipoRadicado, element];
    this.idRow += 1;
  }

  onClicEliminarRadicado() {
    if(this.seleccionTablaRadicado && this.listaSubRadicado.length !== 0){
      const error = this.translate.instant('CUMCO014.MENSAJES.elminarTipoRadicadoError',
                      {descripcion: this.seleccionTablaRadicado.descripcion });
                      this.showMessage(error, "error");
      return;
    }

    else if (this.seleccionTablaRadicado && this.seleccionTablaRadicado.state !== 'new') {
      this.tablaTipoRadicado.find(row => row === this.seleccionTablaRadicado).state = this.seleccionTablaRadicado.state === 'delete' ? 'edit' : 'delete';
    } else if (this.seleccionTablaRadicado && this.seleccionTablaRadicado.state === 'new') {
      let index = this.tablaTipoRadicado.indexOf(this.seleccionTablaRadicado);
      this.tablaTipoRadicado = this.tablaTipoRadicado.filter((val, i) => i !== index);
      this.seleccionTablaRadicado = undefined;
    }
  }

  onClicGuardarRadicado() {
    if (!this.camposValidosRadicado()) {
      const error = this.translate.instant('CUMCO014.MENSAJES.errorGuardar');
      this.showMessage(error, "error");
   } else if (!this.validarRepetidosRadicado()) {
     return;
   } else {
     this.subcribeRecorridoRepartoFisico(this.buildJsonRadicado());
    }
 }



  onClicAgregarSubRadicado() {

    let newElement = {
      idRow2: this.idRow2,
      id: '',
      activo: 1,
      anonimo: 0,
      codigoDescripcion: '',
      cof: 0,
      descripcion: '',
      entrada: 0,
      modificarDiaTermino: 0,
      tipoRadicado: this.seleccionTablaRadicado,
      tramite: {codigoDescripcion: '', diasTramite: ''},
      verbal: 0,
      webfile: 0,
      state: 'new',
    }
    this.listaSubRadicado = [...this.listaSubRadicado, newElement];
    this.idRow2 += 1;
  }

  onClicEliminarSubRadicado() {
    if (this.seleccionTablaSubRadicado && this.seleccionTablaSubRadicado.state !== 'new') {
      this.listaSubRadicado.find(row => row === this.seleccionTablaSubRadicado).state = this.seleccionTablaSubRadicado.state === 'delete' ? 'edit' : 'delete';
    } else if (this.seleccionTablaSubRadicado && this.seleccionTablaSubRadicado.state === 'new') {
      let index = this.listaSubRadicado.indexOf(this.seleccionTablaSubRadicado);
      this.listaSubRadicado = this.listaSubRadicado.filter((val, i) => i !== index);
      this.seleccionTablaSubRadicado = undefined;
    }
  }

  onClicGuardarSubRadicado() {

    if(!this.validarCamposVacios()){
      return;
    }
    else if(!this.validarCampoRepetido()){
      return;
    }


    this.subcribePostSubtipoRadicado(this.buildJsonSubtipoRadicado());
  }

  onClicBorrarAutoCompleteSubRadicado() {
    this.seleccionSubRadicado = undefined;
    this.subscribeSubRadicado('?idTipo=' + this.seleccionTablaRadicado.id);
  }

  onClickElminiarSelected(event) {
    this.seleccionTablaRadicado = undefined;
  }

  onClickElminiarSelected2(event) {
    this.seleccionTablaSubRadicado = undefined;
  }



  onClicAgregar3(){
    
    let newElement = {
      idRow3: this.idRow3,
      id: '',
      activo: 1,
      codigo: '',
      codigoDescripcion: '',
      codigoDescripcionGuion: '',
      descripcion: '',
      editable: 1,
      requisitos: 0,
      state: 'new',
    }
    this.dataTable3 = [...this.dataTable3, newElement];
    this.idRow3 += 1;

  }

  onClicEliminar3(){
    if(!this.selectionTable3.editable){
      const error = this.translate.instant('CUMCO014.MENSAJES.elminarCategoriaPrecargadaError',
                    {descripcion: this.selectionTable3.codigoDescripcionGuion });
      this.showMessage(error, "error");

      return;
    }
    this.subscribeRevisarRelacionCategoriaTipoRadicado();
  }

  onClicGuardar3(){
    if (!this.validarCamposVaciosTabla3()){
      return;
    }
    else if (!this.validarCamposRepetidosTabla3()){
      return;
    }
    else{
      this.subcribePostCategoriaRadicado(this.buildJsonTabla3());
    }
  }


  onClicAgregar4(){

  }

  onClicEliminar4(){

  }

  onClicGuardar4(){

  }


  onClicAgregar5(){

  }

  onClicEliminar5(){

  }

  onClicGuardar5(){

  }

  onClickElminiarSelected5(){
    this.selectionTable5 = undefined;
  }

  onClicBorrarAutoCompleteRadicado5(){
    this.seleccionRadicado5 = undefined;
    this.seleccionSubRadicado5 = undefined;
    this.dataTable5 = [];
  }

  onClicBorrarAutoCompleteSubRadicado5() {
    this.seleccionSubRadicado5 = undefined;
  }

  // Metodos Para VALIDACIONES -- Metodos Para VALIDACIONES
  // Metodos Para VALIDACIONES -- Metodos Para VALIDACIONES

  camposValidosRadicado(): any {
    let valido = true;
    this.tablaTipoRadicado.forEach(row => {
      valido = valido && (row.descripcion === '' ? false : true
        && row.categoria.codigoDescripcion === '' ? false : true);
    })
    return valido;
  }

  validarRepetidosRadicado(): any {
    
    for (var _i = 0; _i < this.tablaTipoRadicado.length; _i++){
      for (var _k = _i+1; _k < this.tablaTipoRadicado.length; _k++){
        if (this.tablaTipoRadicado[_k].descripcion === this.tablaTipoRadicado[_i].descripcion){
          const error = this.translate.instant('CUMCO014.MENSAJES.tipoRadicadoRepetidosError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.tablaTipoRadicado[_k].descripcion });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }
    return true;

  }

  validarCamposVacios(): any{

    var valiVirtual = false;
    var valiAnonimo = 0;
    for (var _i = 0; _i < this.listaSubRadicado.length;_i++){
      if (!this.listaSubRadicado[_i].descripcion){
        const error = this.translate.instant('CUMCO014.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA2.headerTabla2') });
        this.showMessage2(error, "error");
        return false;
      }
      else if(!this.listaSubRadicado[_i].tramite.id){
        const error = this.translate.instant('CUMCO014.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA2.headerTabla3') });
        this.showMessage2(error, "error");
        return false;
      }
      else if(!this.listaSubRadicado[_i].entrada && !this.listaSubRadicado[_i].cof && !this.listaSubRadicado[_i].webfile){
        const error = this.translate.instant('CUMCO014.MENSAJES.selcionCheckbosError',
                      {filaVacia: String(_i + 1), descripcion: this.listaSubRadicado[_i].tipoRadicado.codigoDescripcionGuion, 
                      descripcion2: this.listaSubRadicado[_i].descripcion });
        this.showMessage2(error, "error");
        return false;
      }

      if (this.listaSubRadicado[_i].webfile){
        valiVirtual = true;
        if(this.listaSubRadicado[_i].anonimo && this.listaSubRadicado[_i].state !== 'delete'){
          valiAnonimo += 1;
        }

      }
    }

    if (valiVirtual){
      if(valiAnonimo > 0){
        return true;
      }
      else{
        const error = this.translate.instant('CUMCO014.MENSAJES.selccionAnonimoError');
        this.showMessage2(error, "error");
      }
    }
    else{
      return true;
    }
  }

  validarCampoRepetido(){

    for (var _i = 0; _i < this.listaSubRadicado.length; _i++){
      for (var _k = _i+1; _k < this.listaSubRadicado.length; _k++){
        if (this.listaSubRadicado[_k].descripcion === this.listaSubRadicado[_i].descripcion){
          const error = this.translate.instant('CUMCO014.MENSAJES.subtipoRadicadoRepedidoError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.listaSubRadicado[_k].descripcion });
                      this.showMessage2(error, "error");
          return false;
        }
      }
    }
    return true;
  }

  validarCamposVaciosTabla3(): any{

    for (var _i = 0; _i < this.dataTable3.length; _i++){
     
      if(!this.dataTable3[_i].codigo){
        const error = this.translate.instant('CUMCO014.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA3.headerTabla1') });
        this.showMessage(error, "error");
        return false;
      }
      else if(!this.dataTable3[_i].descripcion){
        const error = this.translate.instant('CUMCO014.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA3.headerTabla2') });
        this.showMessage(error, "error");
        return false;
      }
      
    }
    return true;
  }

  validarCamposRepetidosTabla3(): any{

    for (var _i = 0; _i < this.dataTable3.length; _i++){
      for (var _k = _i+1; _k < this.dataTable3.length; _k++){
        if (this.dataTable3[_k].descripcion === this.dataTable3[_i].descripcion || this.dataTable3[_k].codigo === this.dataTable3[_i].codigo){
          const error = this.translate.instant('CUMCO014.MENSAJES.campoRepetidoCategoriaRadicadoError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.dataTable3[_k].codigo + ' - ' + this.dataTable3[_k].descripcion });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }
    return true;
  }



  // Metodos Para Actualizar Tablas -- Metodos Para Actualizar Tablas
  // Metodos Para Actualizar Tablas -- Metodos Para Actualizar Tablas

  actualizarTablaRadicado() {
    this.subscribeTablaRadicado(this.seleccionRadicado?this.seleccionRadicado.codigoDescripcion:'');
  }


  // Otros -- Otros
  // Otros -- Otros

  buildJsonRadicado() {
    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.requisitos",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.editable",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "categoria.id",
        "type": "listbox",
        "required": false
      },
      {
        "name": "categoria.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "activo",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "ventanilla.entrada",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "cof",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "ventanilla.virtual",
        "type": "checkbox",
        "required": false
      }
    ];
    let features = [];
    this.tablaTipoRadicado.forEach(tipo => {
      features.push( {
        attributes: {
         "id": tipo.id,
         "codigo": tipo.codigo,
         "descripcion": tipo.descripcion,
         "codigoDescripcion": tipo.codigoDescripcion,
         "categoria.descripcion": tipo.categoria.descripcion,
         "categoria.codigo": tipo.categoria.codigo,
         "categoria.requisitos": tipo.categoria.requisitos,
         "categoria.editable": tipo.categoria.editable,
         "categoria.codigoDescripcion": tipo.categoria.codigoDescripcion,
         "categoria.id": tipo.categoria.id,
         "categoria.activo": tipo.categoria.activo,
         "activo": tipo.activo,
         "ventanilla.entrada": false,
         "cof": false,
         "ventanilla.virtual": false
       },
       "state": tipo.state
      })

    })
    return {
      "grd_tipoRadicado": JSON.stringify({
        fields,
        features
      })
    };
  }


  buildJsonSubtipoRadicado() {
    let fields = [
      {
        "name": "id",
        "type": "input",
        "required": false
      },
      {
        "name": "TipoPer",
        "type": "input",
        "required": false
      },
      {
        "name": "descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.id",
        "type": "input",
        "required": false
      },
      {
        "name": "tipoRadicado.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.id",
        "type": "autocomplete",
        "required": false
      },
      {
        "name": "tramite.descripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.diasTramite",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.codigo",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.codigoDescripcion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.codigoDescripcionGuion",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.habil",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "modificarDiaTermino",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "tramite.modificable",
        "type": "input",
        "required": false
      },
      {
        "name": "tramite.activo",
        "type": "input",
        "required": false
      },
      {
        "name": "activo",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "entrada",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "verbal",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "cof",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "webfile",
        "type": "checkbox",
        "required": false
      },
      {
        "name": "anonimo",
        "type": "checkbox",
        "required": false
      }
    ];

    let features = [];
    this.listaSubRadicado.forEach(data => {
      features.push( {
        attributes: {
        "id": data.id,
        "TipoPer": "",
        "descripcion": data.descripcion,
        "tipoRadicado.descripcion": data.tipoRadicado.descripcion ,
        "tipoRadicado.codigo": data.tipoRadicado.codigo,
        "tipoRadicado.codigoDescripcion": data.tipoRadicado.codigoDescripcionGuion,
        "tipoRadicado.id": data.tipoRadicado.id,
        "tipoRadicado.activo": data.tipoRadicado.activo,
        "tramite.id": data.tramite.id,
        "tramite.descripcion": data.tramite.descripcion,
        "tramite.diasTramite": data.tramite.diasTramite,
        "tramite.codigo": data.tramite.codigo,
        "tramite.codigoDescripcion": data.tramite.codigoDescripcion,
        "tramite.codigoDescripcionGuion": data.tramite.codigo + ' - ' +  data.tramite.descripcion,
        "tramite.habil": data.tramite.habil ,
        "modificarDiaTermino": data.modificarDiaTermino,
        "tramite.modificable": data.tramite.modificable,
        "tramite.activo": data.tramite.activo,
        "activo": data.activo,
        "entrada": data.entrada,
        "verbal": data.verbal,
        "cof": data.cof,
        "webfile": data.webfile,
        "anonimo": data.anonimo
      },
      "state": data.state
      })

    })
    return {
      "grd_relacionTramiteTipoRadicado": JSON.stringify({
        fields,
        features
      },),
      "hid_idTipoRadicado": String(this.listaSubRadicado[0].tipoRadicado.id)
    };
  }

  buildJsonTabla3(){

    let fields = [
        {
          "name": "id",
          "type": "input",
          "required": false
        },
        {
          "name": "codigo",
          "type": "input",
          "required": true
        },
        {
          "name": "descripcion",
          "type": "input",
          "required": true
        },
        {
          "name": "requisitos",
          "type": "checkbox",
          "required": false
        },
        {
          "name": "editable",
          "type": "input",
          "required": false
        },
        {
          "name": "codigoDescripcion",
          "type": "input",
          "required": false
        },
        {
          "name": "activo",
          "type": "input",
          "required": false
        }
    ];

    let features = [];
    this.dataTable3.forEach(data => {
      features.push( {
        attributes: {
          "id": data.id,
          "codigo": data.codigo,
          "descripcion": data.descripcion,
          "requisitos": data.requisitos,
          "editable": data.editable,
          "codigoDescripcion": data.codigo + ' ' + data.descripcion,
          "activo": data.activo
        },
        "state": data.state
      })

    })
    return {
      //grd_categoriaRadicado
      "grd_categoriaTipoRadicado": JSON.stringify({
        fields,
        features
      },)
    };

  }


  onRowSelect(event, selected){
    this.subscribeSubRadicado('?idTipo=' + selected.id); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }


  editedRadicado(rowIndex) {
    this.tablaTipoRadicado[rowIndex].state =  this.tablaTipoRadicado[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  editedSubTipoRadicado(rowIndex){
    if(!this.listaSubRadicado[rowIndex].entrada){
      this.listaSubRadicado[rowIndex].verbal = 0;
    }

    this.listaSubRadicado[rowIndex].state =  this.listaSubRadicado[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  edited(event){

  }

  editedTable3(){
    this.compareInitialData(this.dataTable3, this.initialDataTable3);
  }

  editedTable4(){
  }

  editedTable5(){
  }


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

  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES
  // Metodos para Mostrar y Ocultar MENSAJES  -- Metodos para Mostrar y Ocultar MENSAJES  
   
  // Metodos para Mostrar MENSAJES
  showMessage(det: string, sev: string) {
    this.msgs = [];
    this.msgs.push({severity: sev, summary: '', detail: det});

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  showMessage2(det: string, sev: string) {
    this.msgs2 = [];
    this.msgs2.push({severity: sev, summary: '', detail: det});

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

}

export interface Radicado {
  idRow: any;
  id: any;
  codigo: string;
  descripcion: string;
  codigoDescripcion: string;
  codigoDescripcionGuion: string;
  categoria: {
    id: any;
    codigo: string;
    descripcion: string;
    codigoDescripcion: string;
    codigoDescripcionGuion: string;
    requisitos: number;
    editable: number;
    activo: number
  };
  activo: number;
  state: string;

}
