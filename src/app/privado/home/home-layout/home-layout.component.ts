import { Component, OnInit, Renderer2, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { fromEvent, timer, interval } from 'rxjs';




// CONFIGURACION
import { AppSettings } from '../../../AppSettings';

//SERVICIOS
import { AuthService } from '../../../publico/shared/servicio/auth.service';
import { ReferenciaService } from '../../shared/servicio/referencia.service';
import { MessageService } from 'primeng/api';
import { CombinacionTeclasComponent } from './combinacion-teclas-info.component';
import { DialogService } from 'primeng/dynamicDialog';

import { Session } from 'src/app/publico/shared/modelo/Session';
import { LoginObject } from 'src/app/publico/shared/modelo/LoginObject';




enum MenuMode {
  STATIC,
  OVERLAY,
  SLIM
}

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
})
export class HomeLayoutComponent implements OnInit, DoCheck {

  // Variables para el timeout
  countMinutes: number;
  countSeconds: number;
  progressCount: number;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  migaPan: string = "";
  session: Session;
  flagToken = true;

  items: string; //: MenuItem[] = [{}];

  // Variables para el menu
  menu: MenuMode = MenuMode.STATIC;

  layout = 'default';

  darkMenu: boolean;

  documentClickListener: Function;

  staticMenuInactive: boolean;

  overlayMenuActive: boolean;

  mobileMenuActive: boolean;

  menuClick: boolean;

  menuButtonClick: boolean;

  topbarMenuButtonClick: boolean;

  topbarMenuActive: boolean;

  activeTopbarItem: Element;

  resetSlim: boolean;

  menuHoverActive: boolean;

  isHome: boolean;

  slimMenuActive = false;

