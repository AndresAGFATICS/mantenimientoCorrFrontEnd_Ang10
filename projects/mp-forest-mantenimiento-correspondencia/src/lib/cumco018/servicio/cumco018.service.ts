import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco018Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }

  // Table 1 Services


  public getRutas(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/Rutas' + getParameters);
  }

  public postRutas(body: any) {
    return this.post('/mnt-corr/1.0.0//Rutas/Guardar', body);
  }

  public getMensajero(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/Mensajeros' + getParameters);
  }

  public postMensajero(body: any) {
    return this.post('/mnt-corr/1.0.0/Mensajeros/Guardar', body);
  }

  public getOrganismoDependencia(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/dependencia/lista' + getParameters);
  }

  public getFuncionarioSuplente(getParameters: string) {
    return this.get('/forest/sistema/1.0.0/funcionarios/dependenciaAsociados' + getParameters);
  }

  public getEmpresaMensajeria(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/EmpresaMensajeria' + getParameters);
  }

  public postEmpresaMensajeria(body: any) {
    return this.post('/mnt-corr/1.0.0/EmpresaMensajeria/Guardar', body);
  }


}
