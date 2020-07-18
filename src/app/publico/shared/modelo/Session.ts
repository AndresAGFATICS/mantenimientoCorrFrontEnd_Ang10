import { Funcionario } from "src/app/shared/modelo/Funcionario";
import { FuncionarioVista } from "src/app/shared/modelo/FuncionarioVista";
import { MenuForma } from "./MenuForma";
import { UserInfo } from "src/app/shared/modelo/UserInfo";

export class Session {
    public Authorization: string;
    public access_token: string;
    public token: string;
    public refresh_token: string;
    public scope: string;
    public token_type: string;
    public expires_in: number;
    public funcionario: Funcionario;
    public funcionarioVista: FuncionarioVista;
    public userInfo: UserInfo;
    public menuForma: MenuForma;

    // usuario delegado
    public delegado?: string;      // Contiene el codigo del usuario delegado
    public dep_delegada?: string;  //Contiene el id de la depende3ncia delegada
    public _DLG_VALIDATE: string;
    public _DEP_VALIDATE: string;

    constructor(obj?: any) {
      this.Authorization = obj && obj.Authorization || null;
      this.access_token = obj && obj.access_token || null;
      this.token = this.access_token;
      this.refresh_token = obj && obj.refresh_token || null;
      this.scope = obj && obj.scope || null;
      this.token_type = obj && obj.token_type || null;
      this.expires_in = obj && obj.expires_in || null;

      this.funcionarioVista = obj && obj.funcionarioVista || null;
      this.userInfo = obj && obj.userInfo || null;
      this.menuForma = obj && obj.menuForma || new MenuForma();

      this.delegado = obj && obj.delegado || null;
      this.dep_delegada = obj && obj.dep_delegada || null;

      // Mapeamos funcionario lectura al bean correcto
      this.funcionario = new Funcionario();
      this.funcionario.mapeoFuncionarioVista(this.funcionarioVista);
    }
  }
