import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, ScrollPanel } from 'primeng';
import { HomeLayoutComponent } from 'src/app/privado/home/home-layout/home-layout.component';
import { MenuForma } from 'src/app/publico/shared/modelo/MenuForma';
import { Session } from 'src/app/publico/shared/modelo/Session';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { ReferenciaService } from '../../servicio/referencia.service';
import { GeneralComponent } from 'src/app/shared/servicio/general.component';
import { AppSettings } from 'src/app/AppSettings';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() reset: boolean;
  @Input() slimMenu: boolean;

  model: any[];
  menuForma: MenuForma;
  patronBusqueda: string;
  filteredMenu: any[];

  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;
  
  constructor(public app: HomeLayoutComponent,
    private sessionService: SessionService,
    private referenciaService: ReferenciaService,
    private generalComponent: GeneralComponent,
    private spinner: SpinnerVisibilityService) { }

  ngOnInit() {
    // Cargamos menu de un servicio
    window['refMenu']=this;
    this.cargarMenu();
  }

  /**
   * Funcón que permite quitar las tildes de una cadena
   * 
   * @param palabra string al que se le desea quitar las tildes
   */
  quitarTildes(palabra: string) {
    return palabra.replace("Á", "A")
      .replace("É", "E")
      .replace("Í", "I")
      .replace("Ó", "O")
  }

  /**
   * Muestra resultados del menu segun el texto escrito
   * 
   * @param event 
   */
  buscarItemsMenu(event: any) {
    let index = 0; //Cuenta en que posición se encunentra el hijo que se desea eliminar del array
    let session = <Session>this.sessionService.getCurrentSession();
    
    let menuTmp = JSON.parse(JSON.stringify(  session.menuForma.menu_formas));

    let nuevoMenu = [];
   
    this.filteredMenu = [];

    if (event.query.length >= 3) {

      //Se recorre el menu original
      menuTmp.forEach(item => {
        let nuevosHijos = [];
        //Preguntamos si el item padre del menu coincide con lo que se escribio en el filtro (ignorando las tildes)
        if (this.quitarTildes(item.title.toUpperCase()).includes(this.quitarTildes(event.query.toUpperCase()))) {

          //Se recorren los hijos del item
          item.hijos.forEach(hijoItem => {

              nuevosHijos.push(hijoItem);
            index++
          });
          item.hijos = nuevosHijos;
          index = 0;
          nuevoMenu.push(item)
        } else {

          //Preguntamos si el item padre no coincide con lo escrito en el filtro
          if (!this.quitarTildes(item.title.toUpperCase()).includes(this.quitarTildes(event.query.toUpperCase()))) {

            let nuevosHijos = [];

            //Se recorren los hijos del item que no coincidio con lo escrito en el filtro
            item.hijos.forEach(hijoItem => {
              if (this.quitarTildes(hijoItem.title.toUpperCase()).includes(this.quitarTildes(event.query.toUpperCase()))) {
                nuevosHijos.push(hijoItem);
              }
            });

            item.hijos = nuevosHijos;
            if (nuevosHijos.length != 0) {
              nuevoMenu.push(item)
            }
          }
        }
      });
      this.agregarItemsMenu(nuevoMenu)

    } else {

      this.agregarItemsMenu(menuTmp)

    }
  }

  getMenuFiltred(item: any, matchName: string): boolean {

    item.forEach(subItem => {
      if (this.hasChildren(subItem)) {
        this.getMenuFiltred(subItem.hijos, matchName);
      }
      if (this.isObject(subItem)) {
        if (matchName == subItem.title) return true;
      }
    });

    return false;

    //}
  }

  isObject(obj: any) {
    return (!!obj.name && !!obj.id);
  }

  hasChildren(obj: any) {
    return !!obj.hijos && Array.isArray(obj.hijos);
  }

  /**
   * Función para obtener el menu
   * 
   * @param session 
   */
  private async cargarMenu() {
    this.model = [];
    let modelItem: any = new Object();
    let labelHome = window['PRODUCTO'].labelHome ? window['PRODUCTO'].labelHome : "Área de Trabajo";
    modelItem.label = labelHome;
    modelItem.icon = 'fa fa-fw fa-home';
    modelItem.routerLink = "['/']";
    this.model.push({ label: labelHome, icon: 'fa fa-fw fa-home', routerLink: ['/'] });
    let session = <Session>this.sessionService.getCurrentSession();

    (await this.referenciaService.getMenuFormas()).
      subscribe((result) => {
        this.menuForma = result;
        session.menuForma = result;

        // Guardamos en sesion el menu forma
        this.sessionService.setCurrentSession(session);

        let menuFormas = session.menuForma && session.menuForma.menu_formas ? session.menuForma.menu_formas : [];

        this.agregarItemsMenu(menuFormas);
        window.setTimeout(function(){
          this.cargarMenuExtra();
          
        }.bind(this),500);

      });

  }

  async agregarItemsMenu(menuFormas: any) {
    this.model = []
    let modelItem: any = new Object();
    let labelHome = window['PRODUCTO'].labelHome ? window['PRODUCTO'].labelHome : "Workplace";
    modelItem.label = labelHome;
    modelItem.icon = 'fa fa-fw fa-home';
    modelItem.routerLink = "['/']";
    this.model.push({ label: labelHome, icon: 'fa fa-fw fa-home', routerLink: ['/'] });
    menuFormas.forEach(menu => {
      let itemMenu: any;

      if (menu.hijos && menu.hijos.length > 0) {

        let itemMenuHijos = this.setItemsMenu(itemMenu, menu.hijos, false);

        itemMenu = { label: menu.title, icon: menu.icono, items: itemMenuHijos };
      } else {
        sessionStorage.setItem(menu.codigo_forma, menu.title);
        itemMenu = { label: menu.title, icon: menu.icono, routerLink: ['/' + menu.codigo_forma] };
      }
     
      this.model.push(itemMenu);
  
    });

  }

  async cargarMenuExtra(){
    if(AppSettings.ENDPOINT_MENU_REPORT){
      (await this.referenciaService.getMenuFormasReport()).forEach(data => {
        
        if(data){
          let itemMenus : any;
          let itemMenuHijoss = this.setItemsMenu(itemMenus, data, true);
  
          itemMenus = { title: "Mis Reportes",  label: "Mis Reportes",icon: "fa fa-fw fa-bar-chart", items: itemMenuHijoss ,hijos:data}
          let session = <Session>this.sessionService.getCurrentSession();
          session['menuForma']['menu_formas'].push(itemMenus);

          // Guardamos en sesion el menu forma
          this.sessionService.setCurrentSession(session);
          this.model.push(itemMenus);
         
        } 
      });
    }
  }
  /**
   * Función recursiva para menu dinamico
   * 
   * @param itemMenu 
   * @param menuFormas items hijos del menu
   */
  setItemsMenu(itemMenu: any, menuFormas: MenuForma[], extended : Boolean): any[] {
    let modelHijo = [];
    if (menuFormas)
      menuFormas.forEach(menu => {

        if (menu.hijos && menu.hijos.length > 0) {
          let itemMenuHijos = this.setItemsMenu(itemMenu, menu.hijos,extended);
          itemMenu = { label: menu.title, icon: menu.icono, items: itemMenuHijos };

        } else {
          let pathForm = "";
          if (menu.codigo_forma && menu.codigo_forma.includes("FRM")) {
            pathForm = `home/general/${menu.codigo_forma}`;
          } else {
            if (menu.codigo_forma && menu.codigo_forma.split('/archivo').length > 1) {
              let formaArchivo: string = menu.codigo_forma;
              pathForm = 'home/general/' + btoa(formaArchivo);
            } else {
              pathForm = menu.codigo_forma;
            }
          }
          if (menu.codigo_forma && menu.codigo_forma.split('/archivo').length > 1) {
            let formaArchivo: string = btoa('home/general/' + menu.codigo_forma);
            sessionStorage.setItem(formaArchivo, menu.title);
          } else {
            sessionStorage.setItem(menu.codigo_forma, menu.title);
          }

          if (pathForm && (pathForm.includes("TAB") || pathForm.includes("RPT") || pathForm.includes("REP"))) {
            itemMenu = { label: menu.title, icon: menu.icono, other: menu.codigo_forma};
            if(extended){
              itemMenu.id = menu.id;
              menu.custom = true;
            }
          } else {
            itemMenu = { label: menu.title, icon: menu.icono, routerLink: ['/' + pathForm], other: menu.codigo_forma };
          }

        }

        modelHijo.push(itemMenu);

      });
    return modelHijo;
  }

  changeTheme(theme) {
    const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
    const href = 'assets/theme/theme-' + theme + '.css';

    this.replaceLink(themeLink, href);
  }

  changeLayout(layout) {
    this.app.layout = layout;
    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    const href = 'assets/layout/css/layout-' + layout + '.css';

    this.replaceLink(layoutLink, href);
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement, href) {
      if (this.isIE()) {
          linkElement.setAttribute('href', href);
      } else {
          const id = linkElement.getAttribute('id');
          const cloneLinkElement = linkElement.cloneNode(true);

          cloneLinkElement.setAttribute('href', href);
          cloneLinkElement.setAttribute('id', id + '-clone');

          linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

          cloneLinkElement.addEventListener('load', () => {
              linkElement.remove();
              cloneLinkElement.setAttribute('id', id);
          });
      }
  }

  onWrapperClick(event: Event) {
      this.app.onMenuClick(event);
  }
 

}

