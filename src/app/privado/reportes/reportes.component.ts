import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Session } from 'src/app/publico/shared/modelo/Session';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { GeneralService } from 'src/app/shared/servicio/general.service';
import { AppSettings } from 'src/app/AppSettings';
import { ReportesService } from './reportes.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [`
        .box,
        .sample-layout > div {
            background-color: #eaeaea;
            text-align: center;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.25);
        }

        .box-stretched {
            height: 100%;
        }

        .sample-layout {
            margin: 0;
        }

        .sample-layout > div {
            border: 1px solid #ffffff;
        }

        .vertical-container {
            margin: 0;
            height: 200px;
            background: #efefef;
            border-radius: 4px;
        }

        .nested-grid .p-col-4 {
            padding-bottom: 1em;
        }

        .embed-container {
          position: relative;
          
          height: 0;
          overflow: hidden;
      }

      .embed-container iframe {
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    `],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ReportesService]
})
export class ReportesComponent implements OnInit {

  constructor(private reportesService: ReportesService,public sessionService: SessionService) { }

  columns: any[];
  reportesCargar: any[];
  total : any;
  totalItems : any;
  ngOnInit() {
    this.total = 0;
    this.totalItems = 0;
    this.columns = [];
    this.reportesCargar = []
    /*this.reportesService.getListaReportesUsuario().subscribe((result) => {
      
      this.reportesCargar = JSON.parse(result.replace(/'/g, '"'));
      console.log("Reportes a cargar" ,this.reportesCargar)
    })*/
    setTimeout(() => {
      this.waitData();
      }, 500);

  }

 /**
   * Espera que la variable de session que contiene el menu tenga valor Y carga la data
   */
  waitData() {
    let session = <Session>this.sessionService.getCurrentSession();

    if (session == null || !session.menuForma || !session.menuForma.menu_formas) {
      window.setTimeout(function () { this.waitMenu(); }.bind(this), 200);
      return;
    }
    let menuTmp = JSON.parse(JSON.stringify(session.menuForma.menu_formas));
    if(this.totalItems == menuTmp.length){
      return ;
    }
    this.total = 0;
    this.columns = [];
    this.totalItems = menuTmp.length;
    this.mostrarReportesUsuario(menuTmp);
  }

  /**
   * Método encargado de cargar los reportes asociados al usuario logeado.
   */
  mostrarReportesUsuario(menu:any) {
    let token = AppSettings.getToken();
    
    menu.forEach(item => {
      if(item.hijos && item.hijos.length>0){
        item.hijos.forEach(imenu => {
          if(imenu.tipo=='R' && imenu.codigo_forma.indexOf("RPTFM_")==0){
            console.log("reporte",imenu);
            this.columns.push(imenu);
            this.total = this.total + 1;
            let athis = this;
            setTimeout(() => {
              document.getElementById("iframe_" + imenu.codigo_forma +"_" + imenu.id ).setAttribute("src",athis.getURL(imenu));
            }, 500);
          }
        });
      }
    });

    setTimeout(() => {
      this.waitData();
      }, 2000);
  }
/**
 * 
 * @param item return url report
 */
  getURL(item:any){
    return AppSettings._API_ENDPOINT_FOREST + "reportViewer/?__hidemenu=true&id="+item.codigo_forma + (item.custom?"&cid="+item.id:"");
  }

}
