import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnexosFisicosClaseService extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }  

  public getAnexosFisicos() {
    return this.get("/sistema/1.0.0/anexosFisicos");
  }
  public getTipoAnexoFisico() {
    return this.get("/sistema/1.0.0/tipoAnexoFisico");
  }
  public getCodigoDescripcion(clase: any, tipo: any) {
    return this.get("/sistema/1.0.0/anexosFisicosClase?clase=" + clase + "&tipo=" + tipo);
  }
  public postGuardarAccionTipoDocumental(body: any) {
    return this.post('/sistema/1.0.0/guardarConfiguracionAnexoFisico',body);
  }
}
