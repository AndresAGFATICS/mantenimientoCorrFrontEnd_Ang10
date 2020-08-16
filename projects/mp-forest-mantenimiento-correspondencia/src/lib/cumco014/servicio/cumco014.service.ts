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
    return this.get('/forest/sistema/1.0.0/tramite/activo' + parameters ); // activo?=tr&activo=1&size=10&page=1'
  }
  public getCategoriaradicado(parameters: string) {
    return this.get('/forest/documentos/1.0.0/categoriaRadicado' + parameters ); // ?activo=1&codigoDescripcion=e
  }
  public postGuardarRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/tipoRadicado/guardar',body);
  }
  public postGuardarSubtipoRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/tipoRadicado/tramite/guardar',body);
  }

  // Table 3 Services
  public getCategoriaRadicado2(parameters: string) {
    return this.get('/forest/documentos/1.0.0/categoriaRadicado' + parameters ); // ?page=1&size=20'
  }

  public postCategoriaRadicado(body: any) {
    return this.post('/mnt-corr/1.0.0/categoriaTipoRadicado/guardarGrid',body);
  }

  // Table 4 Services
  public getRequisitos(parameters: string) {
    return this.get('/forest/documentos/1.0.0/requisitos' + parameters ); // ?page=1&size=20'
  }


  // Table 5 Services 
  public getRequisitosAsociadoRadicado(parameters: string) {
    return this.get('/forest/documentos/1.0.0/requisitos/tipoRadicadoTramite' + parameters ); // ?idTramiteTipoRadicado=281
  }

}