  constructor(public renderer: Renderer2,
    private idle: Idle,
    private keepalive: Keepalive,
    private authService: AuthService,
    private router: Router,
    private referenciaService: ReferenciaService,
    public dialogService: DialogService,
    private messageService: MessageService) {
    // sets an idle timeout of AppSettings.IDLE seconds, for testing purposes.
    idle.setIdle(AppSettings.IDLE);
    // sets a timeout period of AppSettings.TIMEOUT seconds. after AppSettings.IDLE + AppSettings.TIMEOUT seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(AppSettings.TIMEOUT);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.authService.logout();
      this.router.navigate(['/login']);
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'

      this.progressCount = this.reverseNumber(countdown);;
      this.countMinutes = (Math.floor(countdown / 60));
      this.countSeconds = countdown % 60;
    });

    this.reset();
    const tiempoToken = interval(1000);
    const refrescarToken = interval(120000); //interval(600000);

    tiempoToken.subscribe(() => {
      this.session = JSON.parse(sessionStorage.session)
      this.session.expires_in = this.session.expires_in - 1
      sessionStorage.setItem("session", JSON.stringify(this.session));
      
    });

    refrescarToken.subscribe(() => {
      let loginObject = new LoginObject();
      loginObject.grant_type = 'refresh_token';
      loginObject.refresh_token = this.session.refresh_token;
      if (this.session.expires_in < 150 && this.flagToken) {
        console.log("Refrescando token usuario")
        this.flagToken = false;
        this.authService.refrescarTokenUsuario(loginObject).subscribe(respuesta => {
          sessionStorage.setItem("session", JSON.stringify(respuesta));
          this.flagToken = true;
        });
      }
    });
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;

  }

  reverseNumber(countdown: number) {
    return (300 - (countdown - 1));
  }

  ngOnInit() {
    const cleanTeclas = interval(1000)
    const eventoTeclas = fromEvent(document, "keydown")

    eventoTeclas.subscribe((tecla: any) => {
      if (tecla.key == "i" && tecla.ctrlKey) {
        this.onEventAbrirPopUpInfo();
      } else if (tecla.key == "v" && tecla.altKey && tecla.ctrlKey) {
        this.router.navigate(['/home/ventanillaEntrada']).catch((error) => {
          this.mensajeToastMostrar("error", "No se encontr\u00f3 la ventanilla en el workplace")
        })
      } else if (tecla.key == "m" && tecla.altKey && tecla.ctrlKey) {
        window['postMessage']({ type: 'navigate', url: 'ACALI_FRM_MR_EDITAR_DOC_ENTRADA', title: 'Editar documento de Entrada' }, '*')
      
      } else if (tecla.key == "i" && tecla.altKey) {
        this.onEventOpenAppPopUpInfo();
      } else {
        window['postMessage']({ type: 'especialKeys',key:tecla.key,altKey:tecla.altKey,ctrlKey:tecla.ctrlKey} , '*');
      }
      

    });


  }

  ngDoCheck() {
    this.onCargarMigaPan();
  }

  onEventAbrirPopUpInfo() {
    const ref = this.dialogService.open(CombinacionTeclasComponent, {
      header: 'Combinaci\u00f3n Teclas Disponibles',
      width: '45%'
    });
  }

  /**
   * Abre la ventana con el archivo que indica la version de los componentes instalados
   */
  onEventOpenAppPopUpInfo() {
    window.open("assets/version.html","version_win","",true);
    
  }

  mensajeToastMostrar(tipoMensaje: string, mensaje: string) {
    this.messageService.add({ severity: tipoMensaje, detail: mensaje });
  }

  onLayoutClick() {

    if (!this.menuClick && !this.menuButtonClick) {
      this.mobileMenuActive = false;
      this.overlayMenuActive = false;
      this.resetSlim = true;
      this.menuHoverActive = false;
    }

    if (!this.topbarMenuButtonClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    this.menuClick = false;
    this.menuButtonClick = false;
    this.topbarMenuButtonClick = false;
  }

  onMenuButtonClick(event: Event) {
    this.menuButtonClick = true;
    if (this.isMobile()) {
      this.mobileMenuActive = !this.mobileMenuActive;
    } else {
      if (this.staticMenu) {
        this.slimMenuActive = true;
        this.changeToSlimMenu();
        // this.staticMenuInactive = !this.staticMenuInactive;
      } else if (this.overlayMenu) {
        this.overlayMenuActive = !this.overlayMenuActive;
      } else if (this.slimMenu) {
        this.slimMenuActive = false;
        this.changeToStaticMenu();
      }
    }

    event.preventDefault();
  }

  onTopbarMenuButtonClick(event: Event) {
    this.topbarMenuButtonClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;
    event.preventDefault();
  }

  onTopbarItemClick(event: Event, item: Element) {
    this.topbarMenuButtonClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  onMenuClick(event: Event) {
    this.menuClick = true;
    this.resetSlim = false;

  }

  get slimMenu(): boolean {
    return this.menu === MenuMode.SLIM;
  }

  get overlayMenu(): boolean {
    return this.menu === MenuMode.OVERLAY;
  }

  get staticMenu(): boolean {
    return this.menu === MenuMode.STATIC;
  }

  changeToSlimMenu() {
    this.menu = MenuMode.SLIM;
  }

  changeToOverlayMenu() {
    this.menu = MenuMode.OVERLAY;
  }

  changeToStaticMenu() {
    this.menu = MenuMode.STATIC;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }
  /**
   * retorna el nombre del worplace
   */
  getNameWp(): string {
    return window['PRODUCTO'].labelHome ? window['PRODUCTO'].labelHome : "Workplace";
  }

  onCargarMigaPan() {
    var migaPan = "";
    if (this.router.url.includes("FRM")) {
      let forma = this.router.url.split("/")[3];
      migaPan = sessionStorage.getItem(forma);
    } else if (this.router.url.includes("__archivo")) {
      let forma = this.router.url.split("/")[3];
      migaPan = sessionStorage.getItem(forma);
    } else if (this.router.url.includes("mpEcm")) {
      let forma = this.router.url.split("/")[3];
      migaPan = sessionStorage.getItem('home/mpEcm/' + forma);
    } else {
      if (this.router.url.includes("mis-actividades")) {
        migaPan = sessionStorage.getItem("/home/mis-actividades")
      } else {
        migaPan = sessionStorage.getItem(this.router.url)
      }
    }
    this.migaPan = this.getNameWp() + " > " + (migaPan && migaPan != "null" ? migaPan : "");
  }

}
