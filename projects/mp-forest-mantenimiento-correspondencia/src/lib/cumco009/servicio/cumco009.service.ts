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
    return this.get("/sistema/1.0.0/configurarTipoPersonaTipoIdentificacion?idTipoPersona=" + idTipoPersona + "&idTipoIdentificacion=" + idTipo);
  }
  public getPersona() {
    return this.get("/sistema/1.0.0/persona");
  }

  public getIdentificacion() {
    return this.get("/sistema/1.0.0/identificacion");
  }

  public postGuardarPersonas(body: any) {
    return this.post('/sistema/1.0.0/guardarConfiguracionTipoPersona',body);
  }
  public postGuardarIdentificacion(body: any) {
    return this.post('/sistema/1.0.0/guardarConfiguracionTipoPersonaTipoIdentificacion',body);
  }
}
