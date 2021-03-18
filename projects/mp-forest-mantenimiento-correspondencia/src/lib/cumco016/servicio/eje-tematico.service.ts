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


  public getEjeTematicoRadicadoBorrador(parameters: string) {
    return this.get('/mnt-corr/1.0.0/ejeTematico/RadicadoBorrador' + parameters); // ?id=26
  }

  public getDependenciaLista(parameters: string) {
    return this.get("/forest/documentos/1.0.0/dependencia/lista" + parameters);
  }

  public getEjeTematicoDependencia(page: any, size: any, idDependencia: string) {
    //return this.get('/mnt-corr/1.0.0/RelacionEjeTematicoDependencia?idDependencia=' + idDependencia);
    return this.get('/mnt-corr/1.0.0/RelacionEjeTematicoDependencia?page=' + String(page) + '&size=' + String(size) + '&idDependencia=' + idDependencia);
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
