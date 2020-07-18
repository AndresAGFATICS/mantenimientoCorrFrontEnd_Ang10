/**
 * Bean Menu
 */
export class MenuForma {
    id: number;
    template: string;
    title: string;
    parent: string;
    rol: string;
    nivel: string;
    idBPM: string;
    orden: number;
    favorito: string;
    icono: string;
    tipo: string;
    codigo_forma: string;
    menu_formas: MenuForma[];
    custom: boolean;
    hijos: MenuForma[];

    constructor(obj?: any) {

      this.hijos = obj && obj.hijos || [];
    }
  }