import { Tercero } from './Tercero';
import { TipoIdentificacion } from './TipoIdentificacion';
import { ClasificacionTipoPersona } from './ClasificacionTipoPersona';

export class FuncionarioVista {
    id: string;
    numeroIdentificacion: string;
    nombre: string;
    activo: number;
    email: string;
    clasificacionTipoPersona: ClasificacionTipoPersona;
    tercero: Tercero;
    tipoIdentificacion: TipoIdentificacion;
    

    constructor(obj?: any) {
      this.id = obj && obj.id || null;
      this.numeroIdentificacion = obj && obj.numeroIdentificacion || null;
      this.nombre = obj && obj.nombre || null;
      this.activo = obj && obj.activo || null;
      this.email = obj && obj.email || null;
      this.clasificacionTipoPersona = obj && obj.clasificacionTipoPersona || null;
      this.tercero = obj && obj.tercero || null;
      this.tipoIdentificacion = obj && obj.tipoIdentificacion || null;
    }
  }
