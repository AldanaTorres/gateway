import { IAutor } from 'app/shared/model/persona/autor.model';

export interface ILibro {
  id?: number;
  titulo?: string;
  fecha?: number;
  genero?: string;
  paginas?: number;
  autors?: IAutor[];
}

export class Libro implements ILibro {
  constructor(
    public id?: number,
    public titulo?: string,
    public fecha?: number,
    public genero?: string,
    public paginas?: number,
    public autors?: IAutor[]
  ) {}
}
