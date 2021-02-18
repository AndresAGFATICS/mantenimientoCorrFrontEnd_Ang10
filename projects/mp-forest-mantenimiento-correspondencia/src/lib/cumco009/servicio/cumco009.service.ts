import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco009Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }

  public getConfigurarPersona(idTipoPersona: any, idTipo: any) {
    return this.get("/forest/sistema/1.0.0/configurarTipoPersonaTipoIdentificacion?idTipoPersona=" + idTipoPersona + "&idTipoIdentificacion=" + idTipo);
  }
  public getPersona() {
    return this.get("/forest/sistema/1.0.0/persona");
  }

  public getIdentificacion(parameters: string) {
    return this.get("/forest/sistema/1.0.0/identificacion" + parameters);
    //if(this._IN_DEVELOP){
    //  return this.get('/mnt-corr/1.0.0/tipoIdentificaion' + parameters);
    //}else{
    //  return this.get('/mnt-corr/1.0.0/tipoIdentificaion' + parameters);
    //}
  }

  public postGuardarPersonas(body: any) {
    return this.post('/forest/sistema/1.0.0/guardarConfiguracionTipoPersona',body);
  }
  public postGuardarIdentificacion(body: any) {
    return this.post('/forest/sistema/1.0.0/guardarConfiguracionTipoPersonaTipoIdentificacion',body);
  }

  public getTerceros(parameters: string) {
    return this.get("/forest/sistema/1.0.0/tercero/nombre" + parameters); // ?idIdentificacion=6&page=1&size=1
  }
  
}
