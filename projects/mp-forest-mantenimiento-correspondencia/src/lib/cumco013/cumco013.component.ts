import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Cumco013Service } from './servicio/cumco013.service';

// Importacion Modulo de Mensajes
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cumco013',
  templateUrl: './cumco013.component.html',
  styleUrls: ['./cumco013.component.css']  
})
export class CUMCO013Component implements OnInit {


  msgs: Message[] = []; 

  re = RegExp("^([A-Z0-9_]{1,})$");


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


  //TABLA 2
  cols2: any[];
  dataTable2: any[];
  initialDataTable2: any[];
  initialStateDataTable2 = true;
  selectedRowTable2: any;
  nRowsOptionsTable2 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable2 = 20;
  idRow2 = 0;
  pageTable2 = 0;


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


  //TABLA 4
  cols4: any[];
  dataTable4: any[];
  initialDataTable4: any[];
  initialStateDataTable4 = true;
  selectedRowTable4: any;
  nRowsOptionsTable4 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable4 = 20;
  idRow4 = 0;
  pageTable4 = 0;

  //TABLA 5
  cols5: any[];
  dataTable5: any[];
  initialDataTable5: any[];
  initialStateDataTable5 = true;
  selectedRowTable5: any;
  nRowsOptionsTable5 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable5 = 20;
  idRow5 = 0;
  pageTable5 = 0;

  //TABLA 6
  cols6: any[];
  dataTable6: any[];
  initialDataTable6: any[];
  initialStateDataTable6 = true;
  selectedRowTable6: any;
  nRowsOptionsTable6 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable6 = 20;
  idRow6 = 0;
  pageTable6 = 0;

  //TABLA 7
  cols7: any[];
  dataTable7: any[];
  initialDataTable7: any[];
  initialStateDataTable7 = true;
  selectedRowTable7: any;
  nRowsOptionsTable7 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable7 = 20;
  idRow7 = 0;
  pageTable7 = 0;

  //TABLA 8
  cols8: any[];
  dataTable8: any[];
  initialDataTable8: any[];
  initialStateDataTable8 = true;
  selectedRowTable8: any;
  nRowsOptionsTable8 = [1, 5, 10, 15, 20, 25, 50];
  nRowsTable8 = 20;
  idRow8 = 0;
  pageTable8 = 0;

  constructor(private translate: TranslateService,
              private cumco013Service: Cumco013Service,
              private messageService: MessageService) { }

  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');

    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    this.subscribeGetTipoEmpresa('');

    this.subscribeGetTipoRegistroUsuarioClasificacionOrganizacion('');

    this.subscribeGetTipoRegistroUsuarioActividadEconomica('');

    this.subscribeGetGrupoEtnico('');

    this.subscribeGetNivelEscolaridad('');

    this.subscribeGetSexo('');

    this.subscribeGetEstadoCivil('');

