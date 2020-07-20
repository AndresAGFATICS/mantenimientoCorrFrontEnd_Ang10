import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cumco017',
  templateUrl: './cumco017.component.html',
  styleUrls: ['./cumco017.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Cumco017Component implements OnInit {

  constructor(private translate: TranslateService) { }

  rowIndex = 0;

  rows: Row[];
  cols: any[];
  selectedRows: Row[];

  rows2: Row2[];
  cols2: any[];

  rows3: any[];
  cols3: any[];

  rows4: any[];
  cols4: any[];

  rows5: any[];
  cols5: any[];

  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();

    this.rows = [];





  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {

      this.cols = [
        { field: 'id', header: this.translate.instant('CUMCO017.TABLA1.headerTabla0') },
        { field: 'codigo', header: this.translate.instant('CUMCO017.TABLA1.headerTabla1') },
        { field: 'descripcion_tipo_radicado', header: this.translate.instant('CUMCO017.TABLA1.headerTabla2') },
        { field: 'categoria', header: this.translate.instant('CUMCO017.TABLA1.headerTabla3') },
        { field: 'activo', header: this.translate.instant('CUMCO017.TABLA1.headerTabla4') }
      ];

      this.cols2 = [
        { field: 'codigo_tipo_radicado', header: this.translate.instant('CUMCO017.TABLA2.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO017.TABLA2.headerTabla2') },
        { field: 'tramite', header: this.translate.instant('CUMCO017.TABLA2.headerTabla3') },
        { field: 'dias_termino', header: this.translate.instant('CUMCO017.TABLA2.headerTabla4') },
        { field: 'dias_habiles', header: this.translate.instant('CUMCO017.TABLA2.headerTabla5') },
        { field: 'activo', header: this.translate.instant('CUMCO017.TABLA2.headerTabla6') },
        { field: 'ventanilla_de_entrada', header: this.translate.instant('CUMCO017.TABLA2.headerTabla7') },
        { field: 'radicacion_verbal', header: this.translate.instant('CUMCO017.TABLA2.headerTabla8') },
        { field: 'comunicaciones_oficiales', header: this.translate.instant('CUMCO017.TABLA2.headerTabla9') },
        { field: 'ventanilla_virtual', header: this.translate.instant('CUMCO017.TABLA2.headerTabla10') },
        { field: 'anonimo', header: this.translate.instant('CUMCO017.TABLA2.headerTabla11') },

      ];

      this.cols3 = [
        { field: 'id', header: this.translate.instant('CUMCO017.TABLA3.headerTabla0') },
        { field: 'codigo', header: this.translate.instant('CUMCO017.TABLA3.headerTabla1') },
        { field: 'nombre', header: this.translate.instant('CUMCO017.TABLA3.headerTabla2') },
        { field: 'lista de_requisitos', header: this.translate.instant('CUMCO017.TABLA3.headerTabla3') }
      ];

      this.cols4 = [
        { field: 'codigo', header: this.translate.instant('CUMCO017.TABLA4.headerTabla1') },
        { field: 'nombre', header: this.translate.instant('CUMCO017.TABLA4.headerTabla2') },
        { field: 'descripcion', header: this.translate.instant('CUMCO017.TABLA4.headerTabla3')},
        { field: 'activo', header: this.translate.instant('CUMCO017.TABLA4.headerTabla4') },
        { field: 'requerido', header: this.translate.instant('CUMCO017.TABLA4.headerTabla5')},
        { field: 'requerido', header: this.translate.instant('CUMCO017.TABLA4.headerTabla6') },
        { field: 'formato_de_archivo', header: this.translate.instant('CUMCO017.TABLA4.headerTabla7') },
        { field: 'cargar_formulario', header: this.translate.instant('CUMCO017.TABLA4.headerTabla8') }
      ];
  
      this.cols5 = [
        { field: 'requisito', header: this.translate.instant('CUMCO017.TABLA5.headerTabla1') }
      ];
    });
  }

  onClicAgregar() {
    let rows = [...this.rows];

    rows.push({ id: this.rowIndex,
                codigo: '',
                descripcion_tipo_radicado: '',
                categoria: '',
                activo: ''})

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
    this.selectedRows = [];
  }

}

export interface Row {
  id;
  codigo;
  descripcion_tipo_radicado;
  categoria;
  activo;
}

export interface Row2 {
  codigo_tipo_radicado;
  descripcion;
  tramite;
  dias_termino;
  dias_habiles;
  modificar_dias;
  activo;
  ventanilla_de_entrada;
  radicacion_verbal;
  comunicaciones_oficiales;
  ventanilla_virtual;
  anonimo;
}
