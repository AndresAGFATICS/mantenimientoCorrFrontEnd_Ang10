import { Injectable } from '@angular/core';
import { ComponenteForest } from 'src/app/shared/modelo/ComponenteForest';
import { AppSettings } from 'src/app/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class ComponentesForestService {
  private urlAmbiente = AppSettings._API_ENDPOINT_FOREST;
  private componentes: ComponenteForest[] = [{ nombre: 'Forest Notify', rutaDescarga: AppSettings.ENDPOINT_FOREST_NOTIFY, rutaImagen: this.urlAmbiente + '/forestWorkplace/img/notify.png' },
  { nombre: 'Forest Scanner', rutaDescarga: AppSettings.ENDPOINT_FOREST_SCANNER, rutaImagen: this.urlAmbiente + '/forestWorkplace/img/scanner.png' },
  { nombre: 'Forest Integrator MS', rutaDescarga: AppSettings.ENDPOINT_FOREST_INTEGRATOR, rutaImagen: this.urlAmbiente + '/forestWorkplace/img/integrator_ms.png' }];
  constructor() { }

  public onCargarDescargas() {

    return this.componentes;
  }
}
