import { IDomicilio } from 'app/shared/model/persona/domicilio.model';
import { ILibro } from 'app/shared/model/persona/libro.model';

export interface IPersona {
  id?: number;
  nombre?: string;
  apellido?: string;
  dni?: number;
  domicilio?: IDomicilio;
  libros?: ILibro[];
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public dni?: number,
    public domicilio?: IDomicilio,
    public libros?: ILibro[]
  ) {}
}
