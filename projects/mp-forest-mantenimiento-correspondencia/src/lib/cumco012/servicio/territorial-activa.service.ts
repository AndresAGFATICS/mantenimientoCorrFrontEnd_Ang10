import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerritorialActivaService extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }

  public getTerritorialActivaConsultaService(codigoNombre: string) {
    return this.get("/forest/sistema/1.0.0/dependencia/territorialActiva" + codigoNombre);
  }

  public getRecorridoRepartoFisico(codigoNombre: string) {
    return this.get('/forest/documentos/1.0.0/recorridoRepartofisico?idTerritorial=' + codigoNombre);
  }

  public postRecorridoRepartoFisico(body: any) {
    return this.post('/forest/documentos/1.0.0/guardarRecorridoRepartoFisico',body);
  }


}
