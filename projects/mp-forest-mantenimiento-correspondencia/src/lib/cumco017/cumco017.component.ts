import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cumco017',
  templateUrl: './cumco017.component.html',
  styleUrls: ['./cumco017.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Cumco017Component implements OnInit {

  constructor() { }

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

    this.rows = [];


    this.cols = [
      { field: 'id', header: '' },
      { field: 'codigo', header: 'Código' },
      { field: 'descripcion_tipo_radicado', header: 'Descripción Tipo Radicado' },
      { field: 'categoria', header: 'Categoria' },
      { field: 'activo', header: 'Activo' }
    ];

    this.cols2 = [
      { field: 'codigo_tipo_radicado', header: 'Código Tipo Radicado' },
      { field: 'descripcion', header: 'Descripción (Subtipo de Radicado)' },
      { field: 'tramite', header: 'Trámite' },
      { field: 'dias_termino', header: 'Días Termino' },
      { field: 'dias_habiles', header: 'Días Habiles' },
      { field: 'activo', header: 'Activo' },
      { field: 'ventanilla_de_entrada', header: 'Ventanilla de Entrada' },
      { field: 'radicacion_verbal', header: 'Radicación Verbal' },
      { field: 'comunicaciones_oficiales', header: 'Comunicaciones Oficiales' },
      { field: 'ventanilla_virtual', header: 'Ventanilla Virtual' },
      { field: 'anonimo', header: 'Anónimo' },

    ];

    this.cols3 = [
      { field: 'id', header: '' },
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'lista de_requisitos', header: 'Lista de Requisitos' }
    ];

    this.cols4 = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'activo', header: 'Activo' },
      { field: 'requerido', header: 'Requerido' },
      { field: 'requerido', header: 'Requerido' },
      { field: 'formato_de_archivo', header: 'Formato de Archivo (Ventanilla virtual)' },
      { field: 'cargar_formulario', header: 'Cargar de Formulario (Ventanilla virtual)' }
    ];

    this.cols5 = [
      { field: 'requisito', header: 'Requisito' }
    ];


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
