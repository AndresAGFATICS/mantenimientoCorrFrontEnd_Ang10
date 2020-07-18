import { HttpHeaders } from '@angular/common/http';
import { Session } from './publico/shared/modelo/Session';

export class AppSettings {

  public static _APP_NAME = window['FOREST'].app_name? window['FOREST'].app_name:"FOREST";
  public static _API_ENDPOINT_GATEWAY = window['FOREST'].url_gateway;
  public static _API_ENDPOINT_FORESTWS = window['FOREST'].url_gateway;
  public static _API_ENDPOINT_FOREST = window['FOREST'].url_pub;
  public static _API_SERVER_URL_REPORT = '/forestReports/';

  public static SERVICE_VERSION_IGACARCHIVO = 'igacArchivo/1.0.0/';
  public static SERVICE_VERSION_IGACSISTEMA = 'igacSistema/1.0.0/';
  public static SERVICE_VERSION_FOREST_COMMENT = 'forest/5.0.0/comment/';
  public static SERVICE_VERSION_WORKPLACECOMPONENT = 'workplaceServicesComponent/0.0.1/';
  public static SERVICE_FILE_UPLOAD = 'fileUploadServer/rest/fileUpload/';
  public static SERVICE_REPORTS_FRAME = AppSettings._API_ENDPOINT_FOREST + AppSettings._API_SERVER_URL_REPORT + "/output"


  public static TIME_STAMP = window['FOREST'].build_timestamp;

  //parametrizando  el logo en archivo JSON compatibilidad hacia atras
  public static LOGO_FOREST = window['FOREST'] && window['FOREST'].logo ? window['FOREST'].logo : AppSettings._API_ENDPOINT_FOREST + '/forestWorkplace/images/about.png'
  /**
   * Se convierte en una variable con getter la cual busca en la ventana 
   * padre la url base del gateway, si no existe toma el valor definido por defecto
   */

  public static get API_ENDPOINT_GATEWAY(): string {
    return top.window['xui'] && top.window['xui']['getConfiguration']
      ? top.window['xui']['getConfiguration']().urlGateway + '/'
      : this._API_ENDPOINT_GATEWAY;
  }

  public static HEADERS = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  public static getHeaders() {
    let session: Session;
    session = JSON.parse(sessionStorage.getItem("session"));
    if (sessionStorage.getItem("delegado")) {
      session._DLG_VALIDATE = btoa(sessionStorage.getItem("delegado"));
      session.delegado =sessionStorage.getItem("delegado");
    } else {
      if (sessionStorage.getItem("dep_delegada")) {
        session.dep_delegada = sessionStorage.getItem("dep_delegada");
      }
    }


    if (session)
      sessionStorage.setItem('session', JSON.stringify(session));

    //return top.window['xui'] ? top.window['xui'].header() : {};

    return session;
  }

  public static PageSize = 10;
  public static minLength = 3; // numero minimo de letras para empezar a buscar en el 
  public static CLIENT_ID = window['FOREST'].client_id; // Para ambiente automatizacionforest5
  public static CLIENT_SECRET = window['FOREST'].client_secret; // Para ambiente automatizacionforest5
  public static TOPBAR_CONFIG = 'assets/topbar.json';
  public static DUMMY_USER = 'assets/dummylogin.json';
  public static ENDPOINT_OAUTH = AppSettings._API_ENDPOINT_FORESTWS + 'token'; // Se usa para la autenticación
  public static ENDPOINT_REVOKE_OAUTH = AppSettings._API_ENDPOINT_FORESTWS + 'revoke';
  public static ENDPOINT_INGRESO_CAPTCHA = window['FOREST'].url_inicioSesion
  public static ENDPOINT_MENU = AppSettings._API_ENDPOINT_FORESTWS + window['FOREST'].context_menu + Math.random(); // Se usa para la autenticación
  public static ENDPOINT_MENU_REPORT = window['FOREST'].context_menu_report ? AppSettings._API_ENDPOINT_FORESTWS  + window['FOREST'].context_menu_report  :"";
  public static ENDPOINT_FUNCIONARIOS_ID = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_IGACSISTEMA + 'funcionarios/externo/id';
  public static ENDPOINT_FESTIVO = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_IGACSISTEMA + 'festivo';
  public static ENDPOINT_USER_INFO = AppSettings._API_ENDPOINT_FORESTWS + 'userinfo?schema=openid';
  public static ENDPOINT_USER_LOGUEADO = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_WORKPLACECOMPONENT + 'api/work-place/consultaUsuarioLogeado';
  public static ENDPOINT_EDITAR_USUARIO = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_WORKPLACECOMPONENT + "api/work-place/actualizarInformacionUsuario";
  public static ENDPOINT_CONSULTAR_FOTO_USUARIO = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_WORKPLACECOMPONENT + "api/work-place/consultaFotoUsuarioLogeado";
  public static ENDPOINT_LISTAR_WORKPLACE_USUARIO = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_WORKPLACECOMPONENT + "api/work-place/listarActividadesUsuario";
  public static ENDPOINT_LISTAR_DETALLE_ACTIVIDADES = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_WORKPLACECOMPONENT + "api/work-place/listarDetalleActividadUsuario/";
  public static ENDPOINT_TASK_INFO = AppSettings._API_ENDPOINT_FORESTWS + 'forest/5.0.0/task/'
  public static ENDPOINT_LIST_REPORTS_USER = AppSettings._API_ENDPOINT_FORESTWS + AppSettings.SERVICE_VERSION_WORKPLACECOMPONENT + "api/work-place/listReportesUsuario";
  public static ENDPOINT_COMMENT_ACTIVIDADES =  AppSettings.API_ENDPOINT_GATEWAY + AppSettings.SERVICE_VERSION_FOREST_COMMENT;

  public static ENDPOINT_GET_TOKEN_ARCH = AppSettings._API_ENDPOINT_FOREST + AppSettings.SERVICE_FILE_UPLOAD + "getToken";
  public static ENDPOINT_UPLOAD_MULTIPART = AppSettings._API_ENDPOINT_FOREST + AppSettings.SERVICE_FILE_UPLOAD + "uploadMultipart";

  public static IDLE = 1; // Tiempo (segundos) aceptable de inactividad
  public static TIMEOUT = 1200; // Tiempo (segundos) aceptable de timeout para cerrar la sesion

  public static ENDPOINT_FOREST_NOTIFY = window['FOREST'].downloads_notify;
  public static ENDPOINT_FOREST_SCANNER = window['FOREST'].downloads_scanner;
  public static ENDPOINT_FOREST_INTEGRATOR = window['FOREST'].downloads_ms;
  public static ENDPOINT_MANUAL_USUARIO = window['FOREST'].manual_ayuda ? window['FOREST'].manual_ayuda : AppSettings._API_ENDPOINT_FOREST + "manuales/workplace/content/pr01.html"


  public static getToken() {
    let session = JSON.parse(sessionStorage.getItem("session"));
    return session.token;
  }
}