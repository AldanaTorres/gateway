export interface ILocalidad {
  id?: number;
  denominacion?: string;
}

export class Localidad implements ILocalidad {
  constructor(public id?: number, public denominacion?: string) {}
}
