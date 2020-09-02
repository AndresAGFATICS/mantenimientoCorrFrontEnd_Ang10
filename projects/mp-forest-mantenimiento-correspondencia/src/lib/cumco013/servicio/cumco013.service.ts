import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cumco013Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }


  public getTipoEmpresa(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoEmpresa' + getParameters);
  }

  public postTipoEmpresa(body: any) {
    return this.post('/mnt-corr/1.0.0/TipoEmpresa/Guardar', body);
  }


  public getTipoRegistroUsuarioClasificacionOrganizacion(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoRegistroUsuario?tipo=7000' + getParameters);
  }

  public getTipoRegistroUsuarioActividadEconomica(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoRegistroUsuario?tipo=8000' + getParameters);
  }

  public getTipoRegistroUsuarioNivelEscolaridad(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoRegistroUsuario?tipo=3000' + getParameters);
  }

  public getTipoRegistroUsuarioSexo(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoRegistroUsuario?tipo=1000' + getParameters);
  }

  public getTipoRegistroUsuarioEstadoCivil(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoRegistroUsuario?tipo=2000' + getParameters);
  }

  public getTipoRegistroUsuarioDiscapacidad(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/TipoRegistroUsuario?tipo=5000' + getParameters);
  }

  public postRegistroUsuario(body: any) {
    return this.post('/mnt-corr/1.0.0/TipoRegistroUsuario/Guardar', body);
  }


  public getGrupoEtnico(getParameters: string) {
    return this.get('/mnt-corr/1.0.0/GrupoEtnico' + getParameters);
  }

  public postGrupoEtnico(body: any) {
    return this.post('/mnt-corr/1.0.0/GrupoEtnico/Guardar', body);
  }




  

  


}
