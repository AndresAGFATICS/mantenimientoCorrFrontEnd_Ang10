
export class ComponenteForest {
    nombre: string;
    rutaDescarga: string;
    rutaImagen: string;

    constructor(obj?: any) {
        this.nombre = (obj && obj.id) || null;
        this.rutaDescarga = (obj && obj.tipoAnexoFisico) || null;
        this.rutaImagen = (obj && obj.cantidad) || null;
    }
}