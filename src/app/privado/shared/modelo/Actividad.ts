export class Actividad {
    idActividadBpm: string;
    nombreActividadBpm: string;
    comentarioActividadBpm?: string;
    fechaAsignacionActividad: Date;
    fechaVencimientoActividad?: Date;
    numeroInstanciaProcesoBpm: string;
    nombreProcesoBpm: string;
    estadoProcesoBpm?: string;
    nombreUltimaTareaBpm?: string;
    prioridad?: number;
    tareaRechazada?: string;
    usuarioAsignador: string;
    numpro: string;
    usuarioAsignadoActividad?: string;
    idDependencia: number;
    codigoDependencia: string;
    nombreDependencia: string;
}