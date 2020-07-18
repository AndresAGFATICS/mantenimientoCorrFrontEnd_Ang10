export class Respuesta {
    status: boolean;
    message: string;
    data:any
   
  
    constructor(obj?: any) {
      this.status = (obj && obj.id) || false;
      this.message = (obj && obj.codigo) || null;
      this.data = (obj && obj.data) || null;
    }
  }