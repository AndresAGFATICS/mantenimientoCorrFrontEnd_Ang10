import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

// SERVICIOS
import { SpinnerVisibilityService } from 'ng-http-loader';
import { SessionService } from 'src/app/shared/servicio/session.service';
import { ReferenciaService } from 'src/app/privado/shared/servicio/referencia.service';
import { GeneralService } from 'src/app/shared/servicio/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [GeneralService]
})
export class GeneralComponent implements OnInit {

  code: string;
  token: string;
  url: SafeResourceUrl;

  itemsBread: MenuItem[]; // items menu para miga de pan
  migaPan: string = "";

  constructor(private sessionService: SessionService,
    public activatedRoute: ActivatedRoute,
    private spinner: SpinnerVisibilityService,
    private domSanitizer: DomSanitizer,
    private generalService: GeneralService) { }

  ngOnInit() {

    this.token = this.sessionService.getCurrentToken();

    this.activatedRoute.params.subscribe(params => {
      this.code = params['code'];

      this.getIframeUrl();
    });
  }
  
  /**
   * retorna el nombre del worplace
   */
  getNameWp(): string {
    return window['PRODUCTO'].labelHome ? window['PRODUCTO'].labelHome : "Workplace";
  }

  getIframeUrl(): SafeResourceUrl {
    //Integración con formas
    sessionStorage.token = this.sessionService.getCurrentToken()
    this.spinner.show();

    let url = "";
    if (this.code.indexOf('FRM_') >= 0) {
      let ele = <HTMLElement>document.querySelector('body > app-root > app-home-layout > div > div > div > app-general > div > div > iframe');
      ele.style.height = (window.innerHeight - 120) + "px"
      url = "../xuiComponent/formViewer.html?codForm=" + this.code;
    } else {
      console.log("code", this.code)
      if (this.isBase64(this.code)) {
        let ele = <HTMLElement>document.querySelector('body > app-root > app-home-layout > div > div > div > app-general > div > div > iframe');
        ele.style.height = (window.innerHeight - 120) + "px"
        url = atob(this.code)

        this.generalService.postDynamicForm(url, null, "integracionFrame");
      } else {
        url = this.code;
      }


    }


    this.migaPan = this.getNameWp() + " > " + sessionStorage.getItem(this.code)

    this.spinner.hide();
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    return this.url;
  }

  /**
   * Funcion para validar si el string enviado es un base64
   * @param str 
   */
  isBase64(str): boolean {
    if (str === '' || str.trim() === '') { return false; }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }

}
