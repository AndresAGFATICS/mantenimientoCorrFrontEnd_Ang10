import { FuncionarioVista } from "./FuncionarioVista";

export class Funcionario {
  idTipoPersona: number;
  idTipoIdentificacion: number;
  idTercero: number;
  idGrupoMinoritario: number;
  idClasificacionPersona: number;
  idPais: number;
  idDepartamento: number;
  idCiudad: number;
  usuario: string;
  numeroIdentificacion: string;
  digitoVerificacion: number;
  nombreApellidosRS: string;
  direccion: string;
  telefono: string;
  correo: string;
  clave: string;
  claveAntigua: string;
  tokenCaptcha: string;


  constructor(obj?: any) {
    this.idTipoPersona = obj && obj.idTipoPersona || null;
    this.idTipoIdentificacion = obj && obj.idTipoIdentificacion || null;
    this.idTercero = obj && obj.idTercero || null;
    this.idGrupoMinoritario = obj && obj.idGrupoMinoritario || null;
    this.idClasificacionPersona = obj && obj.idClasificacionPersona || null;
    this.idPais = obj && obj.idPais || null;
    this.idDepartamento = obj && obj.idDepartamento || null;
    this.idCiudad = obj && obj.idCiudad || null;
    this.usuario = obj && obj.usuario || null;
    this.numeroIdentificacion = obj && obj.numeroIdentificacion || null;
    this.digitoVerificacion = obj && obj.digitoVerificacion || null;
    this.nombreApellidosRS = obj && obj.nombreApellidosRS || null;
    this.direccion = obj && obj.direccion || null;
    this.telefono = obj && obj.telefono || null;
    this.correo = obj && obj.correo || null;
    this.clave = obj && obj.clave || null;
    this.claveAntigua = obj && obj.claveAntigua || null;
    this.tokenCaptcha = obj && obj.tokenCaptcha || null;
  }

  /**
   * Función para mapear el funcionario en modo coonsulta al bean Funcionario
   *
   * @param funcionarioVista Bean funcionario pero en modo vista, ya que asi lo retorna el servicio
   */
  mapeoFuncionarioVista(funcionarioVista: FuncionarioVista) {
    if (funcionarioVista != null) {
      this.idTipoPersona = funcionarioVista.clasificacionTipoPersona
        && funcionarioVista.clasificacionTipoPersona.tipoPersona
        && funcionarioVista.clasificacionTipoPersona.tipoPersona.id || null;
      this.idTipoIdentificacion = funcionarioVista.tipoIdentificacion && funcionarioVista.tipoIdentificacion.id || null;
      this.idTercero = funcionarioVista.tercero && funcionarioVista.tercero.id || null;
      this.idGrupoMinoritario = funcionarioVista.clasificacionTipoPersona && funcionarioVista.clasificacionTipoPersona.id || null;
      this.idClasificacionPersona = funcionarioVista.clasificacionTipoPersona && funcionarioVista.clasificacionTipoPersona.id || null;
      this.idPais = funcionarioVista.tercero && funcionarioVista.tercero.pais && funcionarioVista.tercero.pais.id || null;
      this.idDepartamento = funcionarioVista.tercero
        && funcionarioVista.tercero.departamento
        && funcionarioVista.tercero.departamento.id || null;
      this.idCiudad = funcionarioVista.tercero && funcionarioVista.tercero.municipio && funcionarioVista.tercero.municipio.id || null;
      this.usuario = funcionarioVista.id || null;
      this.numeroIdentificacion = funcionarioVista.tercero && funcionarioVista.tercero.numeroIdentificacion || null;
      this.digitoVerificacion = null;
      if (funcionarioVista.tercero != null && funcionarioVista.tercero.digitoVerificacion != null) {
        this.digitoVerificacion = funcionarioVista.tercero.digitoVerificacion;
      }
      this.nombreApellidosRS = funcionarioVista.nombre || null;
      this.direccion = funcionarioVista.tercero && funcionarioVista.tercero.direccion || null;
      this.telefono = funcionarioVista.tercero && funcionarioVista.tercero.telefono || null;
      this.correo = funcionarioVista.email || null;
    }

  }

}
