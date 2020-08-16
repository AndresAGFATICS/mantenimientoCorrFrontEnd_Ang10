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

  //public getForestPropiedades(parameters: string) {
  //  if(this._IN_DEVELOP){
  //    return this.get('/mnt-corr//1.0.0/forestPropiedades' + parameters); // ?nombre=corr.HabilitarTipDocPlantillas
  //  }else{
  //    return this.get('/mnt-corr/1.0.0/forestPropiedades' + parameters);
  //  }
  //}

}
