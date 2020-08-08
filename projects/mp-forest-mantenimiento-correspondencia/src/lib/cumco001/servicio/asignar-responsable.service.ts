import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignarResponsableService extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }

  public getAsignarResponsableSubtipoRadicadoGrid(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/asignarResponsableSubtipoRadicado/grid' + getParameters);
  }

  public getTipoRadicado(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/tipoRadicado' + getParameters);
  }

  public getSubTipoRadicado(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/tipoRadicadoTramite' + getParameters);
  }

  public getOrganismoDependencia(getParameters: string) {
    return this.get('/forest/documentos/1.0.0/dependencia/lista' + getParameters);
  }
 
  public getFuncionarioSuplente(getParameters: string) {
    return this.get('/forest/sistema/1.0.0/funcionarios/dependenciaAsociados' + getParameters);
  }

  public postAsignarResponsableSubtipoRadicadoGrid(body: any) {
    return this.post('/forest/documentos/1.0.0/asignarResponsableSubtipoRadicado', body);
  }
    

}
