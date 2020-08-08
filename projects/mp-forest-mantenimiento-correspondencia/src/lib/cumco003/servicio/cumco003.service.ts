import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Cumco003Service extends GeneralService{

  constructor(public _http: HttpClient) {
    super(_http);
  }
  public getPlantilla(codigo: any) {
    return this.get('/forest/documentos/1.0.0/plantilla/codigo?codigo=' + codigo);
  }
  public getTipoRadicado(codigo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicado?codigoDescripcion=' + codigo);
  }
  public getSubTipoRadicado(descripcion: any, idTipo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicadoTramite?&activo=1&descripcion=' + descripcion + '&idTipo=' + idTipo);
  }
  public getDocumento(codigo: any) {
    return this.get('/forest/sistema/1.0.0/tipoDocumental/codigoDescripcion?activo=1&codigoDescripcion=' + codigo);
  }
  public getTablaDocumento() {
    return this.get('/forest/documentos/1.0.0/tipoComunicacion'); 
  }
  public getTipoComunicacion(parametros: string) {
    return this.get('/forest/documentos/1.0.0/tipoComunicacion' + parametros); // ?codigoDescripcion=8
  }
  public getTablaPlantilla() {
    return this.get('/forest/documentos/1.0.0/configuracionPlantilla/grid'); //?idPlantilla=1&idTramite=1&idClaseDocumental=1
  }
  public getClaseDocumental(codigo: any) {
    return this.get('/forest/sistema/1.0.0/claseDocumental?codigoDescripcion=' + codigo)
  }
  public postPlantilla(body: any) {
    return this.post('/forest/documentos/1.0.0/configurarPlantilla', body);
  }
  public postComuniacion(body: any) {
    return this.post('/forest/documentos/1.0.0/tipoComunicacion/guardar', body);
  }
}
