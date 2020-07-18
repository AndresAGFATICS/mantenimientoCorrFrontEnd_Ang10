import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Actividad } from '../../../modelo/Actividad';
import { Mensajes } from '../../../modelo/Messages';
import { MisActividadesService } from '../../../servicio/mis-actividades.service';

@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mis-actividades.component.html',
  styleUrls: ['./mis-actividades.component.css']
})
export class MisActividadesComponent implements OnInit {
  //Data grid
  actividadesUsuario: Actividad[] = [];
  actividadSeleccionada: Actividad;
  _selectedColumns: any[];
  //Tab menu
  actividades: any[];
  actividadInicial: MenuItem;
  actividadesAbiertas: Actividad[] = [];

  cols: any[];

  infoSeverity = "info";
  errorSeverity = "error";
  msgs: any[];
  paginador = 0;
  totalRecords = 0;
  paginas: SelectItem[];
  pageSize: number;
  loading: boolean;
  pagActual: number;
  sortField :string;
  sortOrder : number;
  codigoForma: string;

  formaSeleccionada: boolean;

  constructor(private misActividadesService: MisActividadesService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {
    // Inicializamos numero de paginación
    this.paginas = [
      { label: '5', value: 5 },
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: '200', value: 200 }
    ];

    let athis = this;
    window.addEventListener("message", function (msg) { 
      if (msg.data.type == "recargarMisActividades") {
        window.setTimeout(function(){
        this.actividades.pop();
        this.onCargarActividadesAsignadas();
        }.bind(athis),500);
      }
    });
  }

  /**
   * Evento que se ejecuta al iniciar la página
   */
  ngOnInit() {
    this.actividades = []
    this.pageSize = 20;  // Se inicializa Tamaño de la pagina
    //this.onCargarColumnasGridTareas();
    
    this.cols = [
      { field: 'numRad', header: 'Radicado en Gesti\u00f3n' },
      { field: 'numpro', header: 'Caso' },
      { field: 'fechaAsignacionActividad', header: 'Fecha Asignaci\u00f3n' },
      { field: 'nombreProcesoBpm', header: 'Proceso' },
      { field: 'nombreActividadBpm', header: 'Actividad' },
      { field: 'usuarioAsignador', header: 'Asignado Por' },
      { field: 'idActividadBpm', header: 'Id Actividad', hidden: true, visible: false },
      { field: 'nombreTramite', header: 'Trámite' }
    ];
    this._selectedColumns = this.cols;
    //this.onCargarActividadesAsignadas();
  }

  /**
   * Método para cerrar el tab de la actividad
   * @param event click del evento
   * @param index indice en donde se encuentra el elemento a eliminar
   */
  closeItem(event) {
    let actividadEliminada: any = this.actividades[event.index - 1];
    this.actividades.splice(this.actividades.indexOf(actividadEliminada), 1);

    if (typeof actividadEliminada != undefined)
      event.close();

    this.formaSeleccionada = false;
  }

  /**
   * Evento para ejecutar y cargar las actividades del usuario actual
   */
  onCargarActividadesAsignadas(pagina?, size?,sortField? :string,sortOrder?: number) {
    this.loading = true;
    this.pagActual = pagina ? pagina : 0;
    this.misActividadesService.getActividadesUsuario(pagina, size, sortField, sortOrder).
    subscribe((respuesta) => {
      this.totalRecords = parseInt(respuesta.headers.get('x-total-count'));
      this.actividadesUsuario = respuesta.body;
      this.loading = false;
    }, (error => {
      console.log(error);
      this.lanzarMensaje(this.errorSeverity, "Error listando las tareas del usuario.");
      this.lanzarMensajeEstatico(this.errorSeverity, Mensajes.ERROR_LISTAR_ACTIVIDADES);
      this.loading = false;
    }))
  }

  /**
   * Evento para cargar las columnas de la tabla taread
   */
  onCargarColumnasGridTareas() {
    
  }

