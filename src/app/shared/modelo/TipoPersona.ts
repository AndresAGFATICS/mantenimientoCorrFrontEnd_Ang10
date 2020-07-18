/**
 * Clase que representa los tipos de persona
 */
export class TipoPersona {
    id: number;
    nombreTipoPersona: string;
    descripcion: string;
    idDescripcion: string;

    constructor(obj?: any) {

      this.id = obj && obj.id || null;
      this.nombreTipoPersona = obj && obj.nombreTipoPersona || null;
      this.descripcion = obj && obj.descripcion || '';
      this.idDescripcion = obj && obj.idDescripcion || '';
    }
  }
