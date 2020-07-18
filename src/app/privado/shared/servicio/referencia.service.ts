import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// SERVICIOS
import { GeneralService } from 'src/app/shared/servicio/general.service';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { AppSettings } from 'src/app/AppSettings';

// MODELOS
import { MenuForma } from 'src/app/publico/shared/modelo/MenuForma';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService extends GeneralService {
  public menu: MenuForma;

  constructor(public _http: HttpClient, private sessionService: SessionService) {
    super(_http);
  }

  /**
  * Función para obtener un listado de menu segun el usuario autenticado
  *
  * @param userName nombre de usuario del funcionario
  * @returns retorna un Observable (Funcionario), el cual es el resultado de la transacción
  */
  public async getMenuFormas() {
    let tipoMenu = this.getMenuTopBar();
    let url

    if (!window['PRODUCTO'].isWso2) {
      url = "assets/menu_formas.json";
    } else {
      url = `${AppSettings.ENDPOINT_MENU}`;
    }
    const accessToken = this.sessionService.getCurrentToken();
    return this.get(url, accessToken);
  }
  
  public getMenuTopBar() {
    return  JSON.parse(localStorage.getItem("topbar")); 
  }
 /**
  * Función para obtener un listado de reportes en el menu
  *
  * @param userName nombre de usuario del funcionario
  * @returns retorna un Observable (Funcionario), el cual es el resultado de la transacción
  */
 public async getMenuFormasReport() {
  let url
  url = `${AppSettings.ENDPOINT_MENU_REPORT}`;
  return this.get(url);
}
}
