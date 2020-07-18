export class Tramite {
  id: number;
  codigo: string;
  descripcion: string;
  descripcionTramite: string;
  activo: number;
  diasTramite: number;
  habil: number;
  modificable: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || 0;
    this.codigo = (obj && obj.codigo) || null;
    this.descripcion = (obj && obj.descripcion) || '';   
  }

}
