import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Sesion } from '../modelo/Sesion';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  generalSize = 100;

  //_API_ENDPOINT_GATEWAY = '';
  //_URL_SERVICE = "/sistema/1.0.0/"
  _API_ENDPOINT_GATEWAY = "https://alcaldiadevcaliforest5.forestbpms.co/forestWS/forest";
  _URL_SERVICE = "";

  constructor(public http: HttpClient) { }

  /**
  * Metodo encargado de obtener la url configurada para el gateway
  */
  private obtenerENDPOINT() {

    if( location.origin.search('localhost') !== -1 ) {
      this._API_ENDPOINT_GATEWAY = 'http://localhost:8080/forestWS';
      console.log('Local');
    }
    else{
      this._API_ENDPOINT_GATEWAY = location.origin + '/forestWS';
    }

    return this._API_ENDPOINT_GATEWAY + this._URL_SERVICE;
  }

  /**
  * Metodo encargado de obtener los headers necesarios para la ejecucion del servicio
  */
  public obtenerHeader() {
    //console.log("obtenerHeader: ")
    //var token = 'df800a26-d756-3f8d-a682-73a7971d9f19';
    var token = this.obtenerDataUsuarioLogeado();
    var header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + token
    });
    //console.log("Token: " + token)
    //console.log(header)
    return header
  }

  /**
  * método encargado de ejecutar servicios de tipo get
  * @param url url del servicio a ejecutar
  */
  public get(url) {
    let urlConsumo = this.obtenerENDPOINT() + url;
    const options = {
      headers: this.obtenerHeader()
    };
    return this.http.get(urlConsumo, options)
      .pipe(catchError(this.handleError))
  }

  /**
  * método encargado de ejecutar servicios de tipo post
  * @param url url del servicio a ejecutar
  * @param params parametros necesarios para la ejecución del servicio
  */
  public post(url: string, params: any): Observable<any> {
    let urlConsumo = this.obtenerENDPOINT() + url

    const options = { headers: this.obtenerHeader() };
    const body = JSON.stringify(params);

    return this.http
      .post(urlConsumo, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
  * método encargado de ejecutar servicios de tipo put
  * @param url url del servicio a ejecutar
  * @param params parametros necesarios para la ejecución del servicio
  */
  public put(url: string, params: any): Observable<any> {

    const options = { headers: this.obtenerHeader() };
    const body = JSON.stringify(params);

    return this.http
      .put(url, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
  * método encargado de ejecutar servicios de tipo delete
  * @param url url del servicio a ejecutar
  * @param params parametros necesarios para la ejecución del servicio
  */
  public delete(url: string, params: any): Observable<any> {

    url = this.obtenerENDPOINT() + url
    const body = JSON.stringify(params);
    let options = {
      headers: this.obtenerHeader(),
      body: body
    };

    return this.http.delete(url, options)
      .pipe(catchError(this.handleError));
  }

  /**
  * método encargado de capturar errores en el consumo del serivicio
  */
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrio un error:', error.error.message);
    } else {
      console.error(
        `Backend codigo error ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  /**
  * método encargado de extraer la data del usuario actual
  */
  public obtenerDataUsuarioLogeado() {
    //console.log("asdas", sessionStorage)
    if(sessionStorage.length === 0) {
      console.log('NO Session Registered, ussing local enviroment');
      return '';
    }
    else{
      let session: Sesion = JSON. parse(sessionStorage.getItem('session'));
      //console.log(session)
      return session.access_token;
    }
  }


  public createParameters(jasonParameters: any): string {
    let stringParameters = '';
    const keys = Object.keys(jasonParameters);
    let parameter = '';
    for (let i = 0; i < keys.length; i++) {
      if (typeof jasonParameters[keys[i]] !== 'string'){
        parameter = String(jasonParameters[keys[i]]);
      }
      else{
        parameter = jasonParameters[keys[i]]
      }

      if (i === 0){
        stringParameters = '?' + keys[i] + '=' + parameter;
      }
      else{
        stringParameters = stringParameters + '&' + keys[i] + '=' + parameter;
      }
    }
    return stringParameters;
  }
}
