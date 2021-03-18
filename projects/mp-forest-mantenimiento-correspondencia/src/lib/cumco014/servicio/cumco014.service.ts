import { Injectable } from '@angular/core';
import { GeneralService } from '../../servicioGeneral/general.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Cumco014Service extends GeneralService {

  constructor(public _http: HttpClient) {
    super(_http);
  }
  public getTipoRadicado(codigo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicado?codigoDescripcion=' + codigo);
  }
  public getTablaTipoRadicado(codigo: any) {
    return this.get('/forest/documentos/1.0.0/tipoRadicado?&codigoDescripcion=' + codigo);
  }
  public getSubTipoRadicado(getParameters: any) {
    //return this.get('/forest/documentos/1.0.0/tipoRadicadoTramite' + getParameters);
    return this.get('/forest/documentos/1.0.0/tipoRadicadoTramite' + this.createParameters(getParameters) );
  }
  public getTramiteActivo(parameters: string) {
    return this.get('/forest/sistema/1.0.0/tramite/activo' + parameters ); // activo?=tr&activo=1&size=10&page=1'
  }
  public getCategoriaradicado(parameters: string) {
    return this.get('/forest/documentos/1.0.0/categoriaRadicado' + parameters ); // ?activo=1&codigoDescripcion=e
  }
  public postGuardarRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/tipoRadicado/guardar',body);
  }
  public postGuardarSubtipoRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/tipoRadicado/tramite/guardar',body);
  }

  // Table 3 Services
  public getCategoriaRadicado2(parameters: string) {
    return this.get('/forest/documentos/1.0.0/categoriaRadicado' + parameters ); // ?page=1&size=20'
  }

  public postCategoriaRadicado(body: any) {
    return this.post('/mnt-corr/1.0.0/categoriaTipoRadicado/guardarGrid',body);
  }

  // Table 4 Services
  public getRequisitos(parameters: string) {
    //return this.get('/forest/documentos/1.0.0/requisitos' + parameters ); // ?page=1&size=20'
    return this.get('/mnt-corr/1.0.0/requisitos' + parameters ); // ?page=1&size=20'
  }


  // Table 4 Services
  public getFileToken(parameters: string) {
    //return this.get(location.origin + '/fileUploadServer/rest/fileUpload/getToken' + parameters ); // ?page=1&size=20
    let urlConsumo = location.origin + '/fileUploadServer/rest/fileUpload/getToken' + parameters ;
    const options = {
      headers: this.obtenerHeader()
    };
    return this.http.get(urlConsumo, options).pipe(catchError(this.handleError));
   
  }

  public postFileToken(body) {
    return this.post(location.origin + '/fileUploadServer/rest/fileUpload/uploadMultipart', body ); // ?page=1&size=20'
    //return;
  }


  // Table 5 Services 
  public getRequisitosAsociadoRadicado(parameters: string) {
    return this.get('/forest/documentos/1.0.0/requisitos/tipoRadicadoTramite' + parameters ); // ?idTramiteTipoRadicado=281
  }


  // Table 5 Services
  public postRelacionRequisitoSubRadicado(body: any) {
    return this.post('/forest/documentos/1.0.0/requisitos/tipoRadicadoTramite/guardar', body); // ?idTramiteTipoRadicado=281
  }


  // Table 5 Services
  public postPrueba(body: any) {
    return this.post('/forest/documentos/1.0.0/requisitos/tipoRadicadoTramite/guardar', body); // ?idTramiteTipoRadicado=281
  }


  // Table 5 Services
  public postReqisito(body: any) {
    return this.post('/mnt-corr/1.0.0/requitos/guardarFile', body); // ?idTramiteTipoRadicado=281
  }


  // Table 4 Services
  public getRequisitoRadicadoAsociado(parameters: string) {
    //return this.get('/forest/documentos/1.0.0/requisitos' + parameters ); // ?page=1&size=20'
    return this.get('/mnt-corr/1.0.0/RequisitoRadicadoAsociado' + parameters ); // ?idRequisito=121&page=1&size=1'
  }


  // Table 4 Services
  public getRequisitoRequisitoSubtipoRadicadoAsociado(parameters: string) {
    //return this.get('/forest/documentos/1.0.0/requisitos' + parameters ); // ?page=1&size=20'
    return this.get('/mnt-corr/1.0.0/RequisitoSubtipoRadicadoAsociado' + parameters ); // ?page=1&size=1&idRequisito=41&idSubRadicado=2'
  }


  // Table 4 Services
  public getFileExtension(parameters: string) {
    return this.get('/forest/documentos/1.0.0/extensionFile' + parameters ); // ?page=1&size=1&idRequisito=41&idSubRadicado=2'
  }

}
