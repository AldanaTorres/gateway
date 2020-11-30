import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPersona, Persona } from 'app/shared/model/persona/persona.model';
import { PersonaService } from './persona.service';
import { IDomicilio } from 'app/shared/model/persona/domicilio.model';
import { DomicilioService } from 'app/entities/persona/domicilio/domicilio.service';

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html',
})
export class PersonaUpdateComponent implements OnInit {
  isSaving = false;
  domicilios: IDomicilio[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    apellido: [],
    dni: [],
    domicilio: [],
  });

  constructor(
    protected personaService: PersonaService,
    protected domicilioService: DomicilioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);

      this.domicilioService
        .query({ filter: 'persona-is-null' })
        .pipe(
          map((res: HttpResponse<IDomicilio[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDomicilio[]) => {
          if (!persona.domicilio || !persona.domicilio.id) {
            this.domicilios = resBody;
          } else {
            this.domicilioService
              .find(persona.domicilio.id)
              .pipe(
                map((subRes: HttpResponse<IDomicilio>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDomicilio[]) => (this.domicilios = concatRes));
          }
        });
    });
  }

  updateForm(persona: IPersona): void {
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      domicilio: persona.domicilio,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  private createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      dni: this.editForm.get(['dni'])!.value,
      domicilio: this.editForm.get(['domicilio'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>): void {
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

  trackById(index: number, item: IDomicilio): any {
    return item.id;
  }
}
