import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicDialog';
import { AppSettings } from 'src/app/AppSettings';
import { HomeLayoutComponent } from 'src/app/privado/home/home-layout/home-layout.component';
import { Session } from 'src/app/publico/shared/modelo/Session';
import { AuthService } from 'src/app/publico/shared/servicio/auth.service';
import { Respuesta } from 'src/app/shared/modelo/Respuesta';
import { UserInfo } from 'src/app/shared/modelo/UserInfo';
import { FuncionarioService } from '../../servicio/funcionario.service';
import { ReferenciaService } from '../../servicio/referencia.service';
import { AcercaComponent } from '../acerca/acerca.component';




@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  valorTamanioFuente: number;
  layout: string;
  theme: string;
  userInfo: UserInfo;
  patronTexto: string;  // Texto usado a buscar palabra del menu
  urlAyuda = AppSettings.ENDPOINT_MANUAL_USUARIO;
  imagenUsuario: string;
  tieneImagen: boolean = false;
  items: MenuItem[] = [];

  tipoDelegado: string = 'NORMAL';


  // Idioma
  activeLang = 'es';
  idiomaSeleccionado: string;
  idiomas: SelectItem[];
  producto: any = { imagen: '' };

  //Variables de mensajes   
  mensajeDelegado: string;
  mensajeDependencia: string;

  constructor(
    public app: HomeLayoutComponent,
    public auth: AuthService,
    public dialogService: DialogService,
    private translate: TranslateService,
    private funcionarioService: FuncionarioService,
    private referencia: ReferenciaService,
    private router: Router,
    private authService: AuthService) {

    this.userInfo = {
      sub: "",
      nickname: "",
      phone_number: "",
      family_name: "",
      NOMFUN: "",
      CODFUN: "",
      NOMDEPENDENCIA: "",
      DEP_DELEGADO: "",
      EMAIL: "",
      IMG_USUARIO: ""
    }
    this.translate.setDefaultLang(this.activeLang);
    this.getMensajes();


  }

  ngOnInit() {
    window['refMenuTop']=this;
    this.cargarMenuTopBar();
    this.cargarMigaMenuAyuda();
    this.cargarFotoUsuarioActual();
    this.valorTamanioFuente = 13;
    this.layout = "default";
    this.theme = "blue"

    // Obtenemos informacion del usuario logueado
    this.getInfoUser();

    // Inicializamos valor tamanio de la fuente
    if (sessionStorage.getItem('valorFuente') == null) {
      sessionStorage.setItem('valorFuente', this.valorTamanioFuente.toString());
    } else {
      this.valorTamanioFuente = parseInt(sessionStorage.getItem('valorFuente'));
    }
    document.documentElement.style.setProperty('--font-size', `${this.valorTamanioFuente}px`);

    // Inicializamos layout
    if (sessionStorage.getItem('layout') == null) {
      sessionStorage.setItem('layout', this.layout);
    } else {
      this.layout = sessionStorage.getItem('layout');
    }
    const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
    layoutLink.href = 'assets/layout/css/layout-' + this.layout + '.css';

    // Inicializamos tema
    if (sessionStorage.getItem('theme') == null) {
      sessionStorage.setItem('theme', this.theme);
    } else {
      this.theme = sessionStorage.getItem('theme');
    }
    const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
    themeLink.href = 'assets/theme/theme-' + this.theme + '.css';

    this.idiomas = [
      { label: 'Español', value: 'es' },
      { label: 'Ingles', value: 'en' }
    ];

  }

  cargarMenuTopBar() {
    let menutopbar = this.referencia.getMenuTopBar()
    this.producto = window['PRODUCTO'];
    this.items = menutopbar.menu;

    this.items.forEach(item => {
      sessionStorage.setItem(item.url.replace("#", ""), item.label);
    });

    this.items.push(
      { label: "Ayuda", url: "", icon: "pi pi-question", command: () => { this.abrirManualAyuda() } },
      { label: "Acerca de", url: "", icon: "pi pi-info-circle", command: () => { this.show() } },
      { label: "Salir", url: "", "icon": "fa fa-fw fa-sign-out", command: () => { this.logout() } });
  }


  /**
   * Función para obtener información de usuario
   */
  getInfoUser() {
    // Obtenemos la sesion
    let session = <Session>JSON.parse(sessionStorage.getItem("session"));
    if (session) {
      // Si es delegada
      this.tipoDelegado = 'NORMAL';
      if (sessionStorage.delegado) {
        sessionStorage._DLG_VALIDATE = btoa(sessionStorage.delegado);
        session.userInfo.DEP_DELEGADO = sessionStorage.nomdependencia;
        this.tipoDelegado = 'DELEGADO';
      } else {
        if (sessionStorage.dep_delegada) {
          session.userInfo.DEP_DELEGADO = sessionStorage.nomdependencia;
          sessionStorage._DEP_VALIDATE = btoa(sessionStorage.dep_delegada);
          this.tipoDelegado = 'DEP_DELEGADO';
        }
      }
      if (session.userInfo) {
        this.userInfo = session.userInfo;
      } else {
        this.userInfo = {
          sub: "",
          nickname: "",
          phone_number: "",
          family_name: "",
          NOMFUN: "",
          CODFUN: "",
          NOMDEPENDENCIA: "",
          DEP_DELEGADO: "",
          EMAIL: "",
          IMG_USUARIO: ""
        }
        this.authService.logout();
      }
      sessionStorage.setItem('session', JSON.stringify(session));
    } else {
      this.logout();
    }
  }

  /**
   * Método usado para desloguearse de la aplicacion.
   */
  logout() {
    this.auth.logout();
  }

  /**
   * Método seleccionado para cambiar el lenguaje
   * @param lang nuevo idioma
   */
  public cambiarLenguaje(lang: string) {
    this.activeLang = lang;
    this.translate.use(lang);
    sessionStorage.setItem("currentLang", btoa(this.activeLang));
    postMessage({ type: 'changeLanguage', parameters: { lenguaje: lang } }, '*');

  }

  /**
   * Metodo que se encarga de ejecutar cambiar lenguaje
   */
  seleccionarIdioma() {
    this.cambiarLenguaje(this.idiomaSeleccionado);
    this.getMensajes();
  }

  /**
   * Método usado para el cambio del tamaño de la fuente de menor a mayor.
   */
  aumentarTamanioFuente() {
    this.valorTamanioFuente++;

    if (this.valorTamanioFuente < 30) {

      sessionStorage.setItem('valorFuente', this.valorTamanioFuente.toString());
      document.documentElement.style.setProperty('--font-size', `${this.valorTamanioFuente}px`);
    }

  }

  /**
   * Método usado para el cambio del tamaño de la fuente de mayor a menor.
   */
  disminuirTamanioFuente() {
    this.valorTamanioFuente--;

    if (this.valorTamanioFuente > 8) {
      sessionStorage.setItem('valorFuente', this.valorTamanioFuente.toString());
      document.documentElement.style.setProperty('--font-size', `${this.valorTamanioFuente}px`);
    }
  }

  /**
   * Método usado para el cambio del tamaño de la fuente de mayor a menor.
   */
  restablecerTamanioFuente() {
    this.valorTamanioFuente = 13;
    sessionStorage.setItem('valorFuente', this.valorTamanioFuente.toString());
    document.documentElement.style.setProperty('--font-size', `${this.valorTamanioFuente}px`);
  }

  /**
   * Metodo usado para el cambio del contraste
   */
  cambioContraste() {
    if (this.layout == 'default') {
      this.layout = "gray";
      this.theme = "gray";
    } else {
      this.layout = "default";
      this.theme = "blue";
    }

    //this.app.layout = layout;
    sessionStorage.setItem('layout', this.layout);
    sessionStorage.setItem('theme', this.theme);

    const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
    layoutLink.href = 'assets/layout/css/layout-' + this.layout + '.css';

    const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
    themeLink.href = 'assets/theme/theme-' + this.theme + '.css';
  }

  /**
   * Método que muestra el dialogo de acercaDe
   */
  show() {
    const ref = this.dialogService.open(AcercaComponent, {
      header: 'Acerca de',
      width: '50%',
      style: { "min-width": "783px" }
    });
  }

  /**
   *Método que abre el manual de ayuda en una nueva pestaña
   */
  abrirManualAyuda() {
    window.open(this.urlAyuda, "_blank");
  }

  /**
   * Metodo encargado de setear los valores a usar en las opciones de ayuda
   */
  cargarMigaMenuAyuda() {
    sessionStorage.setItem("FRM_DELEGADOS", "Mi Perfil");
    sessionStorage.setItem("FRM_MIS_ESCRITORIOS", "Mis Escritorios");
    sessionStorage.setItem("FRM_MIS_OPCIONES", "Mis Opciones");
  }


  cargarFotoUsuarioActual() {
    let tipoMenu = this.referencia.getMenuTopBar();
    if (window['PRODUCTO'].isWso2) {
      this.funcionarioService.cargarFotoUsuario().subscribe((resultado: Respuesta) => {
        this.imagenUsuario = resultado.data;
        this.tieneImagen = resultado.status;
      });
    }

  }

  /**
   * Evento para agregar miga de pan del menu superior
   * @param item nombre pantalla
   */
  onClicTab() { }


  /**
   * Función para obtener mensajes del archivo de propiedades
   */
  getMensajes() {
    this.translate.get('GENERAL.dependencia').subscribe((res: string) => {
      this.mensajeDelegado = res;
    });
    this.translate.get('GENERAL.delegadoDe').subscribe((res: string) => {
      this.mensajeDependencia = res;
    });
  }

}
