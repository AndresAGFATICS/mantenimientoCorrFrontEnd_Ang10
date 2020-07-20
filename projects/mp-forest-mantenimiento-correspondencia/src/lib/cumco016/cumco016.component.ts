import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
//import * as confJson from '../../assets/i18n/es.json';
import {TreeNode} from 'primeng/api';
import { EjeTematicoService } from './servicio/eje-tematico.service';
import { TranslateService } from '@ngx-translate/core';

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
  ejetematicoDependenciaLista: any [];

  rowIndex = 0;

  rows: Row[];

  cols: any[];

  selectedRows: Row[] = [];

  files: TreeNode[] = [];

  sourceRows: Row[] = [];

  targetRows: Row[] = [];

  selectedFile: TreeNode;

  constructor(private ejeTematicoService: EjeTematicoService,
  private translate: TranslateService) {
    this.rows = [];



}



  ngOnInit() {
    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.subcribeServiceEjeTematico('','');
    this.subscribeDependenciaLista('','');
  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.cols = [
        { field: 'codigo', header: this.translate.instant('CUMCO016.TABLA1.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO016.TABLA1.headerTabla2') },
        { field: 'activo', header: this.translate.instant('CUMCO016.TABLA1.headerTabla3') }
      ];

    });
  }

  subscribeEjeTematicoDependencia(idDependencia:string) {
    this.ejeTematicoService.getEjeTematicoDependencia(idDependencia).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.ejetematicoDependenciaLista = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.updateEjeTematicoDependencia(this.ejetematicoDependenciaLista);
      });
  }

  updateEjeTematicoDependencia(ejetematicoDependencia: any[]): any {
      this.targetRows = [];
    ejetematicoDependencia.forEach(data => {
      this.targetRows.push({
        id: data.id,
        codigo: '',
        descripcion: data.descripcion,
        activo: data.activo
      });
    })
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
        this.updateDependencias(this.dependenciaLista);
      });
  }
  updateDependencias(dependenciaLista: any[]): any {
    dependenciaLista.forEach(dependencia => {
      if(dependencia.tipoDependencia.nombre !== 'CDC' && dependencia.tipoDependencia.codigo !=='CDC')
      {
        this.files.push({
          label: dependencia.nombre,
          data: dependencia.id,
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder'
        })
      }
    })

  }

  subcribeServiceEjeTematico(descripcion: string, activo: string): any {
    this.ejeTematicoService.getEjeTematico(descripcion, activo).subscribe(

      (getRes: any[]) => {     // Inicio del suscribe
        this.confEjeTematico = getRes;
        return getRes;
      },
      getError => {           // Error del suscribe
        console.log('GET call in error', getError);
      },
      () => {                 // Fin del suscribe
        this.updateTable(this.confEjeTematico);
      });
  }

  updateTable(dataArray: any[]) {

    this.rows = [];
    for (const data of dataArray) {
      //const index = this.rows.indexOf(selectedRow);
      this.rows.push({
        id: data.id,
        codigo: (dataArray.indexOf(data)+1001).toString().substring(1,4),
        descripcion: data.descripcion,
        activo: data.activo
      });
    }
  }

  onNodeSelect($event) {
    this.subscribeEjeTematicoDependencia(this.selectedFile.data);
  }

  onClicAgregar() {
    let rows = [...this.rows];

    rows.push({
                id: '',
                codigo: (this.rows.length + 1001).toString().substring(1,4),
                descripcion: '',
                activo: '1'})

    this.rows = rows;
    this.rowIndex = this.rowIndex + 1;
  }

  onClicEliminar() {
    let id;
    let rows = [];

    for (const selectedRow of this.selectedRows) {
      let index = this.rows.indexOf(selectedRow);
      this.rows = this.rows.filter((val, i) => i !== index);
    }
    this.updateCodTable();
    this.selectedRows = [];
  }
  updateCodTable(): any {
    this.rows.forEach(row => {
      row.codigo = (this.rows.indexOf(row)+1001).toString().substring(1,4);
    })
  }

}

export interface Row {
  id;
  codigo;
  descripcion;
  activo;
}
