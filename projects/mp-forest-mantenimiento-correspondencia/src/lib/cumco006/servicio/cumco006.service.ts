import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco006Service extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }
  public getCanal() {
    return this.get('/forest/documentos/1.0.0/canalEnvio');
  }

  public getHora(idCanal:any) {
    return this.get('/forest/documentos/1.0.0/horarioRadicacion/entrada?idCanal=' + idCanal);
  }

  public getHoraCof() {
    return this.get('/forest/documentos/1.0.0/horarioRadicacion/cof');
  }
  public getFestivo() {
    return this.get('/forest/documentos/1.0.0/horarioRadicacion/festivos');
  }
  public postGuardarHorarioRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/horarioRadicacion/configurar',body);
  }
}
