import { Pais } from './Pais';

export class Departamento {
    id: number;
    nombre: string;
    codigoNombre: string;
    pais: Pais;

    constructor(obj?: any) {

      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.codigoNombre = obj && obj.codigoNombre || '';
      this.pais = obj && obj.pais || '';
    }
  }
