import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService) { }

  ngOnInit() {

    // Setting lenguaje por defecto
    this.translate.setDefaultLang('es');


    // Nombrar las columnas de la primera tabla
    this.subcribeSetColumns();
    this.results = [
      'a', 'b', 'c'
    ];
  }
  subcribeSetColumns() {
    this.translate.get(['']).subscribe(translations => {
    this.columnasAdjuntos = [
      { field: 'cod', header: this.translate.instant('CUMCO019.TABLA1.headerTabla1')},
      { field: 'nom', header: this.translate.instant('CUMCO019.TABLA1.headerTabla2') },
      { field: 'clasDoc', header: this.translate.instant('CUMCO019.TABLA1.headerTabla3') }
    ];
    this.columnasAdjuntosComunicacion = [
      { field: 'codEsp', header: this.translate.instant('CUMCO019.TABLA2.headerTabla1') },
      { field: 'cargo', header: this.translate.instant('CUMCO019.TABLA2.headerTabla2') }
    ];
  });
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
