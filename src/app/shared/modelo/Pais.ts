export class Pais {
    id: number;
    nombre: string;
    codigoNombre: string;

    constructor(obj?: any) {

      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.codigoNombre = obj && obj.codigoNombre || '';
    }
  }