  /**
   * Evento para abrir la actividad seleccionada desde el grid
   * @param event evento del usuario
   * @param rowData Datos de la actividad
   * @param index indice de la actividad
   */
  onRowDblClick(rowData: Actividad) {
    let validacion = false;
    this.actividades.forEach(actividadAbierta => {
      if (actividadAbierta.idActividad == rowData.idActividadBpm) {
        validacion = true;
      }
    });

    if (!validacion) {
      this.actividadSeleccionada = rowData;
      let actividad = { label: rowData.nombreActividadBpm, icon: 'pi pi-angle-right', actividad: rowData, idActividad: rowData.idActividadBpm, style: '{"height":"100px"}' }

      if (this.actividades.length == 0) {
        this.actividades.push(actividad);
      } else {
        this.lanzarConfirmacionCerrarActividad(this.actividades[this.actividades.length - 1], actividad);
      }
      this.misActividadesService.setActividadActual(rowData);
    } else {
      this.lanzarMensaje(this.infoSeverity, Mensajes.ACTIVIDAD_CARGADA.replace("{0}", rowData.nombreActividadBpm));
    }

    this.formaSeleccionada = true;
  }

  /**
   * Método el cual se encarga de abrir la actividad seleccionada y guardar las variables actividad inicial e actividad abierta
   * @param actividadNueva Actividad seleccionada - Menú tab
   * @param actividad Actividad Seleccionada en el grid.
   */
  abrirActividad(actividadNueva: MenuItem, actividad: Actividad) {
    let ultimaActividad = this.actividades.length;
    this.actividades.push(actividadNueva);
    this.actividadInicial = this.actividades[ultimaActividad];
    this.misActividadesService.setActividadActual(actividad);
  }


  /**
   * Mostrar mensaje en un toast segun los parametros enviados.
   * @param severity severidad del mensaje
   * @param mensaje mensaje a mostrar
   */
  lanzarMensaje(severity: string, mensaje: string) {
    this.messageService.add({ severity: severity, summary: mensaje });
  }
  /**
   * Mostrar mensaje en estatico segun los parametros enviados.
   * @param severity 
   * @param mensaje 
   */
  lanzarMensajeEstatico(severity, mensaje) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: mensaje });
  }

  /**
   * Evento para cambiar entre los diferentes tabs disponibles
   * @param event evento del clic
   * @param index indice en donde se encuentra el usuario
   */
  onClicTab(event, index) {
    this.actividadInicial = this.actividades[index]
  }

  /**
   * Método para cambiar a otra actividad ya que solo se puede tener abierta una actividad
   * @param actividadAntigua actividad anterior
   * @param actividad actividad nueva
   */
  lanzarConfirmacionCerrarActividad(actividadAntigua: any, actividad: any) {
    this.confirmationService.confirm({
      message: Mensajes.CERRAR_ACTIVIDAD.replace("{0}", "<strong>" + actividadAntigua.label + "</strong>"),
      rejectVisible: true,
      rejectLabel: "Cancelar",
      acceptLabel: "Aceptar",
      header: "Confirmación",
      accept: () => {
        this.actividades = [];
        this.actividades.push(actividad)
        this.formaSeleccionada = true;
      },
      reject: () => {

      }
    });
  }

  /**
   * Paginador cambio de pagina
   */
  cambioPagina() {
    this.paginador = 1;
    this.onCargarActividadesAsignadas(1, this.pageSize,this.sortField,this.sortOrder);
  }

  /**
   * Método para cargar el grid con retrazo
   * @param event evento realizado en la forma de mis actividades
   */
  cargaActividadesLazy(event: LazyLoadEvent) {
    // Establecemos paginación
    let nroPagina = (event.first / this.pageSize) + 1
    if (this.pagActual != nroPagina || this.sortField!=event.sortField || this.sortOrder!=event.sortOrder){
      this.sortOrder = event.sortOrder;
      this.sortField = event.sortField;
      this.onCargarActividadesAsignadas(nroPagina, this.pageSize,event.sortField,event.sortOrder);
    }
  }


  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}

set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
}

}
