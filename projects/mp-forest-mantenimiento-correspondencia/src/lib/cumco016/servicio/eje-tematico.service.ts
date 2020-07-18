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

  public getEjeTematico(descripcion: string, activo: string) {
    return this.get("/documentos/1.0.0/ejeTematico?activo=" + activo + "&descripcion=" + descripcion);
  }
  public getDependenciaLista(codNombre: string, activo: string) {
    return this.get("/documentos/1.0.0/dependencia/lista?activo" + activo+ "&codigoNombre=" + codNombre);
  }
  public getEjeTematicoDependencia(idDependencia: string) {
    return this.get("/documentos/1.0.0/ejeTematico/dependencia?idDependencia=" + idDependencia);
  }
}
