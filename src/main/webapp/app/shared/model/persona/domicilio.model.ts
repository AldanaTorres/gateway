import { ILocalidad } from 'app/shared/model/persona/localidad.model';

export interface IDomicilio {
  id?: number;
  calle?: string;
  numero?: number;
  localidad?: ILocalidad;
}

export class Domicilio implements IDomicilio {
  constructor(public id?: number, public calle?: string, public numero?: number, public localidad?: ILocalidad) {}
}
