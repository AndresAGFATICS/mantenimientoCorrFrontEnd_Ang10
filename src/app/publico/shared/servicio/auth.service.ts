import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// SERVICIOS
import { GeneralService } from 'src/app/shared/servicio/general.service';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { Session } from '../modelo/Session';

// MODELOS
import { LoginObject } from '../modelo/LoginObject';
import { AppSettings } from 'src/app/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GeneralService {

  constructor(public _http: HttpClient, private sessionService: SessionService) {
    super(_http);
  }

  /**
   * Función que retorna el token de autorización generada por el clientId y el clientSecret del archivo config
   */
  getAuthToken(): string {
    return this.tokenAuth;
  }

  getToken() {
    if (sessionStorage.getItem('currentUser')) {
    } else {
      this.getAuthToken();
    }
    // return sessionStorage.getItem('access_token')
  }

  public recuperarClave(bean: LoginObject): Observable<any> {
    //const url = `${this.apiBaseURL_SISTEMA}/funcionarios/recuperarContrasena/`;

    //return this.put(url, bean, /*this._authService.user.api_token*/null);
    return null;
  }

  /**
   * Función para autenticar y mantener la sesión
   *
   * @param bean Objeto de tipo LoginObject el cual contiene las credenciales
   * @returns Observable observable de tipo Session
   */
  public login(bean: LoginObject): Observable<Session> {
    const url = `${AppSettings.ENDPOINT_OAUTH}`;
    const token = `Basic ${this.getAuthToken()}`;

    return this.postAuth(url, bean, token);
  }

  /**
   * Función para autenticar y mantener la sesión
   *
   * @param bean Objeto de tipo LoginObject el cual contiene las credenciales
   * @returns Observable observable de tipo Session
   */
  public refrescarTokenUsuario(params) {
    const url = `${AppSettings.ENDPOINT_OAUTH}`;
    const token = `Basic ${this.getAuthToken()}`;
    //return this.postRefreshToken(url, bean);
    return this.postRefreshToken(url, params, token)
  }

  public loginWithCaptcha(bean, response): Observable<Session> {
    const url = `${AppSettings.ENDPOINT_INGRESO_CAPTCHA}`;
    bean.authToken = this.getAuthToken();

    return this.postNoAuth(url, bean);
  }

  public revokeToken() {
    const url = `${AppSettings.ENDPOINT_REVOKE_OAUTH}`
    let session = JSON.parse(sessionStorage.getItem("session"));
    return this.postRevokeToken(url, session.access_token);


  }

  /**
   * Función para actualizar token
   *
   * @param bean Objeto de tipo LoginObject el cual contiene las credenciales
   * @returns Observable observable de tipo Session
   */
  public refresToken(params: any): Observable<Session> {
    const url = `${AppSettings.ENDPOINT_OAUTH}`;
    const token = `Basic ${this.getAuthToken()}`;

    return this.post(url, params);
  }

  /**
   * Función para cerrar la sesión
   */
  logout(): void {
    if (sessionStorage.getItem("session")) {
      this.revokeToken().subscribe();
    }
    this.sessionService.logout();
  }

  public getInfoDummy() {
    const url = `${AppSettings.DUMMY_USER}`;
    return this.get(url);
  }

}
