import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Cumco014Service } from './servicio/cumco014.service';
import { TranslateService } from '@ngx-translate/core';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

import { HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';


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

  file: any;

  cols: any[];
  seleccionRadicado: any;
  listaRadicado: any[];
  nRowsOptionsTable1 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable1 = 5;
  pageTable1 = 0;

  cols2: any[];
  seleccionSubRadicado: any;
  listaSubRadicado: any[];
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 5;
  initialData2: any[];
  initialDataTable2 = true;
  pageTable2 = 0;

  seleccionCategoria: any;
  listadoCategoria: any[];

  tablaTipoRadicado: Radicado[];
  seleccionTablaRadicado: any;
  initialData1: any[];
  initialStateTabla1= true;
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
  nRowsOptionsTable3 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable3 = 20;
  pageTable3 = 0;

  //Variables Tabla 4
  dataTable4: any[] = [];
  selectionTable4: any;
  initialDataTable4: any[];
  initialStateTablae4 = true;
  cols4: any[];
  idRow4: number;
  nRowsOptionsTable4 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable4 = 15;
  rowIndexFile: number;
  nombreInicial: string;
  pageTable4 = 0;
  


  //Variables Tabla 5
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
  nRowsOptionsTable5 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable5 = 15;
  pageTable5 = 0;

  page = 1;
  size = 250;
  loading: boolean;




  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    this.subscribeRadicado('');
    this.subscribeTablaRadicado('');

    this.subcribeSetColumns();

    this.subscribeCategoria2('');

    this.dataTable4=[];
    this.initialDataTable4=[];
    this.page = 1;
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
      { field: 'rowIdenx', header: ''},
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
      });
  }

  subscribeCategoria(parameters: string) {
    this.seleccionTablaRadicado = undefined;
    this.cumco014Service.getCategoriaradicado(parameters).subscribe(

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

        if (this.initialStateTabla1) {
          this.initialData1 = [];
          for (const data of this.tablaTipoRadicado) {
            this.initialData1.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTabla1 = false;
        }

      });
  }

  subcribeRecorridoRepartoFisico(body: any) {
    this.cumco014Service.postGuardarRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarRadicado = getRes;
        this.showMessage(getRes.message, "error");
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;
        this.initialStateTabla1 = true;
        this.seleccionRadicado = undefined;
        this.seleccionSubRadicado = undefined;
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

        if (this.initialDataTable2) {
          this.initialData2 = [];
          for (const data of this.listaSubRadicado) {
            this.initialData2.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialDataTable2 = false;
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
        
        this.suggestionsAutoCompleteSubTipoRadicado = [];
        for (var subRad of this.respSubtipoRadicado){
          this.suggestionsAutoCompleteSubTipoRadicado.push(subRad);
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
       
      });
  }

  subcribePostSubtipoRadicado(body: any) {
    this.cumco014Service.postGuardarSubtipoRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        this.respuestaGuardarRadicado = getRes;
        this.showMessage2(getRes.message, "error");
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
        else if( !this.respuestaGuardarRadicado.status ){
          this.showMessage2(this.respuestaGuardarRadicado.message, "error");
        }

        else{
          this.initialDataTable2 = true;
          this.seleccionSubRadicado = undefined;
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
    if (this.page === 1) {
      this.dataTable4 = [];
      this.initialData1 = [];
    }
    this.loading = true;
    var responseData: any[]; 
    this.cumco014Service.getRequisitos(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.loading = false;
      },
      () => {                 // Fin del suscribe

        
        for (var data4 of responseData){
          if(data4.idArchivo){
            this.dataTable4.push( {... data4, state: 'noedit', token: '', nombreInicial: data4.nombre } );
            this.initialDataTable4.push( {... data4, state: 'noedit', token: '', nombreInicial: data4.nombre } );
          }
          else{
            this.dataTable4.push( {... data4, state: 'noedit', token: '', idArchivo: 0, nombreInicial: data4.nombre} );
            this.initialDataTable4.push( {... data4, state: 'noedit', token: '', idArchivo: 0, nombreInicial: data4.nombre} );
          }
        }
  

        if (responseData.length >= this.size) {
          this.page = this.page + 1;
          //if (parameters === '') {
            this.subscribeGetRequisito('?page=' + String(this.page) + '&size=' + String(this.size));
          //}
          //else {
          //  this.subscribeGetRequisito(parameters + '&page=' + String(this.page) + '&size=' + String(this.size));
          //}
        } else {
          this.dataTable4 = [...this.dataTable4];
          this.loading = false
          return;
        }

        
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

        this.dataTable5 = [];
        for (var data of responseData){
          this.dataTable5.push( {...data, state: 'noedit'} );
        }
        

        
        if (this.initialStateTablae5) {
          this.initialDataTable5 = [];
          for (const data of this.dataTable5) {
            this.initialDataTable5.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateTablae5 = false;
        }
        
        //this.dataTable5 = responseData;
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
      });
  }


  subcribePostRelacionRequisitoSubRadicado(body: any){
    
    let respuesta: any;
    this.cumco014Service.postRelacionRequisitoSubRadicado(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        respuesta = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {    // Fin del suscribe
        
        this.showMessage(respuesta.message, "success");
        this.onSelectSubtipoRadicado5();
      });

  }

  
  subcribePostPrueba(body: any){
    
    let respuesta: any;
    this.cumco014Service.postPrueba(body).subscribe(
      (getRes: any) => {     // Inicio del suscribe
        respuesta = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {    // Fin del suscribe
        
        
      });

  }


  subcribePostRequisito(body: any){
    
    let respuesta: any;
    this.loading = true;
    this.cumco014Service.postReqisito(body).subscribe(
      (getRes: any) => {     // Inicio del suscribe
        respuesta = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
        this.loading = false
      },
      () => {    // Fin del suscribe
        this.initialStateTablae4 = true
        this.showMessage(respuesta.message, "success");
        this.page = 1;
        this.subscribeGetRequisito('');
        
      });

  }


  subscribeGetRequisitoRadicadoAsociado(parameters: any, rowIndex) {
    var responseData: any[]; 
    this.cumco014Service.getRequisitoRadicadoAsociado(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        this.dataTable4[rowIndex].nombre = this.dataTable4[rowIndex].nombreInicial
      },
      () => {                 // Fin del suscribe
        if(responseData.length !== 0){
          const error = this.translate.instant('CUMCO014.MENSAJES.requisitoRadicadoAsociado',
                    {requisito: responseData[0].nombreRequisito, 
                      tipoRadicado: responseData[0].descripcionTipoRadicado, 
                      subRadicado: responseData[0].descripcionSubRadicado });
          this.showMessage(error, "error");

          this.dataTable4[rowIndex].nombre = this.dataTable4[rowIndex].nombreInicial;
        }
        else{
          this.dataTable4[rowIndex].nombreInicial = this.dataTable4[rowIndex].nombre;
          this.editedTable4();
        }


      });
  }


  subscribeGetRequisitoRadicadoAsociado2(parameters: any) {
    var responseData: any[]; 
    this.cumco014Service.getRequisitoRadicadoAsociado(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if(responseData.length !== 0){
          const error = this.translate.instant('CUMCO014.MENSAJES.requisitoRadicadoAsociado2',
                    {requisito: responseData[0].nombreRequisito });
          this.showMessage(error, "error");
        }
        else{
          this.dataTable4.find(row => row === this.selectionTable4).state = this.selectionTable4.state === 'delete' ? 'edit' : 'delete';
          this.editedTable4();
        }


      });
  }

  subscribeGetRequisitoSubtipoRadicadoAsociado(parameters: any) {
    var responseData: any[]; 
    this.cumco014Service.getRequisitoRequisitoSubtipoRadicadoAsociado(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responseData = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        if(responseData.length !== 0){
          const error = this.translate.instant('CUMCO014.MENSAJES.requisitoRadicadoAsociado2',
          {requisito: responseData[0].nombreRequisito, 
            tipoRadicado: this.seleccionRadicado5.descripcion,
            subRadicado: responseData[0].descripcionSubRadicado });
          this.showMessage(error, "error");
        }
        else{
          this.dataTable5.find(row => row === this.selectionTable5).state = this.selectionTable5.state === 'delete' ? 'edit' : 'delete';
          this.editedTable5();
        }


      });
  }



  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables
  // Eventos SEARCH de los autocompletables -- Eventos SEARCH de los autocompletables

  searchRadicado(event) {
    this.subscribeRadicado(event.query ? event.query : '');
  }

  searchSubRadicado(event) {
    this.subcribeServiceSubTipoRadicado('?idTipo=' + this.seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query); 
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.codigo); //?codigoDescripcion=' + event.query
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchCategoria(event) {
    this.subscribeCategoria('?activo=1&codigoDescripcion=' + event.query)
  }


  searchFilterTramite(event) {
    this.seleccionTablaSubRadicado = undefined;
    this.subscribeGetTramite('?activo=1' + '&codigoDescripcion=' + event.query);
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchSubRadicado5(event) {
    this.selectionTable5 = undefined;
    this.subscribeSubRadicado5('?idTipo=' + this.seleccionRadicado5.id + '&codigoTramiteDescripcion=' + event.query); 
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.codigo); //?codigoDescripcion=' + event.query
    //this.subcribeServiceSubTipoRadicado('?idTipo=' + seleccionTablaRadicado.id + '&codigoTramiteDescripcion=' + event.query + '&activo=1'); //?idTipo=81&codigoTramiteDescripcion=&activo=1
  }

  searchRquisistos5(event) {
    this.selectionTable5 = undefined;
    this.subscribeGetRequisito5('?nombreDescripcion=' + event.query + '&activo=1') //?nombreDescripcion= =pru
  }

  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables
  // Eventos SELECT de los autocompletables -- Eventos SELECT de los autocompletables

  onSelectSubtipoRadicado(){
    this.subscribeSubRadicado('?idTipo=' + this.seleccionTablaRadicado.id + '&descripcion=' + this.seleccionSubRadicado.descripcion);
    //this.subscribeSubRadicado('?idTipo=' + this.seleccionTablaRadicado.codigo + '&idTramite=' + this.seleccionSubRadicado.id ); // idTipo=2&idTramite=102
  }


  onSelectTipoRadicado5(){
    this.seleccionSubRadicado5 = undefined;
    this.dataTable5 = [];
  }

  onSelectSubtipoRadicado5(){
    this.initialStateTablae5 = true;
    this.subscribeGetRequisitosAsociadoRadicado('?idTramiteTipoRadicado=' + this.seleccionSubRadicado5.id); // ?idTramiteTipoRadicado=281
  }

  onSelectTramite(rowData: any, rowIndex : any){
    this.editedSubTipoRadicado(rowIndex);
  }

  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables
  // Eventos FOCUSOUT de los autocompletables -- Eventos FOCUSOUT de los autocompletables

  focusOutFiltroRadicado(){
    if(this.seleccionRadicado){
      if (this.seleccionRadicado.id === undefined || this.seleccionRadicado.id === ''){
        this.seleccionRadicado = undefined;
        this.onClicBorrarAutoCompleteRadicado();
      }
    }
    else if (this.seleccionRadicado === '' || this.seleccionRadicado === null){
      this.seleccionRadicado = undefined;
      this.onClicBorrarAutoCompleteRadicado();
    }
  }

  focusOutFiltroSubRadicado(){
    if(this.seleccionSubRadicado){
      if (this.seleccionSubRadicado.id === undefined || this.seleccionSubRadicado.id === ''){
        this.seleccionSubRadicado = undefined;
        this.onClicBorrarAutoCompleteSubRadicado();
      }
    }
    else if (this.seleccionSubRadicado === '' || this.seleccionSubRadicado === null){
      this.seleccionSubRadicado = undefined;
      this.onClicBorrarAutoCompleteSubRadicado();
    }
  }

  focusOutFiltroRadicado5(){
    if(this.seleccionRadicado5){
      if (this.seleccionRadicado5.id === undefined || this.seleccionRadicado5.id === ''){
        this.seleccionRadicado5 = undefined;
        this.onClicBorrarAutoCompleteRadicado5();
      }
    }
    else if (this.seleccionRadicado5 === '' || this.seleccionRadicado5 === null){
      this.seleccionRadicado5 = undefined;
      this.onClicBorrarAutoCompleteRadicado5();
    }
  }

  focusOutFiltroSubRadicado5(){
    if(this.seleccionSubRadicado5){
      if (this.seleccionSubRadicado5.id === undefined || this.seleccionSubRadicado5.id === ''){
        this.seleccionSubRadicado5 = undefined;
        this.onClicBorrarAutoCompleteSubRadicado5();
      }
    }
    else if (this.seleccionSubRadicado5 === '' || this.seleccionSubRadicado5 === null){
      this.seleccionSubRadicado5 = undefined;
      this.onClicBorrarAutoCompleteSubRadicado5();
    }
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

    const newPage = Math.trunc(this.tablaTipoRadicado.length/this.nRowsTable1) * this.nRowsTable1;
    this.pageTable1 = newPage;

    
  }

  onClicEliminarRadicado() {
    if(this.seleccionTablaRadicado && this.listaSubRadicado.length !== 0 && this.seleccionTablaRadicado.state !== 'new'){
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
      return;
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

    const newPage = Math.trunc(this.listaSubRadicado.length/this.nRowsTable2) * this.nRowsTable2;
    this.pageTable2 = newPage;
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

    const newPage = Math.trunc(this.dataTable3.length/this.nRowsTable3) * this.nRowsTable3;
    this.pageTable3 = newPage;

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


    let newElement = {
      idRow4: this.idRow4,
      id: '',
      codigo: this.generarCodigo1(),
      nombre: '',
      descripcion: '',
      activo: 1,
      requisitos: 0,
      state: 'new',
      token: '',
      nombreInicial: ''
    }
    this.dataTable4 = [...this.dataTable4, newElement];
    this.initialDataTable4 = [...this.initialDataTable4, newElement];
    this.idRow4 += 1;

    const newPage = Math.trunc(this.dataTable4.length/this.nRowsTable4) * this.nRowsTable4;
    this.pageTable4 = newPage;

    

  }

  onClicEliminar4(){
    if (this.selectionTable4 && this.selectionTable4.state !== 'new') {
      //this.dataTable4.find(row => row === this.selectionTable4).state = this.selectionTable4.state === 'delete' ? 'edit' : 'delete';
      this.subscribeGetRequisitoRadicadoAsociado2('?page=1&size=1&idRequisito=' + String(this.selectionTable4.id) );
      
    } else if (this.selectionTable4 && this.selectionTable4.state === 'new') {
      let index = this.dataTable4.indexOf(this.selectionTable4);
      this.dataTable4 = this.dataTable4.filter((val, i) => i !== index);
      this.initialDataTable4 = this.initialDataTable4.filter((val, i) => i !== index);
      this.selectionTable4 = undefined;
    }
  }

  onClicGuardar4(){
    if (!this.validarCamposVaciosTabla4()){
      return;
    }
    else if (!this.validarCamposRepetidosTabla4()){
      return;
    }
    else{
      this.subcribePostRequisito(this.buildJsonRequisito4());
    }
    
  }


  onClicAgregar5(){

    let newElement = {
      idRow5: this.idRow5,
      id: '',
      requerido: 0,
      requisito: {id: ''},
      tipoRadicado: this.seleccionRadicado5,
      tramiteTipoRadicado: this.seleccionSubRadicado5,
      state: 'new',
    }
    this.dataTable5 = [...this.dataTable5, newElement];
    this.idRow5 += 1;

    const newPage = Math.trunc(this.dataTable5.length/this.nRowsTable5) * this.nRowsTable5;
    this.pageTable5 = newPage;

  }

  onClicEliminar5(){
    if (this.selectionTable5 && this.selectionTable5.state !== 'new') {
      //this.dataTable5.find(row => row === this.selectionTable5).state = this.selectionTable5.state === 'delete' ? 'edit' : 'delete';
      this.subscribeGetRequisitoSubtipoRadicadoAsociado('?page=1&size=1&idRequisito=' + String(this.selectionTable5.requisito.id) + '&idSubRadicado=' + String(this.seleccionSubRadicado5.id) );
    } else if (this.selectionTable5 && this.selectionTable5.state === 'new') {
      let index = this.dataTable5.indexOf(this.selectionTable5);
      this.dataTable5 = this.dataTable5.filter((val, i) => i !== index);
      this.selectionTable5 = undefined;
    }
  }

  onClicGuardar5(){
    if(!this.validarVacios5()){
      return;
    }
    else if(!this.validarRepetidos5()){
      return;
    }
    else{
      this.subcribePostRelacionRequisitoSubRadicado(this.buildJsonTabla5());
    }
    
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
    this.dataTable5 = [];
  }

  // Metodos Para VALIDACIONES -- Metodos Para VALIDACIONES
  // Metodos Para VALIDACIONES -- Metodos Para VALIDACIONES

  camposValidosRadicado(): any {
    for (var _i = 0; _i < this.tablaTipoRadicado.length; _i++) {

      if (this.tablaTipoRadicado[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA1.headerTabla2') });
          this.showMessage(error, "error");
        return false;
      }
      else if (this.tablaTipoRadicado[_i].categoria.id === undefined || this.tablaTipoRadicado[_i].categoria.id === '') {
        const error = this.translate.instant('CUMCO020.MENSAJES.campoFilaVacioError',
          { filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA1.headerTabla3') });
          this.showMessage(error, "error");
        return false;
      }

    }

    return true;
  }

  validarRepetidosRadicado(): any {
    
    for (var _i = 0; _i < this.tablaTipoRadicado.length; _i++){
      for (var _k = _i+1; _k < this.tablaTipoRadicado.length; _k++){
        if (this.tablaTipoRadicado[_k].descripcion.toLowerCase().trim() === this.tablaTipoRadicado[_i].descripcion.toLowerCase().trim()){
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


  validarCamposVaciosTabla4(): any{

    for (var _i = 0; _i < this.dataTable4.length; _i++){
     
      if(!this.dataTable4[_i].nombre){
        const error = this.translate.instant('CUMCO014.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA4.headerTabla1') });
        this.showMessage(error, "error");
        return false;
      }      
    }
    return true;
  }

  validarCamposRepetidosTabla4(): any{

    for (var _i = 0; _i < this.dataTable4.length; _i++){
      for (var _k = _i+1; _k < this.dataTable4.length; _k++){
        if (this.dataTable4[_k].nombre === this.dataTable4[_i].nombre || this.dataTable4[_k].nombre === this.dataTable4[_i].nombre){
          const error = this.translate.instant('CUMCO014.MENSAJES.requisitoRepetidosError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.dataTable4[_k].nombre });
                      this.showMessage(error, "error");
          return false;
        }
      }
    }
    return true;
  }




  validarVacios5(): any{
    for (var _i = 0; _i < this.dataTable5.length;_i++){
      if (!this.dataTable5[_i].requisito.id || this.dataTable5[_i].requisito.id === ''){
        const error = this.translate.instant('CUMCO014.MENSAJES.campoFilaVacioError',
                      {filaVacia: String(_i + 1), campoVacio: this.translate.instant('CUMCO014.TABLA5.headerTabla0') });
        this.showMessage(error, "error");
        return false;
      }
    }
    return true;
  }


  validarRepetidos5(): any {
    
    for (var _i = 0; _i < this.dataTable5.length; _i++){
      for (var _k = _i+1; _k < this.dataTable5.length; _k++){
        if (this.dataTable5[_k].requisito.id === this.dataTable5[_i].requisito.id){
          const error = this.translate.instant('CUMCO014.MENSAJES.tipoRequisitoRepetidosError',
                      {filaRep1: String(_i + 1), filaRep2: String(_k + 1), descripcion: this.dataTable5[_k].requisito.nombre });
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

  buildJsonTabla5(){

    let fields = [
        {
          "name": "id",
          "type": "input",
          "required": "false"
        },
        {
          "name": "tramiteTipoRadicado.id",
          "type": "input",
          "required": "false"
        },
        {
          "name": "requisito.id",
          "type": "input",
          "required": "false"
        }
    ];

    let features = [];
    this.dataTable5.forEach(data => {
      features.push( {
        attributes: {
          "id": data.id,
          "tramiteTipoRadicado.id": this.seleccionSubRadicado5.id,
          "requisito.id": data.requisito.id
        },
        "state": data.state
      })

    })
    return {
      "auto_subtipoRadicado": this.seleccionSubRadicado5.id, "auto_tipoRadicado": this.seleccionRadicado5.id,
      "grd_subtipoRadicadoRequisito": JSON.stringify({
        fields,
        features
      })
    };

  }


  buildJsonRequisito4(){

    var dataSend = [];
    for(var data4 of this.dataTable4){
      if (data4.state !== 'noedit'){
        dataSend.push( {
          id: data4.id,
          nombre: data4.nombre,
          descripcion: data4.descripcion,
          activo: data4.activo,
          webfile: 0,
          requerido: data4.requerido,
          codigo: data4.codigo,
          state: data4.state,
          token: data4.token,
          codfile: data4.idArchivo
        });

      }
    }

    return(dataSend);



  }

  generarCodigo1(): any {

    var arrayCod = [];
    for (let data of this.initialDataTable4) {
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


  // Otros -- Otros
  // Otros -- Otros

  onRowSelect(event, selected){
    if(this.seleccionTablaRadicado && this.seleccionTablaRadicado.state !== 'new'){
      this.listaSubRadicado = []; 
      this.initialDataTable2 = true;
      this.subscribeSubRadicado('?idTipo=' + selected.id); //?idTipo=81&codigoTramiteDescripcion=&activo=1
    }
  }


  editedRadicado(rowIndex) {
    //this.tablaTipoRadicado[rowIndex].state =  this.tablaTipoRadicado[rowIndex].state === 'new' ? 'new' : 'edit';
    this.compareInitialData(this.tablaTipoRadicado, this.initialData1);
  }

  editedSubTipoRadicado(rowIndex){
    if(!this.listaSubRadicado[rowIndex].entrada){
      this.listaSubRadicado[rowIndex].verbal = 0;
    }

    if(!this.listaSubRadicado[rowIndex].webfile){
      this.listaSubRadicado[rowIndex].anonimo = 0;
    }

    this.compareInitialData(this.listaSubRadicado, this.initialData2);
    //this.listaSubRadicado[rowIndex].state =  this.listaSubRadicado[rowIndex].state === 'new' ? 'new' : 'edit';
  }

  edited(event){

  }

  editedTable3(){
    this.compareInitialData(this.dataTable3, this.initialDataTable3);
  }

  editedTable4(){
    this.compareInitialData(this.dataTable4, this.initialDataTable4);
  }

  editedTable5(){
    this.compareInitialData(this.dataTable5, this.initialDataTable5);
  }


  editedRquisito(rowIndex){
    if(this.dataTable4[rowIndex].nombreInicial !== this.dataTable4[rowIndex].nombre && this.dataTable4[rowIndex].state !== 'new' ){
      this.subscribeGetRequisitoRadicadoAsociado('?page=1&size=1&idRequisito=' + String(this.dataTable4[rowIndex].id), rowIndex ); //?idRequisito=121&page=1&size=1
    }
  }


  compareInitialData(currentData: any[], initialData: any[]){

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
  showMessage(sum: string, sev: string) {
    this.msgs = [];
    this.msgs.push({severity: sev, summary: sum, detail: ''});

    (async () => {
      const waitTime = 5;
      await this.messageTimeout(waitTime * 1000);
      this.hideMessage();
    })();
  }

  showMessage2(sum: string, sev: string) {
    this.msgs2 = [];
    this.msgs2.push({severity: sev, summary: sum, detail: ''});

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


  // Subir archivo


  cargarArchivo(event,rowIndex){

    this.file = event.target.files[0];

    this.rowIndexFile = rowIndex;

    //this.subcribeGetFileToken('?' + String(this.dataTable4[rowIndex].idArchivo) );
    this.subcribeGetFileToken('');
  }


  subcribeGetFileToken(parameters: string){
    let response: any;
    this.cumco014Service.getFileToken(parameters).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe

        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe

        this.dataTable4[this.rowIndexFile].token = response.token;

        const form = new FormData();
        form.append('token', response.token);
        form.append('fileSize', String(this.file.size));
        form.append('fileName', this.file.name);
        form.append('fileStream', this.file);

        var fileData = {token: this.dataTable4[this.rowIndexFile].token,
                        fileSize: String(this.file.size),
                        fileName: this.file.name,
                        fileStream: this.file
                       }

        //this.subcribePostFileToken(fileData);

        const req = new HttpRequest('POST', location.origin + '/fileUploadServer/rest/fileUpload/uploadMultipart', form, {
          reportProgress: true,
        });

        let responseSubir: any;
        this.cumco014Service.http.request(req).subscribe(
          (getRes: any) => {     // Inicio del suscribe
            responseSubir = getRes;
            return getRes;
          },
          getError => {           // Error del suscribe
            console.log('GET call in error', getError);
          },
          () => {                 // Fin del suscribe
            if(this.dataTable4[this.rowIndexFile].state !== 'new'){
              this.dataTable4[this.rowIndexFile].state = 'edit';
            }
            this.dataTable4[this.rowIndexFile].nombreArchivo = this.file.name;
            this.dataTable4[this.rowIndexFile].idArchivo = 0;
          });




      });

  }


  subcribePostFileToken(body){
    var responsse: any;
    this.cumco014Service.postFileToken(body).subscribe(

      (getRes: any) => {     // Inicio del suscribe
        responsse = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
        const error = this.translate.instant('CUMCO014.MENSAJES.falloGuardar');
        this.showMessage(error, "error");
      },
      () => {                 // Fin del suscribe
        // const exito = this.varText.default.MENSAJES.exitoGuardar;

      }
    )
        
  }




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
