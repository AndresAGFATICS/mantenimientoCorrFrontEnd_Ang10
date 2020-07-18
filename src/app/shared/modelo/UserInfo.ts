
export class UserInfo {
  sub: string;
  nickname: string;
  phone_number: string;
  family_name: string;

  // Datos de usuario logueado
  NOMFUN: string;
  CODFUN: string;
  NOMDEPENDENCIA: string;
  DEP_DELEGADO: string;
  EMAIL: string;
  userInfo?: string;
  IMG_USUARIO;

  constructor(obj?: any) {
    this.sub = (obj && obj.sub) || null;
    this.nickname = (obj && obj.nickname) || null;
    this.phone_number = (obj && obj.phone_number) || null;
    this.family_name = (obj && obj.family_name) || null;

    this.DEP_DELEGADO = (obj && obj.DEP_DELEGADO) || null;
    this.NOMFUN = (obj && obj.NOMFUN) || null;
    this.CODFUN = (obj && obj.CODFUN) || null;
    this.NOMDEPENDENCIA = (obj && obj.NOMDEPENDENCIA) || null;
    this.EMAIL = (obj && obj.EMAIL) || null;
  }
}