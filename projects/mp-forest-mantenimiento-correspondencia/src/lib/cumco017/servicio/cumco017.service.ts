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
    if(this._IN_DEVELOP){
      return this.post('/mnt-corr//1.0.0/grupoSeguridad/guardar_grid',body);
    }else{
      return this.post('/mnt-corr/1.0.0/grupoSeguridad/guardar_grid',body);
    }
  }

  // Table 2 Services
  public getRadicadoNoAnuladoCruzado(parameters: string) {
    //return this.get('/forest/documentos/1.0.0/radicado?anulado=0&esReferenciadoCurzada=0' + parameters); // &numrad=1-2019-ER-000003
    if(this._IN_DEVELOP){
      return this.get('/mnt-corr//1.0.0/RelacionGrupoSeguridadRadicado' + parameters); // ?numRad=20190Secria0
    }else{
      return this.get('/mnt-corr//1.0.0/RelacionGrupoSeguridadRadicado' + parameters);
    }
  }

  public getRadicadoFuncionarioAsociado(parameters: string) {
    //return this.get('/forest/documentos/1.0.0/grupoSeguridad/funcionariosAsociados' + parameters); // ?idRadicado=299
    if(this._IN_DEVELOP){
      return this.get('/mnt-corr//1.0.0/RelacionGrupoSeguridadRadicado' + parameters); // ?idRadicado=299
    }else{
      return this.get('/mnt-corr//1.0.0/RelacionGrupoSeguridadRadicado' + parameters);
    }
  }

  public getOrganismoDependencia(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/dependencia/lista' + getParameters);
  }

  public getFuncionario(getParameters: string) {
    return this.get('/forest/sistema/1.0.0/funcionarios/dependenciaAsociados' + getParameters); // ?activo=1&ausente=0&idDependencia=1004
  }

  public postRelacionGrupoSeguridadRadicado(body: any) {
    if(this._IN_DEVELOP){
      return this.post('/mnt-corr//1.0.0/RelacionGrupoSeguridadRadicado/guardar_grid',body);
    }else{
      return this.post('/mnt-corr/1.0.0/RelacionGrupoSeguridadRadicado/guardar_grid',body);
    }
  }


}
