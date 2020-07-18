import { Injectable } from '@angular/core';
import { Response, RequestOptions, URLSearchParams } from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../../AppSettings';
import { LoginObject } from 'src/app/publico/shared/modelo/LoginObject';
/**
 * Clase para configurar servicios genericos, esta clase es heredable
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  protected tokenAuth = btoa(`${AppSettings.CLIENT_ID}:${AppSettings.CLIENT_SECRET}`);

  protected apiBaseURL_GATEWAY = AppSettings.API_ENDPOINT_GATEWAY;
  protected apiBaseURL_GATEWAY_IGACARCHIVO = AppSettings.SERVICE_VERSION_IGACARCHIVO;
  protected apiBaseURL_GATEWAY_IGACSISTEMA = AppSettings.SERVICE_VERSION_IGACSISTEMA;
  protected apiBaseURL_API_ENDPOINT_REPORT = AppSettings._API_SERVER_URL_REPORT;

  protected contentType = 'application/json';
  private headers: HttpHeaders;
  protected respuestaHttp: any;
  protected params: any;
  protected tokenDoc: string;

  constructor(public _http: HttpClient) { }

  /**
   *  Función para obtener datos dado una url y un token
   *
   * @param url path a consultar el servicio web
   */
  public get(url: string, token?: string): Observable<any> {
    const options = { headers: this.obtenerHeader() };

    return (
      this._http
        .get(url, options)
        // .pipe(map(response => response.json()))
        .pipe(catchError(this.handleError))
    );
  }

  /**
   * Función para obtener datos dado una url, pero obteniendo el response completo
   * @param url URL a llamar el servicio
   */
  public getFullResponse(url: string): Observable<HttpResponse<any>> {
    return this._http.get<any>(url, { headers: this.obtenerHeader(), observe: 'response' });
  }

  /**
  * Método encargado de obtener los headers necesarios para la ejecucion del servicio
  */
  private obtenerHeader() {
    var app = AppSettings.getHeaders();
    var token = app? app.access_token:"";
    
    var h = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + token
    }
    
     
    if (app != null && app.delegado) {
      h['_DLG_VALIDATE'] = btoa(app.delegado);
    } else {
      if (app != null && app.dep_delegada) {
        h['_DEP_VALIDATE'] = btoa(app.dep_delegada);
      }
    }

    var header = new HttpHeaders(h);
    return header
  }

  /**
 * Método encargado de obtener los headers necesarios para la ejecucion del servicio
 */
  private obtenerHeaderSinAuth() {

    var header = new HttpHeaders({
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8'
    });
    return header
  }

  /**
   * Metodo para realizar una peticion web con todos los parametros de los headers que este retorna
   * @param url servicio a ejecutar.
   */
  public fullResponseGet(url: string): Observable<HttpResponse<any>> {

    return this._http.get<any>(url, { headers: this.obtenerHeader(), observe: 'response' });
  }

  /**
   * Función para enviar datos, ya sea edición, crear, etc.
   *
   * @param url path a consultar el servicio web
   * @param params contenido del body a enviar en la URL post
   * @param tokenUser Token de usuario para realizar el consumo
   */
  public post(url: string, params: any, tokenUser?: string): Observable<any> {
    this.headers = this.obtenerHeader();
    const options = { headers: this.headers };
    const body = JSON.stringify(params);

    return this._http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Función para enviar datos, ya sea edición, crear, etc sin necesidad de token. 
   *
   * @param url path a consultar el servicio web
   * @param params contenido del body a enviar en la URL post
   */
  public postNoAuth(url: string, params: any, tokenUser?: string): Observable<any> {
    this.headers = this.obtenerHeaderSinAuth();
    const options = { headers: this.headers };
    const body = JSON.stringify(params);
    return this._http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Función para enviar datos, ya sea edición, crear, etc.
   *
   * @param url path a consultar el servicio web
   * @param params contenido del body a enviar en la URL post
   * @param tokenUser Token de usuario para realizar el consumo
   */
  public postTokenParam(url: string, params: any, tokenUser: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUser}`
    });
    const options = { headers: headers };
    const body = JSON.stringify(params);

    return this._http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Función post especial para obtener archivos
   *
   * @param url path a consultar el servicio web
   * @param token token para la autorización al acceso del servicio web
   */
  public postFile(url: string): Observable<any> {
    const token = AppSettings.getHeaders();
    if (token) {
      token['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    this.headers = !!token
      ? new HttpHeaders(JSON.stringify(token))
      : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const options = { headers: this.headers, responseType: 'blob' };

    const formData: FormData = new FormData();
    let tokenAuth = token.Authorization;

    formData.append('security', tokenAuth.split(" ")[1]);

    return this._http
      .post(url, formData, {
        headers: new HttpHeaders({
          'Authorization': `${token.Authorization}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }), responseType: 'blob'
      })
      .pipe(catchError(this.handleError));
  }
  /**
   * Funcion para subir un obtener el token del servidor
   * 
   * @param token token para la autorización al acceso del servicio web
   * 
   */
  public getTokenArchivo(token: string) {


    const urlGetToken = `${AppSettings.ENDPOINT_GET_TOKEN_ARCH}`;
    return this.get(urlGetToken, token)
  }

  /**
   * Funcion para subir el archivo seleccionado
   * 
   * @param tokenArchivo token generado por el servidor para subir el documento
   * @param archivo  archivo a subir.
   */
  public uploadFile(tokenArchivo: string, archivo: any) {
    const urlUploadMultipart = `${AppSettings.ENDPOINT_UPLOAD_MULTIPART}`;
    const formData: FormData = new FormData();
    formData.append('token', tokenArchivo);
    formData.append('fileSize', archivo.size);
    formData.append('fileName', archivo.name);
    formData.append('fileStream', archivo);

    this._http.post(urlUploadMultipart, formData).subscribe();
  }

  /**
   * Función post especialmente para la autenticación.
   *
   * @param url path a consultar el servicio web
   * @param params contenido del body a enviar en la URL post
   * @param token token para la autorización al acceso del servicio web
   */
  public postAuth(url: string, params: LoginObject, token?): Observable<any> {

    this.headers = !!token ? new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }) : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const options = { headers: this.headers };

    const formData: FormData = new FormData();
    formData.append('grant_type', params.grant_type);
    formData.append('username', params.username);
    formData.append('password', params.password);

    const body = `grant_type=${params.grant_type}&password=${params.password}&username=${params.username}&scope=${"device_WP" + Math.round(Math.random()*123456789) + " " + (window["FOREST"].scope?window["FOREST"].scope:'openid')}`;

    return this._http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

    /**
   * Función post especialmente para refrescar el token
   *
   * @param url path a consultar el servicio web
   * @param params contenido del body a enviar en la URL post
   * @param token token para la autorización al acceso del servicio web
   */
  public postRefreshToken(url: string, params,token?): Observable<any> {

    this.headers = !!token ? new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }) : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Authorization': token });

    let options = { headers: this.headers };

    const formData: FormData = new FormData();
    formData.append('grant_type', params.grant_type);
    formData.append('refresh_token',params.refresh_token)

    const body = `grant_type=${params.grant_type}&refresh_token=${params.refresh_token}`;

    return this._http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

      /**
   * Función post especialmente para refrescar el token
   *
   * @param url path a consultar el servicio web
   * @param params contenido del body a enviar en la URL post
   * @param token token para la autorización al acceso del servicio web
   */
  public postRevokeToken(url: string, tokenFinalizar, token?): Observable<any> {
    this.headers = !!token ? new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }) : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const options = { headers: this.headers };

    const formData: FormData = new FormData();
    formData.append('token', tokenFinalizar);

    const body = `token=${tokenFinalizar}`;

    return this._http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

  public put(url, params): Observable<any> {
    const token = AppSettings.getHeaders();
    if (token) {
      token['Content-Type'] = 'application/json';
    }
    this.headers = !!token
      ? new HttpHeaders(JSON.stringify(token))
      : new HttpHeaders({ 'Content-Type': 'application/json' });

    const options = { headers: this.headers };
    const body = JSON.stringify(params);

    return this._http
      .put(url, body, options)
      .pipe(catchError(this.handleError));
  }

  public remove(url: string, params: any): Observable<any> {
    const token = AppSettings.getHeaders();
    if (token) {
      token['Content-Type'] = 'application/json';
    }

    this.headers = !!token
      ? new HttpHeaders(JSON.stringify(token))
      : new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify(params);
    let options = {
      headers: this.headers,
      body: body,
    };

    return this._http.delete(url, options);
    // .pipe(map(response => response.json()));
  }

  protected extractHeader(res: Response) {
    return res.headers.get('X-Pagination-Total');
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // throw error;
    // return an observable with a user-facing error message
    return throwError(error);

  }

  protected getParams(param: any): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    return params;
  }

  /**
    * Método para ejecutar los servicios tipo GET de la aplicacion
    * 
    * @param url path del servicio a ejecutar ejemplo 'dependencias'
    */
  getForestTaskHttp(idActividadBpm: string): Observable<any> {

    let url = AppSettings.ENDPOINT_TASK_INFO + idActividadBpm
    const options = { headers: this.obtenerHeader() };

    return (
      this._http
        .get(url, options)
        .pipe(catchError(this.handleError))
    );
  }

      /**
     * crea un formulario dinamicamente y lo envia por post 
     * @url action del formulario
     * @values json clave valor con los datos del formulario
     * @target valor opcional para indicar a que frame se dirige el resultado por defecto es _blank
     */
    postDynamicForm(url, values, target?) {
      var form = document.createElement("form");
      form.action = url;
      form.method = "POST";
      form.target = target ? target : "_blank";
      
      for (var key in values) {
          var hidden = document.createElement("input");
          hidden.type = "hidden";
          hidden.name = key;
          hidden.value = values[key];
          form.appendChild(hidden);
      }
      document.body.appendChild(form);
      form.submit();
  }



}
