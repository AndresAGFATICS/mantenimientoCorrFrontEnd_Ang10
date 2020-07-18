import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cumco018',
  templateUrl: './cumco018.component.html',
  styleUrls: ['./cumco018.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO018Component implements OnInit {

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
        { field: 'codRuta', header: 'Código' },
        { field: 'nomRuta', header: 'Nombre' },
        { field: 'actRuta', header: 'Activo' }
      ];
      this.columnasOrganizacion = [
        { field: 'codMens', header: 'Código' },
        { field: 'depMens', header: 'Dependencia' },
        { field: 'nomMens', header: 'Nombre' },
        { field: 'actMens', header: 'Activo' }
      ];
      this.columnasEconomica = [
        { field: 'codEmp', header: 'Código' },
        { field: 'nomEmp', header: 'Nombre' },
        { field: 'actEmp', header: 'Activo' }
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

  search(event) {
    //implementar
  }


}
