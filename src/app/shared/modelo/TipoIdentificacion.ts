/**
 * Clase que representa los tipos de identificación
 */
export class TipoIdentificacion {
    id: number;
    descripcion: string;
    idDescripcion: string;

    constructor(obj?: any) {

      this.id = obj && obj.id || null;
      this.descripcion = obj && obj.descripcion || '';
      this.idDescripcion = obj && obj.idDescripcion || '';
    }
  }
