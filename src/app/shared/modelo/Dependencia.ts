import { TipoDependencia } from './TipoDependencia';

export class Dependencia {
  id: number;
  nombre: string;
  codigo: string;
  fechaInicioVigencia: string;
  idTercero: string;
  nombreCodigo: string;
  nombreCodigoGuion: string;
  tipoDependencia: TipoDependencia;
  dependenciaPadre: Dependencia;
  //variables nuevas creadas para no danar otro codigo
  codigoDependencia: string;
  nombreDependencia: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || 0;
    this.nombre = (obj && obj.anexos) || null;
    this.codigo = (obj && obj.cantidad) || 0;
    this.nombreDependencia = (obj && obj.nombreDependencia) || null;
    this.codigoDependencia = (obj && obj.codigoDependencia) || null;
  }
}
