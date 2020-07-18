export class Usuario {
    public id: string;
    public dependenciaId: number;
   
  
    constructor(obj?: any) {
      this.id = (obj && obj.id) || null;
      this.dependenciaId = (obj && obj.nombre) || null;
    }
  }