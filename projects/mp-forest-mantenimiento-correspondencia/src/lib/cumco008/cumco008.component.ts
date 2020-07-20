import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cumco008',
  templateUrl: './cumco008.component.html',
  styleUrls: ['./cumco008.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Cumco008Component implements OnInit {

  constructor( private translate: TranslateService) { }

  rowIndex = 0;

  rows: Row[];

  cols: any[];

  selectedRows: Row[];

  rows2: Row2[];

  cols2: any[];

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
        { field: 'id', header: this.translate.instant('CUMCO008.TABLA1.headerTabla0') },
        { field: 'codigo', header: this.translate.instant('CUMCO008.TABLA1.headerTabla1') },
        { field: 'descripcion', header: this.translate.instant('CUMCO008.TABLA1.headerTabla2') },
        { field: 'activo', header: this.translate.instant('CUMCO008.TABLA1.headerTabla3') },
        { field: 'virtual', header: this.translate.instant('CUMCO008.TABLA1.headerTabla4') },
        { field: 'presencial', header: this.translate.instant('CUMCO008.TABLA1.headerTabla5') },
        { field: 'telefonico', header: this.translate.instant('CUMCO008.TABLA1.headerTabla6') }
      ];

      this.cols2 = [
        { field: 'id', header: this.translate.instant('CUMCO008.TABLA2.headerTabla0') },
        { field: 'medio_de_envio', header: this.translate.instant('CUMCO008.TABLA2.headerTabla1') },
        { field: 'fuente', header: this.translate.instant('CUMCO008.TABLA2.headerTabla2') },
        { field: 'ventanilla_virtual', header: this.translate.instant('CUMCO008.TABLA2.headerTabla3')}
      ];
    });
  }

  onClicAgregar() {
    let rows = [...this.rows];

    rows.push({ id: this.rowIndex,
                codigo: '',
                descripcion: '',
                activo: '',
                virtual: '',
                presencial: '',
                telefonico: ''})

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
  descripcion;
  activo;
  virtual;
  presencial;
  telefonico;
}

export interface Row2 {
  id;
  medio_de_envio;
  fuente;
  ventanilla_virtual;
}
