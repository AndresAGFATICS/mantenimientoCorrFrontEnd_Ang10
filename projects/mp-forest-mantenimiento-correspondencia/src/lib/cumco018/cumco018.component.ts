import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
        { field: 'codRuta', header: this.translate.instant('CUMCO018.TABLA1.headerTabla1') },
        { field: 'nomRuta', header: this.translate.instant('CUMCO018.TABLA1.headerTabla2') },
        { field: 'actRuta', header: this.translate.instant('CUMCO018.TABLA1.headerTabla3') }
      ];
      this.columnasOrganizacion = [
        { field: 'codMens', header: this.translate.instant('CUMCO018.TABLA2.headerTabla1')},
        { field: 'depMens', header: this.translate.instant('CUMCO018.TABLA2.headerTabla2') },
        { field: 'nomMens', header: this.translate.instant('CUMCO018.TABLA2.headerTabla3') },
        { field: 'actMens', header: this.translate.instant('CUMCO018.TABLA2.headerTabla4') }
      ];
      this.columnasEconomica = [
        { field: 'codEmp', header: this.translate.instant('CUMCO018.TABLA3.headerTabla1') },
        { field: 'nomEmp', header: this.translate.instant('CUMCO018.TABLA3.headerTabla2') },
        { field: 'actEmp', header: this.translate.instant('CUMCO018.TABLA3.headerTabla3') }
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

  search(event) {
    //implementar
  }


}
