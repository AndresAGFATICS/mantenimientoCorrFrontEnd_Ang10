
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({
    selector: 'app-general',
    template: `
    <div id="alertaExterna" style="width: 243px; max-width: 260px;" [innerHTML]="mensaje"></div>

    <div style="margin-top: 5%;text-align: center;">
        <button pButton type="button" (click)="onClickAceptar()" label="Aceptar"></button>
    </div>
  `
})

export class AlertaComponent {
    mensaje: string;
    estilos: string
    constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
        this.mensaje = this.config.data.mensaje;


        //font-weight:bold;text-align:justify;font-size:15px
    }

    ngOnInit(): void {
        setTimeout(() => {
            let ele: HTMLElement = <HTMLElement>document.querySelector('.showAlertText');
            if (ele && ele.style) {
                ele.style.fontWeight = this.config.data.fontWeight;
                ele.style.textAlign = this.config.data.textAlign;
                ele.style.fontSize = this.config.data.fontSize;
            }

        }, 700);
    }


    onClickAceptar() {
        this.ref.close();
        let msg = this.config.data.msg;
        this.ref.onClose.subscribe(() => {
            msg.source.postMessage({ "type": "callback", "id": msg.data.onClose });
        });
    }



}