import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Cumco020Service extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }
  //public postComuniacion(body: any) {
  //  return this.post('/forest/documentos/1.0.0/tipoComunicacion/guardar', body);
  //}

  public getProcesoSGS(parameters: string) {
    return this.get('/mnt-corr/1.0.0/ProcesoSGS' + parameters);
  }

  public getRelacionProcesoDependencia(parameters : any) {
    return this.get('/mnt-corr/1.0.0/RelacionProcesoDependencia'  + this.createParameters(parameters) ); // ?idProceso=3
  }

  public postProcesoSGS(body: any) {
      return this.post('/mnt-corr/1.0.0/ProcesoSGS/guardarGrid', body);
  }

  public getProcedimientoSGS(parameters: string) {
    return this.get('/mnt-corr/1.0.0/ProcedimientoSGC' + parameters); // ?idProceso=1
  }

  public getRelacionProcedimientoDependencia(parameters: string) {
    return this.get('/mnt-corr/1.0.0/RelacionProcedimientoDependencia' + parameters); // ?idProcedimiento=3
  }

  public postProcedimientoSGS(body: any) {
    return this.post('/mnt-corr/1.0.0/ProcedimientoSGC/guardarGrid', body);
  }

  public getOrganismoDependencia(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/dependencia/lista' + getParameters);
  }

  public postRelacionProcesoDependencia(body: any) {
    return this.post('/mnt-corr/1.0.0/RelacionProcesoDependencia/guardarGrid', body);
  }

  public postRelacionProcedimientoDependencia(body: any) {
    return this.post('/mnt-corr/1.0.0/RelacionProcedimientoDependencia/guardarGrid', body);
  }

  public getTotalRelacionProcedimientoDependencia( getParameters: any = '' ): any {
    return this.get('/mnt-corr/1.0.0/RelacionProcedimientoDependencia/Total' + getParameters );
  }

  public getProcedimientoRadicadoBorrador(idProcedimiento: string) {
    return this.get('/mnt-corr/1.0.0/Procedimiento/RadicadoBorrador?id=' + idProcedimiento);
  }

}
