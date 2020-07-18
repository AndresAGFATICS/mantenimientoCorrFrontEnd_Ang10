export class Ciudad {
    id: number;
    nombre: string;
    localidades: string;
    barrios: string;
    codigoNombre: string;
    departamento: string;

    constructor(obj?: any) {

      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.localidades = obj && obj.localidades || '';
      this.barrios = obj && obj.barrios || '';
      this.codigoNombre = obj && obj.codigoNombre || '';
      this.departamento = obj && obj.departamento || '';
    }
  }
