import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILibro, Libro } from 'app/shared/model/persona/libro.model';
import { LibroService } from './libro.service';

@Component({
  selector: 'jhi-libro-update',
  templateUrl: './libro-update.component.html',
})
export class LibroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    titulo: [],
    fecha: [],
    genero: [],
    paginas: [],
  });

  constructor(protected libroService: LibroService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ libro }) => {
      this.updateForm(libro);
    });
  }

  updateForm(libro: ILibro): void {
    this.editForm.patchValue({
      id: libro.id,
      titulo: libro.titulo,
      fecha: libro.fecha,
      genero: libro.genero,
      paginas: libro.paginas,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const libro = this.createFromForm();
    if (libro.id !== undefined) {
      this.subscribeToSaveResponse(this.libroService.update(libro));
    } else {
      this.subscribeToSaveResponse(this.libroService.create(libro));
    }
  }

  private createFromForm(): ILibro {
    return {
      ...new Libro(),
      id: this.editForm.get(['id'])!.value,
      titulo: this.editForm.get(['titulo'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      paginas: this.editForm.get(['paginas'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibro>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
