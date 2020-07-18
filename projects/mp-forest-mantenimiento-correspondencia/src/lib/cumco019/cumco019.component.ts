import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cumco019',
  templateUrl: './cumco019.component.html',
  styleUrls: ['./cumco019.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CUMCO019Component implements OnInit {

  text: string;
  results: any[];
  columnasAdjuntos: any[];
  columnasAdjuntosComunicacion: any[];
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
        { field: 'cod', header: 'Código' },
        { field: 'nom', header: 'Nombre' },
        { field: 'clasDoc', header: 'Clase Documental' }
      ];
      this.columnasAdjuntosComunicacion = [
        { field: 'codEsp', header: 'Código tipo de Comunicación Oficial' },
        { field: 'cargo', header: 'Cargo Firmante' }
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
