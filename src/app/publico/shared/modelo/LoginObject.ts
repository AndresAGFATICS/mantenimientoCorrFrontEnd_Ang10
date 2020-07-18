/**
 * Clase que se usa en el componente Login
 */
export class LoginObject {
    username: string;
    password: string;
    correo: string;
    grant_type: string;
    scope : string;
    response : string;
    refresh_token?:string;

    constructor(obj?: any) {

      this.username = obj && obj.username || null;
      this.password = obj && obj.password || null;
      this.grant_type = obj && obj.password || null;
      this.correo = obj && obj.correo || null;
      this.scope = obj && obj.scope || null;
      this.response = obj && obj.response || null;
    }
  }
