import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
          { field: 'tipEmp', header: this.translate.instant('CUMCO013.TABLA1.headerTabla1') },
          { field: 'act', header: this.translate.instant('CUMCO013.TABLA1.headerTabla2') }
        ];
        this.columnasOrganizacion = [
          { field: 'clasOrg', header: this.translate.instant('CUMCO013.TABLA2.headerTabla1') },
          { field: 'act', header: this.translate.instant('CUMCO013.TABLA2.headerTabla2') }
        ];
        this.columnasEconomica = [
          { field: 'actEcon', header: this.translate.instant('CUMCO013.TABLA3.headerTabla1') },
          { field: 'act', header: this.translate.instant('CUMCO013.TABLA3.headerTabla2') }
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
