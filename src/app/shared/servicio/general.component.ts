import { Component, OnInit, ɵConsole } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicDialog';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { GeneralService } from './general.service';
import { AlertaComponent } from './alerta.component';
import { AppSettings } from '../../AppSettings';

@Component({
    selector: 'app-general',
    template: `
    <p></p>
  `,
    providers: [MessageService],
})
export class GeneralComponent {
    //referencia al popup creado
    refDialog : any;
    constructor(private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public router: Router,
        private spinner: SpinnerVisibilityService,
        private generalService: GeneralService,
        public dialogService: DialogService) {
        
        //Forzar escritura del caracterizador
        //TODO esto debe quitarse cuando el cliente apruebe agregar la modificacion al war desplegado del caracterizador
        //Si no se define lo primero  definir parametro para quitar en otras implementaciones
        var tmpF = function () {
            try {
                if (window['globals'] && window['globals'].winCaracterizador) {
                    if (window['globals'].winCaracterizador.pasarDatosOrfeo) {
                        //validar copia 
                        if (!window['globals'].winCaracterizador.pasarDatosOrfeoBK) {
                            console.log("Sobreescribiendo  metodo  ventana del caracterizador");
                            window['globals'].winCaracterizador.pasarDatosOrfeoBK = window['globals'].winCaracterizador.pasarDatosOrfeo;
                            if (!window['globals'].winCaracterizador.document.querySelector("#_formulariodub_WAR_caracterizacionportlet_\\:frmFormularioDub\\:panel_content > legend:nth-child(4)")) {
                                this.console.log("TIPO NATURAL");

                                window['globals'].winCaracterizador.pasarDatosOrfeo = function () {
                                    console.log("entro ciudadano natural");
                                    var codOrfeo = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:CodOrf").value;

                                    var cedula = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itNroIdentificacion").value;

                                    var codigoPasaporte = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:pasaporte").value;
                                    var primerNombre = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itPrimerNombre").value;
                                    var segundoNombre = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itSegundoNombre").value;
                                    var primerApellido = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itPrimerApellido").value;
                                    var segundoApellido = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itSegundoApellido").value;
                                    var direccion = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:direccionResidencia").value;
                                    var telefono = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:telefonoFijo").value;
                                    var email = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:email").value;
                                    var infoAdicionaljur = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:informacionAdicionalResidencia").value;


                                    var paisCodOrfeo = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:paisCodOrfeo").value;
                                    var depCodOrfeo = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:depCodOrfeo").value;
                                    var munCodOrfeo = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:munCodOrfeo").value;
                                    var departamento = paisCodOrfeo + "-" + depCodOrfeo;
                                    var municipio = paisCodOrfeo + "-" + depCodOrfeo + "-" + munCodOrfeo;
                                    var direccionC = direccion + " " + infoAdicionaljur;
                                    var nombre = primerNombre + " " + segundoNombre;
                                    var tipoDoc = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:tipoDocumento_input").value;
                                    var numeroIdentificacion = "";
                                    if (tipoDoc != 3) {
                                        numeroIdentificacion = cedula;
                                    } else {
                                        numeroIdentificacion = codigoPasaporte + "-" + cedula;
                                    }
                                    var ciudadano = 0;



                                    console.log("segundoApellido ", segundoApellido);
                                    console.log("primerApellido ", primerApellido);
                                    console.log("segundoNombre ", segundoNombre);
                                    console.log("primerNombre ", primerNombre);
                                    console.log("cedula ", cedula);
                                    console.log("codOrfeo ", codOrfeo);
                                    console.log("direccion ", direccion);
                                    console.log("telefono ", telefono);
                                    console.log("email ", email);

                                    var extra = {};
                                    extra["codOrfeo"] = codOrfeo;
                                    //enviar tipo de documento 
                                    extra["tipoPersona"] = "1"; //Natural
                                    extra["tipoDoc"] = (tipoDoc !== null && tipoDoc !== undefined && tipoDoc !== "" ? tipoDoc : 5);//Se asume CC si el dato no viene
                                    extra["numeroIdentificacion"] = numeroIdentificacion;
                                    extra["primerNombre"] = primerNombre;
                                    extra["segundoNombre"] = segundoNombre;
                                    extra["primerApellido"] = primerApellido;
                                    extra["segundoApellido"] = segundoApellido;
                                    extra["email"] = email;
                                    extra["telefono"] = telefono;
                                    extra["celular"] = this.document.getElementById('_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:j_idt109').value;
                                    extra["ciudadano"] = ciudadano;
                                    extra["pais"] = paisCodOrfeo;
                                    extra["departamento"] = depCodOrfeo;
                                    extra["municipio"] = munCodOrfeo;
                                    extra["direccionC"] = direccionC;
                                    extra["autorizoMensaje"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:autorizaMensajes_input").getAttribute("aria-checked") == 'true';
                                    extra["autorizoRecibirCorreo"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:autorizaCorreo_input").getAttribute("aria-checked") == 'true';
                                    extra["coordenadaX"] ="8°26'01''N";
                                    extra["coordenadaY"] ="21°74'101''W";
                                    extra["tipoDireccionFormal"]=this.document.getElementById('_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:tipoDireccion_input').value;
                                    console.log(JSON.stringify(extra), '*');
                                    this.opener.postMessage(JSON.stringify(extra), '*');
                                    
                                }.bind(window['globals'].winCaracterizador);
                            }
                            else {
                                this.console.log("TIPO JURIDICO");
                                window['globals'].winCaracterizador.pasarDatosOrfeo = function () {
                                    this.console.log("Funcion sobre escrita");
                                    var razonSocial = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itRazonSocial").value;
                                    var codigoOrfeoOrg = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:CodOrf").value;
                                    var nit = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itNit").value;
                                    var digitoV = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itDigV").value;
                                    var primerNombreL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:primerNombre_input").value;
                                    var segundoNombreL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:segundoNombre").value;
                                    var primerApellidoL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:primerApellido").value;
                                    var segundoApellidoL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:segundoApellido").value;
                                    var direccionL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:direccionSedes").value;
                                    var telefonoL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:celularInte").value;
                                    var emailL = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:emailOrga").value;
                                    var nombreL = primerNombreL + " " + segundoNombreL + " " + primerApellidoL + " " + segundoApellidoL;
                                    var infoAdicionaldir = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:informacionAdicionalSedes").value;
                                    var empresa = 2;
                                    var paisCodOrfeo = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:paisCodOrfeo").value;
                                    var depCodOrfeo = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:depCodOrfeo").value;
                                    var munCodOrfeo = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:munCodOrfeo").value;
                                    var departamento = paisCodOrfeo + "-" + depCodOrfeo;
                                    var municipio = paisCodOrfeo + "-" + depCodOrfeo + "-" + munCodOrfeo;
                                    var direccionC = direccionL + " " + infoAdicionaldir;

                                    var dignatario = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:datsede_input").value;
                                    var codOrfeo = this.document
                                        .getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:CodOrf").value;
                                    var identificacion = "";
                                    if (digitoV > 0) {
                                        identificacion = nit + "-" + digitoV;
                                    } else {
                                        identificacion = nit;
                                    }

                                    console.log("razonSocial ", razonSocial);
                                    console.log("nit ", nit);
                                    console.log("primerNombreL ", primerNombreL);
                                    console.log("segundoNombreL ", segundoNombreL);
                                    console.log("primerApellidoL ", primerApellidoL);
                                    console.log("segundoApellidoL ", segundoApellidoL);
                                    console.log("primerApellidoL ", primerApellidoL);
                                    console.log("segundoApellidoL ", segundoApellidoL);
                                    console.log("direccion ", direccionL);
                                    console.log("telefono ", telefonoL);
                                    console.log("email ", emailL);

                                    var extra = {};
                                    extra["codOrfeo"] = codOrfeo;
                                    extra["tipoPersona"] = "2"; //Juridica
                                    //enviar tipo de documento 
                                    extra["tipoDoc"] = 4; //TIPO doc siempre es NIT
                                    //Datos de persona juridica
                                    extra["nit"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itNit").value;
                                    extra["razonSocial"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itRazonSocial").value;
                                    extra["direccion"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:direccionOrganizacion").value;
                                    extra["pais"] = paisCodOrfeo;
                                    extra["departamento"] = depCodOrfeo;
                                    extra["municipio"] = munCodOrfeo;
                                    extra["telefonoFijo"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:telOrga").value;
                                    extra["telefonoMovil"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:movilOrgani").value;
                                    extra["correoElectronico"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:emailOrga").value;
                                    extra["sucursalesOrganizacion"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:j_idt269_input").value;
                                    //Datos de contacto
                                    extra["nombreSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:datsede_input").value;
                                    extra["telefonoSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:telefonoSed").value;
                                    extra["direccionSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:direccionSedes").value +
                                        "" + this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:informacionAdicionalSedes").value;
                                    extra["paisSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somPaisSede_input").value;
                                    extra["departamentoSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somDptoSede_input").value;
                                    extra["municipioSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somMunSede_input").value;
                                    extra["municipioSedeDOS"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somMunSede_input").options[this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somMunSede_input").selectedIndex].innerText
                                    extra["paisSedeDOS"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somPaisSede_input").options[this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somPaisSede_input").selectedIndex].innerText
                                    extra["departamentoSedeDOS"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somDptoSede_input").options[this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:somDptoSede_input").selectedIndex].innerText

                                    extra["nombre1Sede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:primerNombre_input").value;
                                    extra["nombre2Sede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:segundoNombre").value;
                                    extra["apellido1Sede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:primerApellido").value;
                                    extra["apellido2Sede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:segundoApellido").value;
                                    extra["telefonoMovilSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:celularInte").value;
                                    extra["tipoRelacionSede"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:tiporelacion_input").value;

                                    //Representante legal
                                    extra["cedulaRepresentanteLegal"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itNroIdentificacionRepL").value;
                                    extra["nombre1RepresentanteLegal"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itPrimerNombreLegal").value;
                                    extra["nombre2RepresentanteLegal"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itSegundoNombreLegal").value;
                                    extra["apellido1RepresentanteLegal"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itPrimerApellidoLegal").value;
                                    extra["apellido2RepresentanteLegal"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:itSegundoApellidoLegal").value;

                                    extra["autorizoMensaje"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:autorizaMensajes_input").getAttribute("aria-checked") == 'true';
                                    extra["autorizoRecibirCorreo"] = this.document.getElementById("_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:autorizaCorreo_input").getAttribute("aria-checked") == 'true';
                    
                                    extra["coordenadaX"] ="4°45'00''N";
                                    extra["coordenadaY"] ="74°02'56''W";
                                    extra["coordenadaXSede"] ="9°06'89''W";
                                    extra["coordenadaYSede"] ="54°12'07''W";
                                    
                                    extra["tipoDireccionFormal"]=this.document.getElementById('_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:tipoDireccionOrganizacion_input').value;
                                    extra["tipoDireccionFormalSede"]=this.document.getElementById('_formulariodub_WAR_caracterizacionportlet_:frmFormularioDub:tipoDireccionSedes_input').value;
                                    console.log(JSON.stringify(extra), '*');
                                    this.opener.postMessage(JSON.stringify(extra), '*');

                                }.bind(window['globals'].winCaracterizador);
                            }

                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
            setTimeout(tmpF, 5000);
        }
        tmpF();
        //Forzar escritura del caracterizador


        window["$_________wpAngular"] = true;
        window.addEventListener("message", function (msg) {
            // Do we trust the sender of this message?  (might be
            // different from what we originally opened, for example).
            //if (event.origin !== "http://example.com")
            if (typeof (msg.data) == 'string') {
                if (msg.data.indexOf("Orfeo") >= 0) {
                    //mensaje viene del caracterizador
                    //se invoca el servicio de conversión
                    //se muestra la animación de carga al invocar servicio de cobversion
                    this.spinner.show();
                    this.generalService.post(window['FOREST'].url_gateway + "soap/integra/1.0.0/transformData", { dataCaracterizador: msg.data }).subscribe((respuesta) => {
                        this.spinner.hide();
                        if (window['globals'] && window['globals']["loadInfoForm"]) {
                            window['globals']["loadInfoForm"](respuesta);
                        }
                        else {
                            this.showDynamicDialogMessage("No se pudo cargar la data del caracterizador", "Error", { data: {} });
                        }
                    }, (error => {
                        console.log(error);
                        this.spinner.hide();
                        this.showDynamicDialogMessage("No se pudo convertir la data del caracterizador", "Error", { data: {} });
                    }));

                }
                else {
                    //El mensaje es de origen desconocido
                    console.log("Mensaje por posMessage desconocido:", msg.data);
                }

            }
            else if (msg.data.type == 'alert') {
                //title, content,onClose,btnCap,left,top
                //TODO implementar dialogo con presentacion angular
                let mensaje: String = msg.data.content
                let header: String = msg.data.content.includes("showAlertIcon_error") ? "Error" : msg.data.content.includes("showAlertIcon_warning") ? "Alerta" : "Información";
                this.showDynamicDialogMessage(mensaje.replace("<br>", ""), header, msg);
            }
            else
                if (msg.data.type == 'preload') {
                    //Muestra /oculta una animación dependiendo del valor opc
                    var opc = msg.data.opc;
                    if (opc === "block") {
                        this.spinner.show();
                    } else {
                        window['jQuery'](".modal_preload").remove();
                        this.spinner.hide();
                    }
                }
                else if (msg.data.type == 'message') {
                    //body,head,width, duration
                    let body;
                    this.showMensaje(body);
                }
                else if (msg.data.type == 'navigate') {
                    //abre la forma correspondiente como si fuese del menu
                    //url title
                    sessionStorage.setItem(msg.data.url, msg.data.title);
                    if(msg.data.url.startsWith("/")){
                        this.router.navigateByUrl(msg.data.url);
                    }else{
                        this.router.navigateByUrl("/home/general/" + msg.data.url);
                    }
                   
                }
                else if (msg.data.type == 'confirm') {
                    //Confirma una operacion en un popup
                    // title,caption,onYes,onNo
                    console.log("depuration");
                    var confConfirm = {
                        message: msg.data.caption,
                        rejectVisible: true,
                        rejectLabel: "Cancelar",
                        acceptLabel: "Aceptar",
                        header: msg.data.title ? msg.data.title : 'Información',
                        accept: () => {
                            if (msg.data.onYes) {
                                //resend message callback
                                msg.source.postMessage({ "type": "callback", "id": msg.data.onYes });
                            }
                        },
                        reject: () => {
                            if (msg.data.onNo) {
                                //resend message callback
                                msg.source.postMessage({ "type": "callback", "id": msg.data.onNo });
                            }
                        }
                    };
                    //if(msg.data.btnCapYes){confConfirm.acceptLabel = msg.data.btnCapYes;}
                    //if(msg.data.btnCapNo){confConfirm.rejectLabel = msg.data.btnCapNo;}
                    this.confirmationService.confirm(confConfirm);
                }
                else if (msg.data.type == 'callDataForm') {
                    if (window['globals'] && window['globals'][msg.data["method"]]) {
                        //call  globals method and parameters
                        console.log("Call method in message : " + msg.data["method"]);
                        window['globals'][msg.data["method"]](msg.data.argument);
                    }
                }
                else if (msg.data.type == 'startChannelAsync') {
                    //takId
                    this.startChannelAsync(msg.data.taskId);
                }
                else if (msg.data.type == 'openPopup') {//TODO fix integracion caracterizador no generico
                    //url, name, onYes
                    if (!window['globals']) window['globals'] = {};
                    window['globals'][(msg.data.varCallBack ? msg.data.varCallBack : "loadInfoForm")] = function () {
                        msg.source.postMessage({ "type": "callback", "id": msg.data.onYes, "argument": arguments[0] });
                    }
                    if(msg.data.url=='terceros'){
                        window.localStorage.setItem("tercerosPopup","true");
                        this.openDialogComponent({title:"Seleccionar tercero",path:"terceros"});
                    }
                    else{
                    window['globals'][msg.data.winVar ? msg.data.winVar : "winCaracterizador"] = window.open(msg.data.url + "?token=" /*Agregar token si se requiere*/,
                        name, msg.data.style ? msg.data.style : "width=720,height=500,scrollbars=NO");
                    }
                }
                else if (msg.data.type == 'openReportOutput') {

                    //TODO open report
                    //__report, parameters, target. ?url
                    if (!msg.data.parameters.__report.endsWith(".rptdesign")) {
                        console.log("Agregar extension");
                        msg.data.parameters.__report += ".rptdesign";
                    }
                    this.postDynamicForm(msg.data.url ? msg.data.url : "/forestReports/frameset", msg.data.parameters, msg.data.target);
                }
                else if (msg.data.type == 'especialKeys') {

                    if (!window['lastKeyTime']) {
                        window['lastKeyTime'] = Date.now();
                        window['lastBuffer'] = [];
                    }
                    const charList = 'abcdefghijklmnopqrstuvwxyz0123456789:/ñ';
                    const key = msg.data.key.toLowerCase();
                    const currentTime = Date.now();
                    // we are only interested in alphanumeric keys
                    if (charList.indexOf(key) != -1) {



                        if (currentTime - window['lastKeyTime'] > 1000) {
                            window['lastBuffer'] = [];
                        }

                        window['lastBuffer'].push(key);
                    }
                    if (key == 'enter') {
                        console.log(window['lastBuffer']);
                    }
                    //console.log(key);
                    window['lastKeyTime'] = currentTime;




                }
            else if (msg.data.type == 'openViewer') {//abre el visor de documentos
                //
                //    "service": "forest_radicado",
                //    "refDoc": numeroRadicado,
                //    "security": sessionStorage.token
                var app = AppSettings.getHeaders();
                if( app) msg.data.security =  app.access_token?app.access_token:"";
                this.postDynamicForm("/forestViewer/visor.jsp",msg.data, msg.data.target);
                //sample: window.postMessage({"type":"openViewer","refDoc":"numeroRadicado", "service": "forest_radicado"});
            }
            else if (msg.data.type == 'dialogModule') {//abre el un popup presonalizado
                
                this.openDialogComponent(msg.data);
            }
            else if (msg.data.type == 'dialogTercero') {//abre el un popup de terceros
                window.localStorage.setItem("tercerosPopup","true");
                this.openDialogComponent({title:"Seleccionar tercero",path:"terceros"});
            }
            else if (msg.data.type == 'closePopup') {//Cierra popup abierto
                if(this.refDialog){
                   //close old dialog
                   this.refDialog.close();
                   this.refDialog= null;
                 }
            }







        }.bind(this), false);
    }


 /**
     * 
     * @param path Abre un path en un popup
     * @param titulo 
     */
    openDialogComponent( conf: any) {
         if(this.refDialog){
             //close old dialog
             this.refDialog.close();
             this.refDialog= null;
         }
        if(conf.popupType=="win"){
            var left= (screen.width-(conf.width?conf.width:800))/2;
            var features = 'resizable=yes;status=no;scroll=no;help=no;'+'left=' + left + ';top=' + ((screen.height-(conf.height?conf.height:600))/2)+";";
            features += "width="+( conf.width?conf.width:'800')+";height="+(conf.height?conf.height:'600')+";menubar=no;directories=no;location=no;modal=yes";
               window.open("#"+conf.path, conf.name?conf.name:"forest", features, true);
        }
        else{
        const ref = this.dialogService.open(
            /*
           MpPopupComponent, {
             width: conf.width?conf.width:'800px',
             height: conf.height?conf.height:'600px',
             header: conf.title,
             closeOnEscape : true,
             data: {
               ruta: conf.path
             }
           }
           */
          null,
           null
         );

         ref.onClose.subscribe(
           response => {
             this.router.navigate(['home/dashboard']);
           }
         );
         
         this.refDialog = ref;
         // ref.onClose();
        }
    }

    /**
     * Metodo que se usa para mostrar una alerta tipo toast
     * @param mensaje Mensaje a mostrar
     * @param severityEnviado tipo de mensaje
     * @param summaryEnviado tipo de mensaje
     */
    showMensaje(mensaje: string, severityEnviado?: string, summaryEnviado?: string, ) {
        this.messageService.add({ severity: severityEnviado == null ? "error" : severityEnviado, summary: summaryEnviado == null ? "Error" : summaryEnviado, detail: mensaje });
    }

    mostrarSpinner() {
        this.spinner.show();
    }

    ocultarSpinner() {
        this.spinner.hide();
    }

    /**
     * Expone un mensaje 
     * @param mensaje 
     * @param header 
     * @param icon 
     */
    showDynamicDialogMessage(mensaje: string, header?: string, msg?: any) {
        const ref = this.dialogService.open(AlertaComponent, {
            data: {
                mensaje: mensaje,
                msg: msg,
                closable: false,
                fontWeight: mensaje.substring(mensaje.indexOf(":", mensaje.indexOf("font-weight")) + 1, mensaje.indexOf(";", mensaje.indexOf("font-weight"))),
                textAlign: mensaje.substring(mensaje.indexOf(":", mensaje.indexOf("text-align")) + 1, mensaje.indexOf(";", mensaje.indexOf("text-align"))),
                fontSize: mensaje.substring(mensaje.indexOf(":", mensaje.indexOf("font-size")) + 1, mensaje.indexOf(";", mensaje.indexOf("font-size"))),
            },
            header: header ? header : 'Información',
            width: mensaje.substring(mensaje.indexOf(":") + 1, mensaje.indexOf(";"))
        });

        ref.onClose.subscribe(() => {
            msg.source.postMessage({ "type": "callback", "id": msg.data.onClose });
        });


    }

    /**
     * crea un formulario dinamicamente y lo envia por post 
     * @url action del formulario
     * @values json clave valor con los datos del formulario
     * @target valor opcional para indicar a que frame se dirige el resultado por defecto es _blank
     */
    postDynamicForm(url, values, target?) {

        console.log("Post", url)
        var form = document.createElement("form");
        form.action = url;
        form.method = "POST";
        form.target = target ? target : "_blank";

        for (var key in values) {
            var hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = key;
            hidden.value = values[key];
            form.appendChild(hidden);
        }
        document.body.appendChild(form);
        form.submit();
    }

    /**
 * inicializa la configuracion del canal asincrono para una actividad, si envian mensaje por el servidor de mensajes debe recargar la tarea
 */
    startChannelAsync(taskId: string) {
        (function poll() {
            if (window["currentSessionWPNTF"]) {
                //kill the request
                window["currentSessionWPNTF"].abort();
                window["currentSessionWPNTF"] = null;
            }
            window["lastConnectionDate"] = new Date();

            window["currentSessionWPNTF"] = window["jQuery"].ajax({
                url: "http://18.211.111.164:8080/forestMsg/channelAsync/WP_" + taskId +
                    "?X-Atmosphere-tracking-id=88bb058a-4b5d-6a21-4443-e8384a223a1a&X-Atmosphere-Framework=1.0.5&X-Atmosphere-Transport=long-polling&tabid=0.6516375752723828&X-Cache-Date=0&Content-Type=application/xml&_=" + Math.random(),
                success: function (response) {
                    var milis = (new Date()).getTime() - window["lastConnectionDate"].getTime();
                    console.log("time: " + (milis / 1000));
                    response = response.trim();
                    console.log("response" + response);
                    if (response) {
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(response, "text/xml");
                        var node = xmlDoc.getElementsByTagName("response")[0];
                        var action = node.getAttribute("action") ? node.getAttribute("action") : node.getAttribute("command");
                        if (action == 'onCloseTaskEnd') {
                            console.log('Fail onCloseTaskEnd: ' + taskId);
                            window["currentSessionWPNTF"].abort();
                            return;
                        }
                        else if (action == 'onException') {
                            console.log('Fail asyncChannel: ' + node.getAttribute("message"));
                            window["currentSessionWPNTF"].abort();
                            return;
                        }
                        else if (action == 'SecurityException') {
                            console.log('Fail SecurityException: ' + node.getAttribute("message"));
                            window["currentSessionWPNTF"].abort();
                            return;
                        }

                        else {
                            //TODO aqui se requiere analizar el mensaje para efectuar una opcion
                            //xui.message("Mensaje del servidor de mensajes: "+ (node.getAttribute("message")?node.getAttribute("message"):node.getAttribute("action")) ,"Forest MSG",undefined,20000);
                            poll();
                        }
                    }
                    else {
                        console.log("Respuesta vacia,  solo se reconecta ...");
                        setTimeout(poll, 5000);
                    }

                },
                contentType: 'application/xml',
                logLevel: 'debug',
                transport: 'long-polling',
                enableXDR: true,
                dropAtmosphereHeaders: true,
                attachHeadersAsQueryString: true,
                readResponseHeaders: false,
                processData: false,
                dataType: "text",
                crossDomain: true,
                fail: function () { console.log("Fail asyncChannel retry in 5 seconds"); setTimeout(poll, 5000); },
                error: function () { console.log("Error asyncChannel retry in 5 seconds"); setTimeout(poll, 5000); },
                timeout: 300000
            });
        }).bind(this)();
    }
}