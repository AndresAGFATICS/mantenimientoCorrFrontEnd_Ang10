import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco014Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }
  public getTipoRadicado(codigo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicado?codigoDescripcion=' + codigo);
  }
  public getTablaTipoRadicado(codigo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicado?&codigoDescripcion=' + codigo);
  }
  public getSubTipoRadicado(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/tipoRadicadoTramite' + getParameters);
  }
  public getTramiteActivo(parameters: string) {
    return this.get('/forest/forest/sistema/1.0.0/tramite/activo' + parameters ); // activo?=tr&activo=1&size=10&page=1'
  }
  public postGuardarRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/tipoRadicado/guardar',body);
  }
}