    this.subscribeGetDiscapacidad('');
 

  }

  subcribeSetColumns() {
      this.translate.get(['']).subscribe(translations => {


        this.cols1 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA1.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA1.headerTabla2') }
        ];
        this.cols2 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA2.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA2.headerTabla2') }
        ];
        this.cols3 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA3.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA3.headerTabla2') }
        ];
        this.cols4 = [
          { field: 'rowIndex', header: '' },
          { field: 'codigo', header: this.translate.instant('CUMCO013.TABLA4.headerTabla0'), required: true },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA4.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA4.headerTabla2') }
        ];
        this.cols5 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA5.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA5.headerTabla2') }
        ];
        this.cols6 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA6.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA6.headerTabla2') }
        ];
        this.cols7 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA7.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA7.headerTabla2') }
        ];
        this.cols8 = [
          { field: 'rowIndex', header: '' },
          { field: 'descripcion', header: this.translate.instant('CUMCO013.TABLA8.headerTabla1'), required: true },
          { field: 'activo', header: this.translate.instant('CUMCO013.TABLA8.headerTabla2') }
        ];
      });

  }


  subscribeGetTipoEmpresa(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoEmpresa(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable1 = [];
        for (const data of response) {
          this.dataTable1.push({ ...data, state: 'noedit' });
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

  subscribePostTipoEmpresa(body) {

    let responsePost: any;
    this.cumco013Service.postTipoEmpresa(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable1 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetTipoEmpresa('');
      })

  }


  subscribeGetTipoRegistroUsuarioClasificacionOrganizacion(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoRegistroUsuarioClasificacionOrganizacion(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable2 = [];
        for (const data of response) {
          this.dataTable2.push({ ...data, state: 'noedit' });
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

  subscribePostCalsificacionOrganizacion(body) {

    let responsePost: any;
    this.cumco013Service.postRegistroUsuario(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable2 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetTipoRegistroUsuarioClasificacionOrganizacion('');
      })

  }


  subscribeGetTipoRegistroUsuarioActividadEconomica(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoRegistroUsuarioActividadEconomica(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable3 = [];
        for (const data of response) {
          this.dataTable3.push({ ...data, state: 'noedit' });
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

  subscribePostActividadEconomica(body) {

    let responsePost: any;
    this.cumco013Service.postRegistroUsuario(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable3 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetTipoRegistroUsuarioActividadEconomica('');
      })

  }


  subscribeGetGrupoEtnico(parameters: string) {

    let response: any[];
    this.cumco013Service.getGrupoEtnico(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable4 = [];
        for (const data of response) {
          if(data.codigo){
            this.dataTable4.push({ ...data, state: 'noedit' });
          }
          else{
            this.dataTable4.push({ ...data, codigo: '', state: 'noedit' });
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

  subscribePostGrupoEtnico(body) {

    let responsePost: any;
    this.cumco013Service.postGrupoEtnico(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable4 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetGrupoEtnico('');
      })

  }


  subscribeGetNivelEscolaridad(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoRegistroUsuarioNivelEscolaridad(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable5 = [];
        for (const data of response) {
          this.dataTable5.push({ ...data, state: 'noedit' });
        }

        if (this.initialStateDataTable5) {
          this.initialDataTable5 = [];
          for (const data of this.dataTable5) {
            this.initialDataTable5.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable5 = false;
        }

      })

  }

  subscribePostNivelEscolaridad(body) {

    let responsePost: any;
    this.cumco013Service.postRegistroUsuario(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable5 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetNivelEscolaridad('');
      })

  }

  subscribeGetSexo(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoRegistroUsuarioSexo(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable6 = [];
        for (const data of response) {
          this.dataTable6.push({ ...data, state: 'noedit' });
        }

        if (this.initialStateDataTable6) {
          this.initialDataTable6 = [];
          for (const data of this.dataTable6) {
            this.initialDataTable6.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable6 = false;
        }

      })

  }

  subscribePostSexo(body) {

    let responsePost: any;
    this.cumco013Service.postRegistroUsuario(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable6 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetSexo('');
      })

  }


  subscribeGetEstadoCivil(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoRegistroUsuarioEstadoCivil(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable7 = [];
        for (const data of response) {
          this.dataTable7.push({ ...data, state: 'noedit' });
        }

        if (this.initialStateDataTable7) {
          this.initialDataTable7 = [];
          for (const data of this.dataTable7) {
            this.initialDataTable7.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable7 = false;
        }

      })

  }

  subscribePostEstadoCivil(body) {

    let responsePost: any;
    this.cumco013Service.postRegistroUsuario(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable7 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetEstadoCivil('');
      })

  }


  subscribeGetDiscapacidad(parameters: string) {

    let response: any[];
    this.cumco013Service.getTipoRegistroUsuarioDiscapacidad(parameters).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        response = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.dataTable8 = [];
        for (const data of response) {
          this.dataTable8.push({ ...data, state: 'noedit' });
        }

        if (this.initialStateDataTable8) {
          this.initialDataTable8 = [];
          for (const data of this.dataTable8) {
            this.initialDataTable8.push(JSON.parse(JSON.stringify(data)));
          }
          this.initialStateDataTable8 = false;
        }

      })

  }

  subscribePostDiscapacidad(body) {

    let responsePost: any;
    this.cumco013Service.postRegistroUsuario(body).subscribe(
      (getRes: any[]) => {     // Inicio del suscribe
        responsePost = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.initialStateDataTable8 = true;
        this.showMessage('success', responsePost.message, '');
        this.subscribeGetDiscapacidad('');
      })

  }



  // Metodos BOTONES TABLA 1 -- Metodos BOTONES TABLA 1
  // Metodos BOTONES TABLA 1 -- Metodos BOTONES TABLA 1

  onClickAgregar1(){

    let newElement = {
      idRow1: this.idRow1,
      id: '',
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

  onClickEliminar1(){
    
    if (this.selectedRowTable1 && this.selectedRowTable1.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.titulo'),
                            caracteristica: this.selectedRowTable1.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable1 && this.selectedRowTable1.state !== 'new'){
      this.dataTable1.find(row => row === this.selectedRowTable1).state = this.selectedRowTable1.state === 'delete' ? 'edit' : 'delete';
      this.editedTable1('');
    }
    else if (this.selectedRowTable1 && this.selectedRowTable1.state === 'new') {
      let index = this.dataTable1.indexOf(this.selectedRowTable1);
      this.dataTable1 = this.dataTable1.filter((val, i) => i !== index);    
      this.selectedRowTable1 = undefined;
    }

  }

  onClickGuardar1(){
    if(!this.validarCamposVacios1()){
      return;
    }
    else if(!this.validarRepetidos1()){
      return;
    }
    else{
      this.subscribePostTipoEmpresa(this.buildJsonTipoEmpresa1());
    }

  }


  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2
  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2

  onClickAgregar2(){

    let newElement = {
      idRow2: this.idRow2,
      id: '',
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

  onClickEliminar2(){
    if(this.selectedRowTable2 && this.selectedRowTable2.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.clasificacionOrg'), 
                            caracteristica: this.selectedRowTable2.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable2.state !== 'new'){
      this.dataTable2.find(row => row === this.selectedRowTable2).state = this.selectedRowTable2.state === 'delete' ? 'edit' : 'delete';
      this.editedTable2('');
    }
    else if (this.selectedRowTable2 && this.selectedRowTable2.state === 'new') {
      let index = this.dataTable2.indexOf(this.selectedRowTable2);
      this.dataTable2 = this.dataTable2.filter((val, i) => i !== index);
      this.selectedRowTable2 = undefined;
    }

  }

  onClickGuardar2(){
    if(!this.validarCamposVacios2()){
      return;
    }
    else if(!this.validarRepetidos2()){
      return;
    }
    else{
      this.subscribePostCalsificacionOrganizacion(this.buildJsonCLasificacionOrganizacion2());
    }

  }


  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2
  // Metodos BOTONES TABLA 2 -- Metodos BOTONES TABLA 2

  onClickAgregar3(){

    let newElement = {
      idRow3: this.idRow3,
      id: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable3 = [...this.dataTable3, newElement];
    this.idRow3 += 1;

    const newPage = Math.trunc(this.dataTable3.length/this.nRowsTable3) * this.nRowsTable3;
    this.pageTable3 = newPage;

  }

  onClickEliminar3(){

    if(this.selectedRowTable3 && this.selectedRowTable3.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.actividadEconomica'), 
                            caracteristica: this.selectedRowTable3.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable3.state !== 'new'){
      this.dataTable3.find(row => row === this.selectedRowTable3).state = this.selectedRowTable3.state === 'delete' ? 'edit' : 'delete';
      this.editedTable3('');
    }
    else if (this.selectedRowTable3 && this.selectedRowTable3.state === 'new') {
      let index = this.dataTable3.indexOf(this.selectedRowTable3);
      this.dataTable3 = this.dataTable3.filter((val, i) => i !== index);
      this.selectedRowTable3 = undefined;
    }

  }

  onClickGuardar3(){
    if(!this.validarCamposVacios3()){
      return;
    }
    else if(!this.validarRepetidos3()){
      return;
    }
    else{
      this.subscribePostActividadEconomica(this.buildJsonActividadEconomica3());
    }

  }


  // Metodos BOTONES TABLA 4 -- Metodos BOTONES TABLA 4
  // Metodos BOTONES TABLA 4 -- Metodos BOTONES TABLA 4

  onClickAgregar4(){

    let newElement = {
      idRow4: this.idRow4,
      id: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable4 = [...this.dataTable4, newElement];
    this.idRow4 += 1;

    const newPage = Math.trunc(this.dataTable4.length/this.nRowsTable4) * this.nRowsTable4;
    this.pageTable4 = newPage;

  }

  onClickEliminar4(){

    if (this.selectedRowTable4 && this.selectedRowTable4.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.pestana21'),
                            caracteristica: this.selectedRowTable4.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable4 && this.selectedRowTable4.state !== 'new'){
      this.dataTable4.find(row => row === this.selectedRowTable4).state = this.selectedRowTable4.state === 'delete' ? 'edit' : 'delete';
      this.editedTable4('');
    }
    else if (this.selectedRowTable4 && this.selectedRowTable4.state === 'new') {
      let index = this.dataTable4.indexOf(this.selectedRowTable4);
      this.dataTable4 = this.dataTable4.filter((val, i) => i !== index);
      this.selectedRowTable4 = undefined;
    }

  }

  onClickGuardar4(){
    if(!this.validarCamposVacios4()){
      return;
    }
    else if(!this.validarRepetidos4()){
      return;
    }
    else{
      this.subscribePostGrupoEtnico(this.buildJsonGrupoEtnico4());
    }

  }


  // Metodos BOTONES TABLA 5 -- Metodos BOTONES TABLA 5
  // Metodos BOTONES TABLA 5 -- Metodos BOTONES TABLA 5

  onClickAgregar5(){

    let newElement = {
      idRow5: this.idRow5,
      id: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable5 = [...this.dataTable5, newElement];
    this.idRow5 += 1;

    const newPage = Math.trunc(this.dataTable5.length/this.nRowsTable5) * this.nRowsTable5;
    this.pageTable5 = newPage;

  }

  onClickEliminar5(){
    if(this.selectedRowTable5 && this.selectedRowTable5.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.pestana22'), 
                            caracteristica: this.selectedRowTable5.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable5.state !== 'new'){
      this.dataTable5.find(row => row === this.selectedRowTable5).state = this.selectedRowTable5.state === 'delete' ? 'edit' : 'delete';
      this.editedTable5('');
    }
    else if (this.selectedRowTable5 && this.selectedRowTable5.state === 'new') {
      let index = this.dataTable5.indexOf(this.selectedRowTable5);
      this.dataTable5 = this.dataTable5.filter((val, i) => i !== index);

      this.selectedRowTable5 = undefined;
    }

  }

  onClickGuardar5(){
    if(!this.validarCamposVacios5()){
      return;
    }
    else if(!this.validarRepetidos5()){
      return;
    }
    else{
      this.subscribePostNivelEscolaridad(this.buildJsonNivelEscolaridad5());
    }

  }


  // Metodos BOTONES TABLA 6 -- Metodos BOTONES TABLA 6
  // Metodos BOTONES TABLA 6 -- Metodos BOTONES TABLA 6

  onClickAgregar6(){

    let newElement = {
      idRow6: this.idRow6,
      id: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable6 = [...this.dataTable6, newElement];
    this.idRow6 += 1;

    const newPage = Math.trunc(this.dataTable6.length/this.nRowsTable6) * this.nRowsTable6;
    this.pageTable6 = newPage;

  }

  onClickEliminar6(){
    if(this.selectedRowTable6 && this.selectedRowTable6.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.pestana23'), 
                            caracteristica: this.selectedRowTable6.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable6.state !== 'new'){
      this.dataTable6.find(row => row === this.selectedRowTable6).state = this.selectedRowTable6.state === 'delete' ? 'edit' : 'delete';
      this.editedTable6('');
    }
    else if (this.selectedRowTable6 && this.selectedRowTable6.state === 'new') {
      let index = this.dataTable6.indexOf(this.selectedRowTable6);
      this.dataTable6 = this.dataTable6.filter((val, i) => i !== index);

      this.selectedRowTable6 = undefined;
    }

  }

  onClickGuardar6(){
    if(!this.validarCamposVacios6()){
      return;
    }
    else if(!this.validarRepetidos6()){
      return;
    }
    else{
      this.subscribePostSexo(this.buildJsonSexo6());
    }

  }


  // Metodos BOTONES TABLA 7 -- Metodos BOTONES TABLA 7
  // Metodos BOTONES TABLA 7 -- Metodos BOTONES TABLA 7

  onClickAgregar7(){

    let newElement = {
      idRow7: this.idRow7,
      id: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable7 = [...this.dataTable7, newElement];
    this.idRow7 += 1;

    const newPage = Math.trunc(this.dataTable7.length/this.nRowsTable7) * this.nRowsTable7;
    this.pageTable7 = newPage;

  }

  onClickEliminar7(){
    if(this.selectedRowTable7 && this.selectedRowTable7.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.pestana24'),
                            caracteristica: this.selectedRowTable7.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable7.state !== 'new'){
      this.dataTable7.find(row => row === this.selectedRowTable7).state = this.selectedRowTable7.state === 'delete' ? 'edit' : 'delete';
      this.editedTable7('');
    }
    else if (this.selectedRowTable7 && this.selectedRowTable7.state === 'new') {
      let index = this.dataTable7.indexOf(this.selectedRowTable7);
      this.dataTable7 = this.dataTable7.filter((val, i) => i !== index);

      this.selectedRowTable7 = undefined;
    }

  }

  onClickGuardar7(){
    if(!this.validarCamposVacios7()){
      return;
    }
    else if(!this.validarRepetidos7()){
      return;
    }
    else{
      this.subscribePostEstadoCivil(this.buildJsonEstadoCivil7());
    }

  }


  // Metodos BOTONES TABLA 7 -- Metodos BOTONES TABLA 7
  // Metodos BOTONES TABLA 7 -- Metodos BOTONES TABLA 7

  onClickAgregar8(){

    let newElement = {
      idRow8: this.idRow8,
      id: '',
      codigo: '',
      descripcion: '',
      activo: 1,
      state: 'new',
    }
    this.dataTable8 = [...this.dataTable8, newElement];
    this.idRow8 += 1;

    const newPage = Math.trunc(this.dataTable8.length/this.nRowsTable8) * this.nRowsTable8;
    this.pageTable8 = newPage;

  }

  onClickEliminar8(){
    if(this.selectedRowTable8 && this.selectedRowTable8.isTercero === 1){
      const error = this.translate.instant('CUMCO013.MENSAJES.eliminarCAracteristicaTerceroError',
                          { pestaña: this.translate.instant('CUMCO013.pestana25'),
                            caracteristica: this.selectedRowTable8.descripcion });
        this.showMessage('error', error, '');
    }
    else if (this.selectedRowTable8.state !== 'new'){
      this.dataTable8.find(row => row === this.selectedRowTable8).state = this.selectedRowTable8.state === 'delete' ? 'edit' : 'delete';
      this.editedTable8('');
    }
    else if (this.selectedRowTable8 && this.selectedRowTable8.state === 'new') {
      let index = this.dataTable8.indexOf(this.selectedRowTable8);
      this.dataTable8 = this.dataTable8.filter((val, i) => i !== index);

      this.selectedRowTable8 = undefined;
    }

  }

  onClickGuardar8(){
    if(!this.validarCamposVacios8()){
      return;
    }
    else if(!this.validarRepetidos8()){
      return;
    }
    else{
      this.subscribePostDiscapacidad(this.buildJsonDiscapacidad8());
    }

  }


  // Metodos VALIDACION Campos Tabla1 -- Metodos VALIDACION Campos Tabla1
  // Metodos VALIDACION Campos Tabla1 -- Metodos VALIDACION Campos Tabla1

  validarCamposVacios1(): any {
    for (var _i = 0; _i < this.dataTable1.length; _i++) {
      if (this.dataTable1[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA1.headerTabla1') });
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
          const error = this.translate.instant('CUMCO013.MENSAJES.campoTipoEmpresaRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              tipoEmpresa: this.dataTable1[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }


  validarCamposVacios2(): any {
    for (var _i = 0; _i < this.dataTable2.length; _i++) {
      if (this.dataTable2[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA2.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos2(): any {

    for (var _i = 0; _i < this.dataTable2.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable2.length; _k++) {
        if (this.dataTable2[_k].descripcion.toLowerCase().trim() === this.dataTable2[_i].descripcion.toLowerCase().trim() && 
            this.dataTable2[_i].state !== 'delete' && this.dataTable2[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoCalsificacionRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              calsificacion: this.dataTable2[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }



  validarCamposVacios3(): any {
    for (var _i = 0; _i < this.dataTable3.length; _i++) {
      if (this.dataTable3[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA3.headerTabla1') });
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
          const error = this.translate.instant('CUMCO013.MENSAJES.campoActividadEconomicaRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              actividad: this.dataTable3[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }


  validarCamposVacios4(): any {
    for (var _i = 0; _i < this.dataTable4.length; _i++) {
      if (this.dataTable4[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA4.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
      else if (this.dataTable4[_i].codigo.trim() === ''){
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA4.headerTabla0') });
        this.showMessage('error', error, '');
        return false;
      }
      else if (!this.re.test(this.dataTable4[_i].codigo)){
        const error = this.translate.instant('CUMCO013.MENSAJES.wrongExpresionCodigo',
                          { filaVacia: String(_i + 1),
                            codigo: this.dataTable4[_i].codigo });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos4(): any {

    for (var _i = 0; _i < this.dataTable4.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable4.length; _k++) {
        if (this.dataTable4[_k].descripcion.toLowerCase().trim() === this.dataTable4[_i].descripcion.toLowerCase().trim() &&
            this.dataTable4[_i].state !== 'delete' && this.dataTable4[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoGrupoEtnicoRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              caracteristica: this.dataTable4[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
        else if (this.dataTable4[_k].codigo.toLowerCase().trim() === this.dataTable4[_i].codigo.toLowerCase().trim() &&
            this.dataTable4[_i].state !== 'delete' && this.dataTable4[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoGrupoEtnicoCodigoRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              codigo: this.dataTable4[_k].codigo
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }


  validarCamposVacios5(): any {
    for (var _i = 0; _i < this.dataTable5.length; _i++) {
      if (this.dataTable5[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA5.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos5(): any {

    for (var _i = 0; _i < this.dataTable5.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable5.length; _k++) {
        if (this.dataTable5[_k].descripcion.toLowerCase().trim() === this.dataTable5[_i].descripcion.toLowerCase().trim() &&
            this.dataTable5[_i].state !== 'delete' && this.dataTable5[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoNivelEscolaridadRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              caracteristica: this.dataTable5[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }

  validarCamposVacios6(): any {
    for (var _i = 0; _i < this.dataTable6.length; _i++) {
      if (this.dataTable6[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA6.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos6(): any {

    for (var _i = 0; _i < this.dataTable6.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable6.length; _k++) {
        if (this.dataTable6[_k].descripcion.toLowerCase().trim() === this.dataTable6[_i].descripcion.toLowerCase().trim() &&
            this.dataTable6[_i].state !== 'delete' && this.dataTable6[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoSexoRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              caracteristica: this.dataTable6[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }

  validarCamposVacios7(): any {
    for (var _i = 0; _i < this.dataTable7.length; _i++) {
      if (this.dataTable7[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA7.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos7(): any {

    for (var _i = 0; _i < this.dataTable7.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable7.length; _k++) {
        if (this.dataTable7[_k].descripcion.toLowerCase().trim() === this.dataTable7[_i].descripcion.toLowerCase().trim() &&
            this.dataTable7[_i].state !== 'delete' && this.dataTable7[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoEstadoCivilRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              caracteristica: this.dataTable7[_k].descripcion
            });
          this.showMessage('error', error, '');
          return false;
        }
      }
    }


    return true;
  }

  validarCamposVacios8(): any {
    for (var _i = 0; _i < this.dataTable8.length; _i++) {
      if (this.dataTable8[_i].descripcion.trim() === '') {
        const error = this.translate.instant('CUMCO013.MENSAJES.campoFilaVacioError',
                          { filaVacia: String(_i + 1), 
                            campoVacio: this.translate.instant('CUMCO013.TABLA8.headerTabla1') });
        this.showMessage('error', error, '');
        return false;
      }
    }
    return true;
  }

  validarRepetidos8(): any {

    for (var _i = 0; _i < this.dataTable8.length; _i++) {
      for (var _k = _i + 1; _k < this.dataTable8.length; _k++) {
        if (this.dataTable8[_k].descripcion.toLowerCase().trim() === this.dataTable8[_i].descripcion.toLowerCase().trim() &&
            this.dataTable8[_i].state !== 'delete' && this.dataTable8[_k].state !== 'delete') {
          const error = this.translate.instant('CUMCO013.MENSAJES.campoDiscapacidadRepetidoError',
            {
              filaRep1: String(_i + 1), filaRep2: String(_k + 1),
              caracteristica: this.dataTable8[_k].descripcion
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

  editedTable5(rowIndex) {
    this.compareInitialData(this.dataTable5, this.initialDataTable5);
  }

  editedTable6(rowIndex) {
    this.compareInitialData(this.dataTable6, this.initialDataTable6);
  }

  editedTable7(rowIndex) {
    this.compareInitialData(this.dataTable7, this.initialDataTable7);
  }

  editedTable8(rowIndex) {
    this.compareInitialData(this.dataTable8, this.initialDataTable8);
  }

  


  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar
  // Metodos para Generar los JSON para Guardar -- Metodos para Generar los JSON para Guardar

  buildJsonTipoEmpresa1(){

    var newCod: string

    var dataSend = [];
    for(var data1 of this.dataTable1){

      //if(data1.codigo === ''){
      //  newCod = this.generateCodigo(data1.descripcion);
      //}
      //else{
      //  newCod = data1.codigo;
      //}

      if (data1.state !== 'noedit'){
        dataSend.push( {
          id: data1.id,
          descripcion: data1.descripcion,
          codigo: data1.codigo ? data1.codigo: '',
          activo: data1.activo,
          state: data1.state
        });

      }
    }

    return(dataSend);
  }

  buildJsonCLasificacionOrganizacion2(){

    var newCod: string

    var dataSend = [];
    
    for(var data2 of this.dataTable2){

      if(data2.codigo === ''){
        newCod = this.generateCodigo(data2.descripcion);
      }
      else{
        newCod = data2.codigo;
      }

      if (data2.state !== 'noedit'){
        dataSend.push( {
          id: data2.id,
          descripcion: data2.descripcion,
          codigo: newCod,
          tipo: 7000,
          activo: data2.activo,
          state: data2.state
        });

      }
    }

    return(dataSend);
  }


  buildJsonActividadEconomica3(){

    var newCod: string

    var dataSend = [];
    for(var data3 of this.dataTable3){

      if(data3.codigo === ''){
        newCod = this.generateCodigo(data3.descripcion);
      }
      else{
        newCod = data3.codigo;
      }
      
      if (data3.state !== 'noedit'){
        dataSend.push( {
          id: data3.id,
          descripcion: data3.descripcion,
          codigo: newCod,
          tipo: 8000,
          activo: data3.activo,
          state: data3.state
        });

      }
    }

    return(dataSend);
  }

  buildJsonGrupoEtnico4(){

    //var newCod: string

    var dataSend = [];
    for(var data4 of this.dataTable4){

      //if(data4.codigo === ''){
      //  newCod = this.generateCodigo(data4.descripcion);
      //}
      //else{
      //  newCod = data4.codigo;
      //}

      if (data4.state !== 'noedit'){
        dataSend.push( {
          id: data4.id,
          descripcion: data4.descripcion,
          codigo: data4.codigo,
          activo: data4.activo,
          state: data4.state
        });

      }
    }

    return(dataSend);
  }


  buildJsonNivelEscolaridad5(){

    var newCod: string

    var dataSend = [];
    for(var data5 of this.dataTable5){

      if(data5.codigo === ''){
        newCod = this.generateCodigo(data5.descripcion);
      }
      else{
        newCod = data5.codigo;
      }
      
      if (data5.state !== 'noedit'){
        dataSend.push( {
          id: data5.id,
          descripcion: data5.descripcion,
          codigo: newCod,
          tipo: 3000,
          activo: data5.activo,
          state: data5.state
        });

      }
    }

    return(dataSend);
  }


  buildJsonSexo6(){

    var newCod: string

    var dataSend = [];
    for(var data6 of this.dataTable6){

      if(data6.codigo === ''){
        newCod = this.generateCodigo(data6.descripcion);
      }
      else{
        newCod = data6.codigo;
      }
      
      if (data6.state !== 'noedit'){
        dataSend.push( {
          id: data6.id,
          descripcion: data6.descripcion,
          codigo: newCod,
          tipo: 1000,
          activo: data6.activo,
          state: data6.state
        });

      }
    }

    return(dataSend);
  }

  buildJsonEstadoCivil7(){

    var newCod: string

    var dataSend = [];
    for(var data7 of this.dataTable7){

      if(data7.codigo === ''){
        newCod = this.generateCodigo(data7.descripcion);
      }
      else{
        newCod = data7.codigo;
      }
      
      if (data7.state !== 'noedit'){
        dataSend.push( {
          id: data7.id,
          descripcion: data7.descripcion,
          codigo: newCod,
          tipo: 2000,
          activo: data7.activo,
          state: data7.state
        });

      }
    }

    return(dataSend);
  }


  buildJsonDiscapacidad8(){

    var newCod: string

    var dataSend = [];
    for(var data8 of this.dataTable8){

      if(data8.codigo === ''){
        newCod = this.generateCodigo(data8.descripcion);
      }
      else{
        newCod = data8.codigo;
      }
      
      if (data8.state !== 'noedit'){
        dataSend.push( {
          id: data8.id,
          descripcion: data8.descripcion,
          codigo: newCod,
          tipo: 5000,
          activo: data8.activo,
          state: data8.state
        });

      }
    }

    return(dataSend);
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


   // Metodos para Generar el campo CODIGO para Guardar -- Metodos para Generar el campo CODIGO para Guardar
  // Metodos para Generar el campo CODIGO para Guardar -- Metodos para Generar el campo CODIGO para Guardar

  generateCodigo(stringName: string): string {
    var codigo: string;
    const upperCase = stringName.toLocaleUpperCase();
    var splitted = upperCase.split(" ");
    if (splitted.length >= 4){
      codigo = splitted[0] + splitted[1] + splitted[2] + splitted[3];
    }
    else if (splitted.length === 3){
      if (splitted[0].length >= 2){
        codigo = splitted[0].substr(0, 2) + splitted[1] + splitted[2];
      }
      else{
        codigo = splitted[0] + splitted[1] + splitted[2];
      }
    }
    else if (splitted.length === 2){
      if (splitted[0].length >= 2 && splitted[1].length >= 2){
        codigo = splitted[0].substr(0, 2) + splitted[1].substr(0, 2);
      }
      else if(splitted[0].length >= 3){
        codigo = splitted[0].substr(0, 3) + splitted[1];
      }
      else{
        codigo = splitted[0] + splitted[1];
      }
    }
    else{
      if (splitted[0].length >= 4){
        codigo = splitted[0].substr(0, 4);
      }
      else{
        codigo = splitted[0];
      }
    }
    return codigo;

  }


}
