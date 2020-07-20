import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco010Service extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }
  public getMotivoDevolucion() {
    return this.get("/forest/documentos/1.0.0/motivoDevolucion");
  }
  public postGuardarPersonas(body: any) {
    return this.post('/forest/documentos/1.0.0/guardarMotivoDevolucion',body);
  }
}
