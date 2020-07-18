import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// SERVICIOS
import { GeneralService } from 'src/app/shared/servicio/general.service';
import { SessionService } from 'src/app/shared/servicio/session.service';

// MODELOS
import { FuncionarioVista } from 'src/app/shared/modelo/FuncionarioVista';
import { AppSettings } from 'src/app/AppSettings';
import { UserInfo } from 'src/app/shared/modelo/UserInfo';
import { RequestFuncionario } from '../modelo/RequestFuncionario';
import { Response } from 'selenium-webdriver/http';
import { Respuesta } from 'src/app/shared/modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends GeneralService {
  imagenUsuario;

  constructor(public _http: HttpClient, private sessionService: SessionService) {
    super(_http);
  }

  /**
  * Función para obtener un funcionario dado el usuario
  *
  * @param userName nombre de usuario del funcionario
  * @returns retorna un Observable (Funcionario), el cual es el resultado de la transacción
  */
  public getFuncionario(userName: string): Observable<FuncionarioVista> {
    const url = `${AppSettings.ENDPOINT_FUNCIONARIOS_ID}`;
    const accessToken = this.sessionService.getCurrentToken();

    return this.get(url, accessToken);
  }



  public setFuncionarioInterno(clave: string, funcionario: FuncionarioVista): Observable<String> {
    const url = "";
    let params = {
      'correoUsuario': funcionario.email,
      'numeroDocumento': funcionario.numeroIdentificacion,
      'tipoDocumento': funcionario.tipoIdentificacion,
      'claveUsuario': clave
    }
    return this.post(url, params);
  }

  /**
   * Función para obtener información basica del usuario logueado
   */
  public getUserinfo(): Observable<UserInfo> {
    const url = `${AppSettings.ENDPOINT_USER_INFO}`;
    const accessToken = this.sessionService.getCurrentToken();

    return this.get(url, accessToken);
  }

  /**
   * Función para obtener datos del usuario logueado
   */
  public getUserLogueado(): Observable<UserInfo> {
    const url = `${AppSettings.ENDPOINT_USER_LOGUEADO}`;
    const accessToken = this.sessionService.getCurrentToken();

    return this.get(url, accessToken);
  }

  /**
   * Funcion para editar datos básicos de un funcionario 
   * @param correoUsuario correo editado del funcionario
   * @param contrasena contraseña editada del funcionario
   * @param foto foto de perfil del funcionario
   */
  public editarFuncionario(funcionarioEditar: RequestFuncionario): Observable<any> {
    let token = this.sessionService.getCurrentSession().token;
    const url = `${AppSettings.ENDPOINT_EDITAR_USUARIO}`;
    return this.postTokenParam(url, funcionarioEditar, token);
  }

  /**
   * Servicio get para obtener la foto del usuario actual
   */
  public cargarFotoUsuario() {
    let token = this.sessionService.getCurrentSession().token;
    const url = `${AppSettings.ENDPOINT_CONSULTAR_FOTO_USUARIO}`;
    return this.get(url, token);
    /*
    this.get(url, token).subscribe((resultado: Respuesta) => {
      this.imagenUsuario = resultado.data;
    })
    */
  }
}
