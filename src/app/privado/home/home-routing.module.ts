import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/publico/shared/guard/auth.guard';
import { GeneralComponent } from '../core/general/general/general.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AyudaComponent } from '../shared/componente/ayuda/ayuda.component';
// COMPONENTES
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { MisActividadesComponent } from '../shared/componente/actividades/mis-actividades/mis-actividades.component';
import { TareaInfoComponent } from '../shared/componente/actividades/tarea-info/tarea-info.component';
import { ErrorActComponent } from '../shared/componente/actividades/error-act/error-act.component';
import { DummyComponent } from '../shared/componente/dummy/dummy.component';
const routes: Routes = [
    {
        path: 'home', component: HomeLayoutComponent, canActivate: [AuthGuard], data: { addDynamicChild: true },
        children: [

            {
                path: "mantenimiento_correspondencia/asignar_responsable_atencion_tipo_radicado_001",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO001Module)
            },
            {
                path: "mantenimiento_correspondencia/configuracion_carta_modelo_003",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICumco003Module)
            },
            {
                path: "mantenimiento_correspondencia/definir_acciones_para_tipos_documentales_004",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO004Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_anexos_fisicos_005",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICumco005Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_horario_radicacion_006",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICumco006Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_canales_medios_envio_008",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICumco008Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_tipos_persona_tipos_identificacion_009",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO009Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_motivos_devolucion_010",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO010Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_recorridos_reparto_fisico_012",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO012Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_caracteristicas_terceros_013",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO013Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_tipos_radicados014",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO014Module)
            },
            {
                path: "mantenimiento_correspondencia/mantenimiento_correspondencia/configurar_ejes_tematicos_016",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICumco016Module)
            },
            {
                path: "mantenimiento_correspondencia/administrar_grupos_seguridad_017",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICumco017Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_mensajeria_018",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO018Module)
            },
            {
                path: "mantenimiento_correspondencia/configurar_firmantes_tipo_comunicacion_019",
                loadChildren: () => import('../core/verdaccio-config.module').then(mod => mod.ICUMCO019Module)
            },
            /*
            { path: 'crear-caja', component: CrearCajaComponent, canActivate: [AuthGuard] },
            { path: 'nombrar-carpeta', component: NombrarCarpetaComponent, canActivate: [AuthGuard] },
            { path: 'consultar-inventario', component: ConsultarInventarioComponent, canActivate: [AuthGuard] },
            { path: 'actualizar-nombre-expediente', component: ActualizarNombreExpedienteComponent, canActivate: [AuthGuard] },
            {
                path: 'ubicar-documentos-layout', component: UbicarDocumentosLayoutComponent,
                children: [
                    {
                        path: 'ubicar',
                        component: UbicarDocumentosComponent
                    },
                    {
                        path: 'desubicar',
                        component: DesubicarDocumentosComponent
                    },
                    {
                        path: 'organizar-expedientes',
                        component: OrganizarExpedientesComponent
                    }
                    
                ]
            },
            */
            
            

            /*Path para mis actividades*/
            /*
            {
                path: 'mis-actividades', component: MisActividadesComponent, canActivate: [AuthGuard], children: [


                    
                    {
                        path: "registrarInformacionTransferir/:id",
                        loadChildren: "../core/verdaccio-config.module#RegistrarInformacionModule"
                    },
                    
                    {
                        path: "crearCarpetasTemporales/:id",
                        loadChildren: "../core/verdaccio-config.module#CrearCarpetasModule"
                    },
                    {
                        path: "crearCajasTemporales/:id",
                        loadChildren: "../core/verdaccio-config.module#CrearCajasModule"
                    },
                    
                    {
                        path: "revisarTransferencia/:id",
                        loadChildren: "../core/verdaccio-config.module#IRevisarTransferenciaModule"
                    },
                    {
                        path: "aprobar-firmar-jefe-inmediato/:id",
                        loadChildren: "../core/verdaccio-config.module#IAprobarFirmarJefeInmediatoModule"
                    },
                    
                    {
                        path: "imprimir-fuid-rotulo/:id",
                        loadChildren: "../core/verdaccio-config.module#iImprimirFuidRotulosModule"
                    },
                    {
                        path: "aprobar-firmar-transferencia-archivo/:id",
                        loadChildren: "../core/verdaccio-config.module#IAprobarFirmarTransferenciaArchivoCentralizadoModule"
                    },
                    
                    {
                        path: "realizar-asignacion-evaluacion/:id",
                        loadChildren: "../core/verdaccio-config.module#IRealizarAsignacionEvaluacionModule"
                    },
                    {
                        path: "revisar-firmar-transferencia/:id",
                        loadChildren: "../core/verdaccio-config.module#IRevisarFirmarTransferencia"
                    },
                    {
                        path: "observar-ajustes-solicitados/:id",
                        loadChildren: "../core/verdaccio-config.module#IObservarAjustesSolicitados"
                    }
                    
                    ,


                    {
                        path: 'not-found-form', data: { name: 'error form' },
                        component: ErrorActComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: '**', redirectTo: 'not-found-form',
                        canActivate: [AuthGuard]
                    }

                ]
            },
            */
           { path: 'dummy', component: DummyComponent, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'general/:code', component: GeneralComponent, canActivate: [AuthGuard] },
            { path: 'ayuda', component: AyudaComponent, canActivate: [AuthGuard] },
            /*
            {
                path: "registrarInformacionTransferir",
                loadChildren: "../core/verdaccio-config.module#RegistrarInformacionModule"
            },
            {
                path: "crearCarpetasTemporales",
                loadChildren: "../core/verdaccio-config.module#CrearCarpetasModule"
            },
            {
                path: "crearCajasTemporales",
                loadChildren: "../core/verdaccio-config.module#CrearCajasModule"
            },
            {
                path: "revisarTransferencia",
                loadChildren: "../core/verdaccio-config.module#IRevisarTransferenciaModule"
            },
            {
                path: "aprobar-firmar-jefe-inmediato",
                loadChildren: "../core/verdaccio-config.module#IAprobarFirmarJefeInmediatoModule"
            },
            {
                path: "imprimir-fuid-rotulo",
                loadChildren: "../core/verdaccio-config.module#iImprimirFuidRotulosModule"
            },
            {
                path: "aprobar-firmar-transferencia-archivo",
                loadChildren: "../core/verdaccio-config.module#IAprobarFirmarTransferenciaArchivoCentralizadoModule"
            },
            {
                path: "realizar-asignacion-evaluacion",
                loadChildren: "../core/verdaccio-config.module#IRealizarAsignacionEvaluacionModule"
            },
            {
                path: "revisar-firmar-transferencia",
                loadChildren: "../core/verdaccio-config.module#IRevisarFirmarTransferencia"
            },
            */

        ]
    },
    { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

