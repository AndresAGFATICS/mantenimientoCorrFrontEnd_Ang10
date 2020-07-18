import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// SERVICIOS
import { ConfirmationService, MessageService, Message } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { AuthService } from '../shared/servicio/auth.service';
import { FuncionarioService } from 'src/app/privado/shared/servicio/funcionario.service';
import { ReferenciaService } from 'src/app/privado/shared/servicio/referencia.service';

// MODELOS
import { MensajeResponse } from 'src/app/shared/modelo/MensajeResponse';
import { Session } from '../shared/modelo/Session';
import { LoginObject } from '../shared/modelo/LoginObject';
import { MenuForma } from '../shared/modelo/MenuForma';
import { UserInfo } from 'src/app/shared/modelo/UserInfo';
import { AppSettings } from 'src/app/AppSettings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObject: LoginObject;
  menuForma: MenuForma;
  submitted: boolean;
  responseCaptcha = "";

  formApp: FormGroup;
  msgCredencialInvalida = "";
  msgErrorTitulo = "";
  msgError400 = "";
  msgError401 = "";
  msgError404 = "";
  msgError500 = "";
  msgError503 = "";
  msgError504 = "";
  msgError0 = "";
  msgErrorConexionRed = "";
  dataKeyGoogle = "";
  msgs: Message[] = [];
  producto: any = { name: '', imagen: '', captcha: false, labelHome: '', descripcion: '', icon: '', isWso2: true };

  mensajeResponse: MensajeResponse;
  @ViewChild('captchaLogin') captchaLogin;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private funcionarioService: FuncionarioService,
    private referenciaService: ReferenciaService,
    private sessionService: SessionService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private spinner: SpinnerVisibilityService,
    private router: Router) {
    this.getInfoProducto()
  }

  respuestaCaptcha: boolean = false;

  ngOnInit() {

    this.dataKeyGoogle = window['FOREST'].google_data_sitekey;

    this.getMensajes();

    // Verificamos si el usuario activo previamente el check recordar
    let isRecordar = sessionStorage.getItem("isRecordar") == 'OK' ? true : false;
    let userName = sessionStorage.getItem("userName");


    this.formApp = this.formBuilder.group({
      'usuario': new FormControl(userName, [Validators.required, Validators.maxLength(35)]),
      'clave': new FormControl('', [Validators.required]),
      'isRecordar': new FormControl(isRecordar),
      'captcha': new FormControl(false, [Validators.required])
    });

    this.submitted = false;
  }

  getInfoProducto() {
    if (window['PRODUCTO']) {
      this.producto = window['PRODUCTO']
    } else {
      location.reload()
    }

  }

  // convenience getter for easy access to form fields
  get form() { return this.formApp.controls; }

  /**
   * Función para iniciar sesión dado un usuario y clave
   *
   * @param value objeto json de los controles del formulario
   */
  async iniciarSesion(value: string) {
    // Seteamos la variable sessionStorage del check recordar a FALSE por defecto
    sessionStorage.setItem("isRecordar", 'NOK');
    sessionStorage.setItem("userName", '');

    // Sale de la función si el formulario es inválido
    if (this.formApp.invalid) {
      let msg = this.msgCredencialInvalida;
      this.confirmDialog(msg);
      return;
    }
    sessionStorage.clear();
    this.loginObject = new LoginObject();
    this.loginObject.username = this.formApp.controls['usuario'].value;
    this.loginObject.password = encodeURI(this.formApp.controls['clave'].value);
    this.loginObject.grant_type = 'password';
    this.loginObject.scope = "device_WP" + Math.round(Math.random()*123456789) + " " + (window['FOREST'].scope?window['FOREST'].scope:'openid');
    this.loginObject.response = window['$']('.g-recaptcha-response').val();
    let isRecordar = this.formApp.controls['isRecordar'].value;

    // Si el usuario activo el check recordar seteamos a OK la variable sessionStorage
    if (isRecordar) {
      sessionStorage.setItem("isRecordar", 'OK');
      sessionStorage.setItem("userName", this.loginObject.username);
    }

    // Verificamos si no hay acceso a internet
    if (!navigator.onLine) {
      let msg = this.msgErrorConexionRed;
      this.confirmDialog(msg);
      return;
    }

    // Enviamos objeto al servicio para el inicio sesión del funcionario
    this.spinner.show();
    let tipoMenu = this.referenciaService.getMenuTopBar();
    if (window['PRODUCTO'].isWso2) {
      if (window['PRODUCTO'].captcha) {
        this.authService.loginWithCaptcha(this.loginObject, this.respuestaCaptcha).subscribe((result: any) => {
          if (result.access_token) {
            sessionStorage.setItem("session", JSON.stringify(result));
            sessionStorage.setItem("token",result.access_token);

            // guardamos session
            this.sessionService.setCurrentSession(result);
            this.correctLogin(result);

            // Cargamos menu para el usuario logueado
            //this.cargarMenu(result);  
          } else {
            if (result.mensaje.indexOf("invalid-input-secret") != -1) {
              result.mensaje = "Error al realizar la validacion captcha, Por favor consulte con un administrador."
              this.captchaLogin.reset();
            }

            if (result.mensaje.indexOf("timeout-or-duplicate") != -1) {
              result.mensaje = "La verificación ha caducado, Vuelve a marcar la casilla de verificación."
              this.captchaLogin.reset();
            }

            this.confirmDialog(result.mensaje);
          }
          this.spinner.hide();
        },
          error => {

            this.spinner.hide();
            // throw error;
            this.mensajeResponse = <MensajeResponse>error;

            let msg = this.msgCredencialInvalida;

            // Depende del codigo de error se establece el mensaje apropiado.



            if (this.mensajeResponse.status == '400' && this.mensajeResponse.error.error != 'invalid_grant') {
              msg = this.msgError400;
            } else if (this.mensajeResponse.status == '401') {
              msg = this.msgError401;
            } else if (this.mensajeResponse.status == '404' && !AppSettings.ENDPOINT_INGRESO_CAPTCHA) {
              msg = "La propiedad url_inicioSesion no se encuentra definida en el archivo workplace.js"
            } else if (this.mensajeResponse.status == '404') {
              msg = this.msgError404;
            } else if (this.mensajeResponse.status == '500') {
              msg = this.mensajeResponse.error && this.mensajeResponse.error['mensaje'] ? this.mensajeResponse.error['mensaje'] : this.msgError500;
            } else if (this.mensajeResponse.status == '503') {
              msg = this.msgError503;
            } else if (this.mensajeResponse.status == '504') {
              msg = this.msgError504;
            } else if (parseInt(this.mensajeResponse.status) == 0) {
              msg = this.msgError0;
            } else {
              msg = this.mensajeResponse.error.error == 'invalid_grant' ? this.msgCredencialInvalida : this.mensajeResponse.error.error_description;
            }



            this.confirmDialog(msg);

          })
      } else {
        this.authService
          .login(this.loginObject)
          .subscribe(result => {
            sessionStorage.setItem("session", JSON.stringify(result));

            // guardamos session
            this.sessionService.setCurrentSession(result);
            this.correctLogin(result);

            // Cargamos menu para el usuario logueado
            //this.cargarMenu(result);      
          },
            error => {

              this.spinner.hide();
              // throw error;
              this.mensajeResponse = <MensajeResponse>error;

              let msg = this.msgCredencialInvalida;

              // Depende del codigo de error se establece el mensaje apropiado.



              if (this.mensajeResponse.status == '400' && this.mensajeResponse.error.error != 'invalid_grant') {
                msg = this.msgError400;
              } else if (this.mensajeResponse.status == '401') {
                msg = this.msgError401;
              } else if (this.mensajeResponse.status == '404') {
                msg = this.msgError404;
              } else if (this.mensajeResponse.status == '500') {
                msg = this.msgError500;
              } else if (this.mensajeResponse.status == '503') {
                msg = this.msgError503;
              } else if (this.mensajeResponse.status == '504') {
                msg = this.msgError504;
              } else if (parseInt(this.mensajeResponse.status) == 0) {
                msg = this.msgError0;
              } else {
                msg = this.mensajeResponse.error.error == 'invalid_grant' ? this.msgCredencialInvalida : this.mensajeResponse.error.error_description;
              }



              this.confirmDialog(msg);
            }
          );
      }
    } else {
      this.authService.getInfoDummy().subscribe(result => {
        let token = result.token;
        let session = {
          token_type: token.token_type,
          scope: token.scope,
          refresh_token: token.refresh_token,
          id_token: token.id_token,
          expires_in: token.expires_in,
          access_token: token.access_token,
          userInfo: {},
          token: "",
          Authorization: "",
          delegado: "",
          dep_delegada: ""
        }

        sessionStorage.setItem("session", JSON.parse(JSON.stringify(session)));
        this.sessionService.setCurrentSession(JSON.parse(JSON.stringify(session)));
        result.userInfo = new UserInfo();
        result.userInfo = result.usuario;

        //result.token = result.access_token;
        result.Authorization = 'Bearer ' + result.access_token;



        this.sessionService.setCurrentSession(result);

        session.userInfo = new UserInfo();
        session.userInfo = result.usuario;

        session.token = session.access_token;
        session.Authorization = 'Bearer ' + session.access_token;
        sessionStorage.setItem("session", JSON.stringify(session));
        sessionStorage.setItem("token",result.access_token);
        this.spinner.hide();
        this.sessionService.setCurrentSession(JSON.parse(JSON.stringify(session)));

        this.router.navigate(['/home/dashboard']);
        this.spinner.hide();
      }, () => {
        this.confirmDialog("Error al buscar configuración.");
      });
    }
  }

  showResponse(event) {
    console.log(event)
    if (event.response) {
      this.formApp.get('captcha').setValue(true);
      this.responseCaptcha = event.response;
    }
  }

  validarCampoIngresar(): boolean {

    let valorCaptcha: boolean = this.formApp.get('captcha').value;
    let formulario: boolean = !this.formApp.get('usuario').errors;

    let captchaPresente = document.getElementById('divCaptcha');
    if (captchaPresente) {
      return !(valorCaptcha && formulario);
    } else {
      return !formulario;
    }
  }

  /**
   * Función para consultar el funcionario logueado
   * 
   * @param session Variable que contiene el token de autenticacion
   */
  private correctLogin(session: Session) {
    // Consultamos el funcionario logueado
    this.funcionarioService.getUserLogueado().
      subscribe((userInfo) => {
        //session.funcionario = new Funcionario();
        //session.funcionario.mapeoFuncionarioVista(funcionario);

        session.userInfo = new UserInfo();
        session.userInfo = userInfo;

        session.token = session.access_token;
        session.Authorization = 'Bearer ' + session.access_token;
        sessionStorage.setItem("session", JSON.stringify(session));

        this.spinner.hide();
        this.sessionService.setCurrentSession(session);

        this.router.navigate(['/home/dashboard']);
      }, error => {
        console.log("error al consultar", error)
        this.spinner.hide();
        this.confirmDialog(error.error && error.error.mensaje?error.error.mensaje:error.message?error.message:error);
      });
  }


  /**
   * Función para mostrar un dialogo de confirmación
   *
   * @param mensaje mensaje a mostrar en el dialogo de confirmación
   */
  confirmDialog(mensaje: string) {

    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: mensaje });

    /*
      this.confirmationService.confirm({
        message: mensaje,
        header: header,
        icon: icon,
        accept: () => {
          /*
          this.submittedDialogo = false; // Variable para reiniciar envio de datos
          this.formDialogoClave.reset(); // Reseteamos controles
          this.mostrarDialogoClave = false; // Variable para ocultar dialogo
          this.router.navigate(['/login']); // Navega al login
        }
      });
      */
  }



  /**
   * Función para obtener mensajes del archivo de propiedades
   */
  getMensajes() {
    this.translate.get('MENSAJES.credencialInvalida').subscribe((res: string) => {
      this.msgCredencialInvalida = res;
    });
    this.translate.get('ERROR.errorTitulo').subscribe((res: string) => {
      this.msgErrorTitulo = res;
    });
    this.translate.get('ERROR.error400Mensaje').subscribe((res: string) => {
      this.msgError400 = res;
    });
    this.translate.get('ERROR.error401Mensaje').subscribe((res: string) => {
      this.msgError401 = res;
    });
    this.translate.get('ERROR.error404Mensaje').subscribe((res: string) => {
      this.msgError404 = res;
    });
    this.translate.get('ERROR.error500Mensaje').subscribe((res: string) => {
      this.msgError500 = res;
    });
    this.translate.get('ERROR.error503Mensaje').subscribe((res: string) => {
      this.msgError503 = res;
    });
    this.translate.get('ERROR.error504Mensaje').subscribe((res: string) => {
      this.msgError504 = res;
    });
    this.translate.get('ERROR.errorConexionRed').subscribe((res: string) => {
      this.msgErrorConexionRed = res;
    });

    this.translate.get('ERROR.error0Failed').subscribe((res: string) => {
      this.msgError0 = res;
    });

  }

}
