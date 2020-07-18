import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cumco013',
  templateUrl: './cumco013.component.html',
  styleUrls: ['./cumco013.component.css']
})
export class CUMCO013Component implements OnInit {

  text: string;
  results: any[];
  columnasAdjuntos: any[];
  columnasOrganizacion: any[];
  columnasEconomica: any[];
  adjunto: any[];
  adjuntosSeleccionados: any[];

  constructor() { }

  ngOnInit() {
    this.results = [
      'a', 'b', 'c'
    ];
    this.onCargarColumnas();
  }
  onCargarColumnas() {
      this.columnasAdjuntos = [
        { field: 'tipEmp', header: 'Tipo de Empresa' },
        { field: 'act', header: 'Activo' }
      ];
      this.columnasOrganizacion = [
        { field: 'clasOrg', header: 'Clasificación de la Organización' },
        { field: 'act', header: 'Activo' }
      ];
      this.columnasEconomica = [
        { field: 'actEcon', header: 'Actividad Económica de la Organización' },
        { field: 'act', header: 'Activo' }
      ];
    }
    onClickBorrarAutoComplete() {
      this.text = '';
    }

    onClicBorrarColumna() {
      this.adjuntosSeleccionados.forEach(res => {
        this.adjunto.slice(this.adjunto.indexOf(res), 1);
      })
    }
    onClicAnadirColumna() {
      this.adjunto.push({ id: this.adjunto.length + 1 })
    }
    onGuardarColumna() {
  //Aquí se debe incluir la logica relacionada con las validaciones de la tabla y el
  }

  agregarClick() {
  //implementar
  }

  eliminarClick() {
  //implementar
  }

}
