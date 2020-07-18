import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-cumco008',
  templateUrl: './cumco008.component.html',
  styleUrls: ['./cumco008.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Cumco008Component implements OnInit {

  constructor() { }

  rowIndex = 0;

  rows: Row[];

  cols: any[];

  selectedRows: Row[];

  rows2: Row2[];

  cols2: any[];

  ngOnInit() {

    this.rows = [];

    this.cols = [
      { field: 'id', header: '' },
      { field: 'codigo', header: 'Código' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'activo', header: 'Activo' },
      { field: 'virtual', header: 'Virtual' },
      { field: 'presencial', header: 'Presencial' },
      { field: 'telefonico', header: 'Telefónico' }
    ];

    this.cols2 = [
      { field: 'id', header: '' },
      { field: 'medio_de_envio', header: 'Medio de Envío' },
      { field: 'fuente', header: 'Fuente' },
      { field: 'ventanilla_virtual', header: 'Ventanilla Virtual' }
    ];

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

