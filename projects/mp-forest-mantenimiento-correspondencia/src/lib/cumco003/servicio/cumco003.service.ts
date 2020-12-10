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
    return this.get('/forest/documentos/1.0.0/tipoRadicado?activo=1&codigoDescripcion=' + codigo);
  }
  public getSubTipoRadicado(descripcion: any, idTipo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicadoTramite?activo=1&descripcion=' + descripcion + '&idTipo=' + idTipo);
  }
  public getDocumento(codigo: any) {
    return this.get('/forest/sistema/1.0.0/tipoDocumental/codigoDescripcion?activo=1&codigoDescripcion=' + codigo);
  }
  public getTablaDocumento() {
    return this.get('/forest/documentos/1.0.0/tipoComunicacion'); 
  }
  public getTipoComunicacion(parametros: string) {
    return this.get('/forest/documentos/1.0.0/tipoComunicacion/clase' + parametros); // ?idClaseDocumental=2&codigoDescripcion=dec
  }
  public getTablaPlantilla(parameters: string) {
    // return this.get('/forest/documentos/1.0.0/configuracionPlantilla/grid'); //?idPlantilla=1&idTramite=1&idClaseDocumental=1
    return this.get('/mnt-corr/1.0.0/configPlantillas' + parameters);
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

  public getForestPropiedades(parameters: string) {
    return this.get('/mnt-corr/1.0.0/forestPropiedades' + parameters);
  }

  public getRadicadoBorrador(parameters: string) {
    return this.get('/mnt-corr/1.0.0/RadicadoBorrador' + parameters); //?activos=1&codTlp=1&page=1&size=1
  }

}
