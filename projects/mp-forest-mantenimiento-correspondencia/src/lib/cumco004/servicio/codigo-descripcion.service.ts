import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodigoDescripcionService extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }

  public getCodigoDescripcion(codigoDescripcion: string, activo: string) {
    return this.get("/forest/sistema/1.0.0/tipoDocumental/codigoDescripcion?activo=" + activo + "&codigoDescripcion=" + codigoDescripcion);
  }

  public getConfigurarAccionTipoDocumental(parameters) {
    //return this.get("/forest/documentos/1.0.0/configurarAccionTipoDocumental?activo=1");
    return this.get("/mnt-corr/1.0.0/RelacionAccionTipoDocumental" + parameters);
  }

  public getAccionDocumental() {
    return this.get("/forest/documentos/1.0.0/accionTipoDocumental");
  }


  public getTipoDocumental(getParameters = '') {
    return this.get("/forest/sistema/1.0.0/tipoDocumental" + getParameters);
  }


  public postGuardarAccionTipoDocumental(body: any) {
    return this.post('/forest/documentos/1.0.0/guardarAccionTipoDocumental',body);
  }

}
