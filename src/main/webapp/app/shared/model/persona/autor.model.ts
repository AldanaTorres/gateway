export interface IAutor {
  id?: number;
  nombre?: string;
  apellido?: string;
  biografia?: string;
}

export class Autor implements IAutor {
  constructor(public id?: number, public nombre?: string, public apellido?: string, public biografia?: string) {}
}
