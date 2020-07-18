import { TipoPersona } from "./TipoPersona";

/**
 * Clase que representa la claficiación de tipos de persona
 */
export class ClasificacionTipoPersona {
    id: number;
    tipoPersona: TipoPersona;
    descripcion: string;
    activo: number;

    constructor(obj?: any) {

      this.id = obj && obj.id || null;
      this.tipoPersona = obj && obj.tipoPersona || null;
      this.descripcion = obj && obj.descripcion || '';
      this.activo = obj && obj.activo || 1;
    }
  }
