import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EjeTematicoService extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }

  public getEjeTematico(parameters: string) {
    return this.get('/mnt-corr/1.0.0/ejeTematico' + parameters);
  }

  public getDependenciaLista(codNombre: string, activo: string) {
    return this.get("/forest/documentos/1.0.0/dependencia/lista?activo=" + activo + "&codigoNombre=" + codNombre);
  }

  public getEjeTematicoDependencia(idDependencia: string) {
    return this.get('/mnt-corr/1.0.0/RelacionEjeTematicoDependencia?idDependencia=' + idDependencia);
  }


  public getEjeTematicoRelacionados(idEje: string) {
    return this.get('/mnt-corr/1.0.0/RelacionEjeTematicoDependencia?idEjeTematico=' + idEje);
  }


  postEjeTematico(body: any) {
    return this.post('/mnt-corr/1.0.0/ejeTematico/guardar',body);
  }

  postRelacionEjeTematicoDependencia(body: any) {
    return this.post('/mnt-corr/1.0.0/RelacionEjeTematicoDependencia/guardar_grid',body);
  }


}
