import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from '../../../modelo/Tarea';
import { MisActividadesService } from '../../../servicio/mis-actividades.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Actividad } from '../../../modelo/Actividad';
import { AppSettings } from '../../../../../AppSettings';


@Component({
  selector: 'app-tarea-info',
  templateUrl: './tarea-info.component.html',
  styleUrls: ['./tarea-info.component.css']
})
export class TareaInfoComponent implements OnInit {

  @Input() idActividadSeleccionada: string;
  @Input() numeroTab: string;
  actividadSeleccionada: Actividad;
  cargandoInfo: boolean = true;
  numeroCaso: string;
  nombreProceso: string;
  actividad: string;
  tercero: string;
  fechaAsignacion: Date;
  fechaVencimiento: Date;
  enviadoPor: String;
  codigoForma: string;
  tareaSeleccionada: Tarea;
  code: string;
  cargando: boolean = true;
  frame: boolean = false;

  url: SafeResourceUrl;
  user: any;
  fechaFormateada: string;
  userID: any;
  fechaID: any;
  mensajeID: any;
  constructor(private misActividadesService: MisActividadesService,
    private domSanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.idActividadSeleccionada);
    console.log(this.numeroTab);
    this.idActividadSeleccionada = this.idActividadSeleccionada ? this.idActividadSeleccionada : this.route.snapshot.params.id
    this.actividadSeleccionada = this.misActividadesService.getActividadActual();

    setTimeout(() => {
      this.onCargarTareaSeleccionada(this.idActividadSeleccionada);
     /***** Boton Info********/
      let enlacesHeader;
      enlacesHeader = document.querySelectorAll('.anima')['0'];

      let semaforo;
      semaforo = true;

      document.querySelectorAll('.icoInfo')['0'].addEventListener('click', function() {

        if (semaforo) {
            document.querySelectorAll('.icoInfo')['0'].style.color = '#3984b8';
            semaforo = false;

        } else {
            document.querySelectorAll('.icoInfo')['0'].style.color = '#888';
            semaforo = true;
      }
        enlacesHeader.classList.toggle('menudos');

    });
 /***** Fin Boton Info********/

    }, 1100);
  }

  private onChargeActividad() {

    this.misActividadesService.getInfoAdicional(this.actividadSeleccionada.idActividadBpm, this.actividadSeleccionada.numpro).subscribe(respuesta => {
      let datos: any = JSON.parse(respuesta.body);
      this.nombreProceso = datos.NOMBRE_PROCESO ? datos.NOMBRE_PROCESO[0] : "";
      this.actividad = datos.NOMBRE_ACTIVIDAD ? datos.NOMBRE_ACTIVIDAD[0] : "";
      this.tercero = datos.NOMBRE_TERCERO ? datos.NOMBRE_TERCERO[0] : "";
      this.fechaAsignacion = datos.FECHA_CREACION ? datos.FECHA_CREACION[0] : "";
      this.fechaVencimiento = datos.FECHA_VENCIMIENTO ? datos.FECHA_VENCIMIENTO[0] : "";
      this.enviadoPor = datos.ASIGNADO_POR ? datos.ASIGNADO_POR[0] : ""
    });
    this.numeroCaso = this.actividadSeleccionada.numpro;
    this.code = this.tareaSeleccionada.formKey;
  }

  onCargarTareaSeleccionada(actividadSeleccionada: string) {
    this.cargandoInfo = true;
    this.misActividadesService.getForestTask(actividadSeleccionada).subscribe((resultado: Tarea) => {
      this.codigoForma = resultado.formKey;
      this.tareaSeleccionada = resultado;
      this.onChargeActividad();
      this.misActividadesService.getComentarios(this.actividadSeleccionada.numeroInstanciaProcesoBpm).subscribe(resp  =>{
        resp.CommentList.forEach(respuesta =>{
          this.user = respuesta

          

          var format = this.user.fecha
          var anios = format.slice(23)
          var meses = format.slice(4,-21)
          var dias = format.slice(8,19)
          if(meses == 'Jan'){meses = '01'};if(meses == 'Feb'){meses = '02'};if(meses == 'Mar'){meses = '03'};if(meses == 'Apr'){meses = '04'};if(meses == 'May'){meses = '05'};if(meses == 'Jun'){meses = '06'};if(meses == 'Jul'){meses = '07'};if(meses == 'Aug'){meses = '08'};if(meses == 'Sep'){meses = '09'};if(meses == 'Oct'){meses = '10'};if(meses == 'Nov'){meses = '11'};if(meses == 'Dec'){meses = '12'};
          this.fechaFormateada = anios+"-"+meses+"-"+dias
          console.log(this.fechaFormateada)
          this.userID = this.user.userId ? this.user.userId : "";
          this.fechaID = this.fechaFormateada ? this.fechaFormateada : "";
          this.mensajeID = this.user.mensaje ? this.user.mensaje : "";
        })
          
        })
      if (this.code.startsWith('FRM')) {
        console.log("XUI")
        this.frame = true;
        this.url = this.getIframeUrl(this.code, true);
        
      } else if (this.code.startsWith("/archivo")) {
        console.log("ARCHIVO")
        this.frame = true
        let formaArchivo: string[] = this.code.split("/");
        console.log(formaArchivo)
        let archivo = "/" + formaArchivo[1] + "/?taskId=" + this.actividadSeleccionada.idActividadBpm + "&businessKey=" + this.actividadSeleccionada.numpro + "/" + formaArchivo[2] + "/" + formaArchivo[3];
        this.url = this.getIframeUrl(archivo, false)
      } else {
        this.frame = false;
        this.cargando = false;
        //this.router.navigate(["home/mis-actividades/" + this.codigoForma.replace("/home/", "") + "/" + this.actividadSeleccionada.idActividadBpm + "/" + this.actividadSeleccionada.numpro]);
        
        setTimeout(function(){
            
        var url = this.codigoForma + "/" + this.actividadSeleccionada.idActividadBpm + "/" + this.actividadSeleccionada.numpro;
        console.log('Navegando  a la ruta', url);
        this.router.navigate([url])
        .catch(e => {
            console.log('Route not found, redirection stopped with no error raised', url);
          });
        }.bind(this),500);

      }
      this.cargandoInfo = false;
      this.cargando = false;
    });


    //let ele:HTMLElement = <HTMLElement>document.querySelector('body > app-root > app-home-layout > div > div > div > app-mis-actividades > p-tabview > div > div > p-tabpanel > div');
    let ele: HTMLElement = <HTMLElement>document.querySelector('#ui-tabpanel-1');
    if ( ele  && ele.style != null)
      ele.style.height = "2000px"

  }

  getIframeUrl(url: string, xui: boolean): SafeResourceUrl {

    //Integración con formas
    if (xui) {
      url = "/xuiComponent/formViewer.html?codForm=" + this.code + "&businessKey=" + this.actividadSeleccionada.numpro + "&processId=" + this.actividadSeleccionada.numeroInstanciaProcesoBpm + "&taskId=" + this.actividadSeleccionada.idActividadBpm;
    }
    this.cargando = false;
    url = AppSettings._API_ENDPOINT_FOREST + url;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
