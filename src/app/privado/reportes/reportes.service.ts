import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { GeneralService } from 'src/app/shared/servicio/general.service';
import { AppSettings } from 'src/app/AppSettings';

@Injectable({
    providedIn: 'root'
})
export class ReportesService extends GeneralService {


    constructor(public _http: HttpClient) {
        super(_http);
    }

    /**
     * Obtener lista reportes usuario logeado
     */
    public getListaReportesUsuario() {
        return this.get(AppSettings.ENDPOINT_LIST_REPORTS_USER)
    }

}
