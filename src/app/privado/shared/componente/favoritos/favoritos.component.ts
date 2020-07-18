import { Component, OnInit } from '@angular/core';
import { MenuForma } from 'src/app/publico/shared/modelo/MenuForma';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { Session } from 'src/app/publico/shared/modelo/Session';
import { ReferenciaService } from '../../servicio/referencia.service';
import { AppSettings } from 'src/app/AppSettings';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  menuForma: MenuForma;
  actividades: MenuForma[];
  actividad: MenuForma;
  hijos: MenuForma[];

  constructor(public sessionService: SessionService, private referenciaService: ReferenciaService) { }


  ngOnInit() {

    this.actividades = [];
    this.waitMenu();
    sessionStorage.setItem("/home/dashboard", "Favoritos");
  }

  /**
   * Espera que la variable de session que contiene el menu tenga valor Y carga la seccion de favoritos
   */
  waitMenu() {
    let session = <Session>this.sessionService.getCurrentSession();

    if (session == null || !session.menuForma || !session.menuForma.menu_formas) {
      window.setTimeout(function () { this.waitMenu(); }.bind(this), 200);
      return;
    }
    let menuTmp = JSON.parse(JSON.stringify(session.menuForma.menu_formas));
    this.obtenerHijos(menuTmp)
  }

  /**
   * obtiene los hijos del menu clasificados como favoritos y los agrega a la interface
   * @param menu 
   */
  async obtenerHijos(menu: any) {
    menu.forEach(item => {
      this.hijos = item.hijos
      let urlForma
      this.hijos.forEach(hijo => {
        if (hijo.favorito) {
          if (hijo.codigo_forma.startsWith('FRM')) {
            urlForma = "/home/general/".concat(hijo.codigo_forma);
          } else {
            urlForma = hijo.codigo_forma ? hijo.codigo_forma.replace("archivo/#", "home") : "";
          }
          hijo.codigo_forma = urlForma;

          if (hijo.icono) {

          } else {
            hijo.icono = AppSettings._API_ENDPOINT_FOREST.concat("resources/img/favoritos.png");
          }
          this.actividades.push(hijo)
        }
      });
    });
  }

  /**
   * 
   * @param str valida si la url suministrada es correcta
   */
  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }
}
