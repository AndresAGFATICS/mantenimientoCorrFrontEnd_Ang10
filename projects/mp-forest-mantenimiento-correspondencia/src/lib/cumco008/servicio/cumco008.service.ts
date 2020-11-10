import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco008Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }

  // Table 1 Services
  public getCanalEnvio(parameters: string) {
    return this.get('/forest/documentos/1.0.0/canalEnvio' + parameters);
  }

  public getCanalEnvioDescripcion(parameters: string) {
    return this.get('/forest/documentos/1.0.0/canalEnvio/codigo' + parameters); // ?activo=1&codigoDescripcion=Webfile
  }

  public postCanalEnvio(body: any) {
    return this.post('/mnt-corr/1.0.0/canalEnvio/guardarGrid',body);
  }

  // Table 2 Services
  public getMedioCanalEnvio(parameters: string) {
    return this.get('/forest/documentos/1.0.0/canalEnvio/medioEnvio/Fuente' + parameters); // ?idCanal=1060&idMedio=1
  }

  public getMedioEnvio(parameters: string) {
    return this.get('/forest/sistema/1.0.0/medioEnvio/codigoDescripcion' + parameters); // ?activo=1&codigoDescripcion=1
  }

  public postAsociacionMedioCanal(body: any) {
    return this.post('/forest/documentos/1.0.0/asociacionCanalMedioEnvio', body);
  }

  public postAsociacionMedioCanal2(body: any) {
    return this.post('/mnt-corr/1.0.0/RelacionMedioCanalEnvio/guardar', body);
  }

  public getRadicadoMedioEnvio(parameters: string) {
    return this.get('/mnt-corr/1.0.0/RadicadoBorrador' + parameters); // ?activos=1&page=1&size=1&idCanalEnvio=1&idMedioEnvio=3
  }


}
