import { Component } from '@angular/core';


@Component({
    selector: 'combinacion-teclas',
    template: `
  <div style="text-align: center;">
  </div>
  <div class="p-grid">
    <div class="p-col">
      <p style="font-weight: bold;">Control + I:</p>
      <p style="font-weight: bold;">Control + Alt + V:</p>
      <p style="font-weight: bold;">Control + Alt + M:</p>
    </div>
    <div class="p-col">
      <p style="font-style: oblique;">Abrir Panel de informaci&oacute;n</p>
      <p style="font-style: oblique;">Abrir Ventanilla Radicaci&oacute;n Angular</p>
      <p style="font-style: oblique;">Abrir Editar documento de Entrada</p>
    </div>
  </div>
  `
})
export class CombinacionTeclasComponent {


    constructor() {


    }

}

