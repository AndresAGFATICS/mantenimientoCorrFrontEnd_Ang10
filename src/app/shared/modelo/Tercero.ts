import { TipoIdentificacion } from './TipoIdentificacion';
import { Ciudad } from './Ciudad';
import { Departamento } from './Departamento';
import { Pais } from './Pais';
import { TipoPersona } from './TipoPersona';

export class Tercero {
    id: number;
    digitoVerificacion: number;
    tipoIdentificacion: TipoIdentificacion;
    tipoPersona: TipoPersona;
    numeroIdentificacion: string;
    nombreTercero: string;
    correo: string;
    direccion: string;
    telefono: string;
    municipio: Ciudad;
    departamento: Departamento;
    pais: Pais;

    constructor(obj?: any) {
      this.id = obj && obj.id || null;
      this.digitoVerificacion = obj && obj.digitoVerificacion || null;
      this.tipoIdentificacion = obj && obj.tipoIdentificacion || null;
      this.tipoPersona = obj && obj.tipoPersona || null;
      this.numeroIdentificacion = obj && obj.numeroIdentificacion || null;
      this.nombreTercero = obj && obj.nombreTercero || null;
      this.correo = obj && obj.correo || null;
      this.direccion = obj && obj.direccion || null;
      this.telefono = obj && obj.telefono || null;
      this.municipio = obj && obj.municipio || null;
      this.departamento = obj && obj.departamento || null;
      this.pais = obj && obj.pais || null;
    }
  }
