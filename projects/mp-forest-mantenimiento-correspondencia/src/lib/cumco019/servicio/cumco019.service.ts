import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Cumco019Service extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }
  
  public getTablaDocumento(parameters: string) {
    return this.get('/forest/documentos/1.0.0/tipoComunicacion' + parameters); 
  }


  public getRelacionTipoComunicacionCargo(parameters: string ) {
    return this.get('/forest/documentos/1.0.0/tipoComunicacionCargo' + parameters); // ?idTipoComunicacion=21
  }

  public getCargo(parameters: string ) {
    return this.get('/forest/sistema/1.0.0/cargos/activos' + parameters); // ?activo=1&codigoNombre=JA
  }

  public postRelacionGrupoSeguridadRadicado(body: any) {
    return this.post('/mnt-corr/1.0.0/RelacionTipoComunicacionCargo/guardarGrid', body);
  }





}
