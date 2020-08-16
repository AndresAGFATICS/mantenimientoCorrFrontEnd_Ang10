import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco017Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }

  // Table 1 Services
  public getGrupoSeguridad(parameters: string) {
    return this.get('/forest/documentos/1.0.0/grupoSeguridad' + parameters);
  }

  public getClasificacionInformacion(parameters: string) {
    return this.get('/forest/sistema/1.0.0/clasificacionInformacion' + parameters);
  }

  public postAsociarGrupoSeguridad(body: any) {
    return this.post('/mnt-corr/1.0.0/grupoSeguridad/guardar_grid',body);
  }

  // Table 2 Services
  public getRadicadoNoAnuladoCruzado(parameters: string) {
    return this.get('/mnt-corr/1.0.0/RelacionGrupoSeguridadRadicado' + parameters);
  }

  public getRadicadoFuncionarioAsociado(parameters: string) {
    return this.get('/mnt-corr/1.0.0/RelacionGrupoSeguridadRadicado' + parameters);
  }

  public getForestPropiedades(parameters: string) {
    return this.get('/mnt-corr/1.0.0/forestPropiedades' + parameters); // ?nombre=corr.HabilitarEdicionClasifSeg
  }

  public getOrganismoDependencia(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/dependencia/lista' + getParameters);
  }
  

  public getFuncionario(getParameters: string) {
    return this.get('/forest/sistema/1.0.0/funcionarios/dependenciaAsociados' + getParameters); // ?activo=1&ausente=0&idDependencia=1004
  }

  public postRelacionGrupoSeguridadRadicado(body: any) {
      return this.post('/mnt-corr/1.0.0/RelacionGrupoSeguridadRadicado/guardar_grid',body);
  }


}
