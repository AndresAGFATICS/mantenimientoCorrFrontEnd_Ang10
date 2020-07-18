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
    return this.get("/sistema/1.0.0/tipoDocumental/codigoDescripcion?activo=" + activo + "&codigoDescripcion=" + codigoDescripcion);
  }

  public getConfigurarAccionTipoDocumental() {
    return this.get("/documentos/1.0.0/configurarAccionTipoDocumental?activo=1");
  }

  public getAccionDocumental() {
    return this.get("/documentos/1.0.0/accionTipoDocumental");
  }

  public postGuardarAccionTipoDocumental(body: any) {
    return this.post('/documentos/1.0.0/guardarAccionTipoDocumental',body);
  }

}
