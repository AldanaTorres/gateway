import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILibro } from 'app/shared/model/persona/libro.model';

type EntityResponseType = HttpResponse<ILibro>;
type EntityArrayResponseType = HttpResponse<ILibro[]>;

@Injectable({ providedIn: 'root' })
export class LibroService {
  public resourceUrl = SERVER_API_URL + 'services/persona/api/libros';

  constructor(protected http: HttpClient) {}

  create(libro: ILibro): Observable<EntityResponseType> {
    return this.http.post<ILibro>(this.resourceUrl, libro, { observe: 'response' });
  }

  update(libro: ILibro): Observable<EntityResponseType> {
    return this.http.put<ILibro>(this.resourceUrl, libro, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILibro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILibro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
