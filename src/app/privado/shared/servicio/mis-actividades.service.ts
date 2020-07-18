import { Injectable } from '@angular/core';
import { GeneralService } from '../../../shared/servicio/general.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../modelo/Actividad';
import { AppSettings } from 'src/app/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class MisActividadesService extends GeneralService {
  actividadActual: Actividad;

  constructor(public _http: HttpClient) {
    super(_http);
  }

  public getActividadesUsuario(pagina?: number, size?: number,sortField? :string,sortOrder?: number) {
    let order = "";
    let pagination ="";
        if(sortField){
      order = "&sortField=" + sortField + "&sortOrder=" +sortOrder;
    }
    if (pagina && size){
    pagination = "page=" + pagina + "&size=" + size ;
    }
      return this.getWorkplaceService("?" +pagination+ order);
  }
  /**
   * 
   * @param pagina 
   * @param size 
   */
  public getDelegados() {
    return this.getWorkplaceService("listUsuariosDelegados");
  }

  public getDependencias() {
    return this.getWorkplaceService("listDependenciasActividadesUsuario");
  }

  /**
  * Método para ejecutar los servicios tipo GET de mpWorkplaceREST
  * 
  * @param url path del servicio a ejecutar ejemplo 'dependencias'
  */
  getWorkplaceService(url: string) {

    return this.getFullResponse(AppSettings.ENDPOINT_LISTAR_WORKPLACE_USUARIO + url);
  }


  /**
   * Método para ejecutar los servicios tipo GET de igacSistema
   * 
   * @param url path del servicio a ejecutar ejemplo 'dependencias'
   */
  getForestTask(idActividadBpm: string): Observable<any> {
    return this.getForestTaskHttp(idActividadBpm)
  }

  /**
   * Setea el valor de actividadActual
   * @param actividad actividad a setear
   */
  setActividadActual(actividad: Actividad) {
    this.actividadActual = actividad;
  }

  /**
   * Retorna la actividad actual
   */
  getActividadActual(): Actividad {
    return this.actividadActual;
  }

  getInfoAdicional(idActividadDetalle, businessKey) {
     return this.get(AppSettings.ENDPOINT_LISTAR_DETALLE_ACTIVIDADES + idActividadDetalle + "/" + businessKey);
  }
  getComentarios(proccesInstanceId:string){
    return this.get(AppSettings.ENDPOINT_COMMENT_ACTIVIDADES+proccesInstanceId+"/getAll")
  }
}
