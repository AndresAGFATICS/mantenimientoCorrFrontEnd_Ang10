import { Tramite } from './Tramite';

export class TramiteEscenario {
  tramite: Tramite;
  idTipoAgrupacionDocumental: number;
  idClaseAgrupacionDocumental: number;
  idEscenario: number;
  idPeriodicidad: number;
  tipo: number;

  constructor(obj?: any) {
    this.tramite = (obj && obj.tramite) || null;
    this.idTipoAgrupacionDocumental = (obj && obj.idTipoAgrupacionDocumental) || null;
    this.idClaseAgrupacionDocumental = (obj && obj.idClaseAgrupacionDocumental) || '';
    this.idEscenario = (obj && obj.idEscenario) || null;
    this.idPeriodicidad = (obj && obj.idPeriodicidad) || null;
    this.tipo = (obj && obj.tipo) || null;
  }
}
